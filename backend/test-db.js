const mysql = require('mysql2/promise');

async function testConnection() {
  // Update these with your actual MySQL credentials
  const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123', // Change this
    database: 'project_ecommerce' // Change this
  };

  console.log('Testing database connection with config:', {
    host: config.host,
    port: config.port,
    user: config.user,
    database: config.database
  });

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Database connected successfully!');
    
    const [rows] = await connection.execute('SELECT NOW() as current_time');
    console.log('✅ Server time:', rows[0]);
    
    // Check if tables exist
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('✅ Tables in database:', tables.map(t => Object.values(t)[0]));
    
    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔧 Fix: Wrong username or password');
      console.error('   - Check your MySQL username and password');
      console.error('   - Update the password in .env file');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n🔧 Fix: Database does not exist');
      console.error('   - Create the database: CREATE DATABASE ecommerce_db;');
      console.error('   - Or import the SQL file provided');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n🔧 Fix: MySQL server is not running');
      console.error('   - Start MySQL service');
      console.error('   - Check if MySQL is installed');
      console.error('   - Verify host and port are correct');
    }
    
    return false;
  }
}

testConnection();