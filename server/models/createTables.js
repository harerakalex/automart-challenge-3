import pool from '../config/db';


pool.on('connect', () => {
    console.log('connected to the db');
  });

const createTables = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(80) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        address VARCHAR(100) NOT NULL,
        is_admin BOOLEAN NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cars(
      id SERIAL PRIMARY KEY,
      owner INT NOT NULL,
      created_on TIMESTAMP,
      state VARCHAR(5) NOT NULL,
      status VARCHAR(20) NOT NULL,
      price INT NOT NULL,
      manufacture VARCHAR(20) NOT NULL,
      model VARCHAR(20) NOT NULL,
      body_type VARCHAR(20) NOT NULL,
      description VARCHAR(150) NOT NULL,
      picture VARCHAR(150) NOT NULL,
      FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS orders(
      id SERIAL PRIMARY KEY,
      buyer_id INT NOT NULL,
      car_id INT NOT NULL,
      created_on TIMESTAMP,
      amount INT NOT NULL,
      status VARCHAR(20) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS flags(
      id SERIAL PRIMARY KEY,
      car_id INT NOT NULL,
      created_on TIMESTAMP,
      reason VARCHAR(100) NOT NULL,
      description VARCHAR(150) NOT NULL,
      FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
    )`;

pool.query(createTables).then(() => {
  console.log('tables created successfully');
  pool.end();
}).catch((err) => {
  console.log(err);
  process.exit(0);
});
