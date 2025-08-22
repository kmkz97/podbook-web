const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { connectDatabase } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const contentRoutes = require('./routes/content');
const aiRoutes = require('./routes/ai');
const onboardingRoutes = require('./routes/onboarding');

const app = express();

// Create a fresh pool instance for testing
const testPool = new Pool({
  user: 'podbook_user',
  host: '127.0.0.1',
  database: 'podbook',
  password: 'podbook_password',
  port: 5433,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/onboarding', onboardingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test database connection with direct pool
app.get('/test-db-direct', async (req, res) => {
  try {
    console.log('🔍 Main server attempting direct database connection...');
    const client = await testPool.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT version()');
    console.log('📊 Database version:', result.rows[0].version);
    
    client.release();
    res.json({ status: 'Database connected successfully', version: result.rows[0].version });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed', details: error });
  }
});

// Test database connection with imported function
app.get('/test-db', async (req, res) => {
  try {
    await connectDatabase();
    res.json({ status: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error });
  }
});

// Start server
const PORT = process.env['PORT'] || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 Test DB Direct: http://localhost:${PORT}/test-db-direct`);
      console.log(`🔗 Test DB Imported: http://localhost:${PORT}/test-db`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
