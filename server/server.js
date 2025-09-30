// server.js - Express.js Backend
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'furniture_shop',
  password: 'jisil123',
  port: 5432,
});


// JWT Secret (use environment variable in production)
const JWT_SECRET = 'your-secret-key-here';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Database initialization
async function initDB() {
  try {
    // Create furniture table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS furniture (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        features TEXT[],
        photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        furniture_id INTEGER REFERENCES furniture(id),
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        customer_address TEXT NOT NULL,
        place VARCHAR(255) NOT NULL,
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
}

// Initialize database on startup
initDB();


const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Initialize admin user (run once)
async function createAdminUser() {
  try {
    const username = 'admin';
    const password = 'admin123';
    
    // Check if admin already exists
    const existingAdmin = await pool.query(
      'SELECT id FROM admin WHERE username = $1',
      [username]
    );
    
    if (existingAdmin.rows.length > 0) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert admin user
    await pool.query(
      'INSERT INTO admin (username, password_hash) VALUES ($1, $2)',
      [username, hashedPassword]
    );
    
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Authentication Routes

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find admin user
    const result = await pool.query(
      'SELECT id, username, password_hash FROM admin WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token endpoint
app.get('/api/auth/verify', verifyToken, (req, res) => {
  res.json({
    valid: true,
    admin: {
      id: req.admin.id,
      username: req.admin.username
    }
  });
});


// Routes

// Get all furniture
app.get('/api/furniture', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM furniture ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single furniture item
app.get('/api/furniture/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM furniture WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create furniture
app.post('/api/furniture', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, price, features } = req.body;
    const photo = req.file ? req.file.filename : null;
    const featuresArray = features ? features.split(',').map(f => f.trim()) : [];
    
    const result = await pool.query(
      'INSERT INTO furniture (name, description, price, features, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, featuresArray, photo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update furniture
app.put('/api/furniture/:id', upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, features } = req.body;
    const featuresArray = features ? features.split(',').map(f => f.trim()) : [];
    
    let query, params;
    if (req.file) {
      const photo = req.file.filename;
      query = 'UPDATE furniture SET name = $1, description = $2, price = $3, features = $4, photo = $5 WHERE id = $6 RETURNING *';
      params = [name, description, price, featuresArray, photo, id];
    } else {
      query = 'UPDATE furniture SET name = $1, description = $2, price = $3, features = $4 WHERE id = $5 RETURNING *';
      params = [name, description, price, featuresArray, id];
    }
    
    const result = await pool.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete furniture
app.delete('/api/furniture/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM furniture WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json({ message: 'Furniture deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { furniture_id, customer_name, customer_phone, customer_address, place } = req.body;
    const result = await pool.query(
      'INSERT INTO bookings (furniture_id, customer_name, customer_phone, customer_address, place) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [furniture_id, customer_name, customer_phone, customer_address, place]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings with furniture details
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, f.name as furniture_name, f.price, f.photo 
      FROM bookings b 
      JOIN furniture f ON b.furniture_id = f.id 
      ORDER BY b.booking_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add this function to your server.js file
// Initialize multiple admin users (run once)
async function createAdminUsers() {
  try {
    // Define admin users with their credentials
    const adminUsers = [
      { username: 'admin', password: 'admin123' },
      { username: 'superadmin', password: 'super2024' },
      { username: 'manager', password: 'manager456' }
    ];

    const saltRounds = 10;

    for (const admin of adminUsers) {
      // Check if admin already exists
      const existingAdmin = await pool.query(
        'SELECT id FROM admin WHERE username = $1',
        [admin.username]
      );
      
      if (existingAdmin.rows.length > 0) {
        console.log(`Admin user '${admin.username}' already exists`);
        continue;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(admin.password, saltRounds);
      
      // Insert admin user
      await pool.query(
        'INSERT INTO admin (username, password_hash) VALUES ($1, $2)',
        [admin.username, hashedPassword]
      );
      
      console.log(`✅ Admin user '${admin.username}' created successfully`);
    }

    console.log('\n📋 Admin Credentials:');
    console.log('1. Username: admin     | Password: admin123');
    console.log('2. Username: superadmin | Password: super2024');
    console.log('3. Username: manager    | Password: manager456');
    console.log('\n🔐 All passwords are securely hashed with bcrypt');
    
  } catch (error) {
    console.error('Error creating admin users:', error);
  }
}

// Call this function when server starts (add this line after your database connection)
// Replace the old createAdminUser() call with this:
createAdminUsers();

// Server startup code
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Create admin users on startup
  setTimeout(() => {
    createAdminUsers();
  }, 1000); // Wait 1 second for DB connection to be established
});

