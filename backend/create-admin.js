const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123', // Change this to your MySQL password
    database: 'project_ecommerce'
  });

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    // Check if admin already exists
    const [existing] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      ['rakibmahbubkhan@gmail.com']
    );
    
    if (existing.length > 0) {
      console.log('Admin user already exists, updating password...');
      await connection.execute(
        'UPDATE users SET password = ?, role = ? WHERE email = ?',
        [hashedPassword, 'admin', 'rakibmahbubkhan@gmail.com']
      );
    } else {
      // Insert admin user
      await connection.execute(
        `INSERT INTO users (email, password, first_name, last_name, role, is_active) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['rakibmahbubkhan@gmail.com', hashedPassword, 'Admin', 'User', 'admin', true]
      );
    }
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: rakibmahbubkhan@gmail.com');
    console.log('Password: Admin@123');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await connection.end();
  }
}

createAdminUser();