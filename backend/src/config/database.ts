const { Pool } = require('pg');
const { logger } = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

// Direct PostgreSQL connection (bypassing Prisma for now)
const pool = new Pool({
  user: 'podbook_user',
  host: '127.0.0.1',  // Force IPv4
  database: 'podbook',
  password: 'podbook_password',
  port: 5433,  // Use port 5433 which we know works from direct testing
  // Add connection timeout and retry settings
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
});

module.exports.db = pool;

module.exports.connectDatabase = async function() {
  try {
    logger.info('Attempting to connect to database at 127.0.0.1:5433...');
    const client = await pool.connect();
    logger.info('Database connection established successfully');
    
    // Test a simple query
    const result = await client.query('SELECT version()');
    logger.info('Database version:', result.rows[0].version);
    
    client.release();
    return true;
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    logger.error('Connection details:', {
      host: '127.0.0.1',
      port: 5433,
      database: 'podbook',
      user: 'podbook_user'
    });
    throw error;
  }
}

module.exports.disconnectDatabase = async function() {
  try {
    await pool.end();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection:', error);
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await module.exports.disconnectDatabase();
});

// Export a mock prisma object for compatibility
module.exports.prisma = {
  user: {
    findUnique: async (params: any) => {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [params.where.email]);
        return result.rows[0] || null;
      } finally {
        client.release();
      }
    },
    create: async (params: any) => {
      const client = await pool.connect();
      try {
        const result = await client.query(
          'INSERT INTO users (id, email, password, name) VALUES ($1, $2, $3, $4) RETURNING *',
          [params.data.id || uuidv4(), params.data.email, params.data.password, params.data.name]
        );
        return result.rows[0];
      } finally {
        client.release();
      }
    },
    update: async (params: any) => {
      const client = await pool.connect();
      try {
        const result = await client.query(
          'UPDATE users SET last_login_at = $1 WHERE id = $2 RETURNING *',
          [params.data.lastLoginAt, params.where.id]
        );
        return result.rows[0];
      } finally {
        client.release();
      }
    }
  }
};
