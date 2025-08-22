import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test database connection
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
      console.log(`🔗 Test DB: http://localhost:${PORT}/test-db`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
