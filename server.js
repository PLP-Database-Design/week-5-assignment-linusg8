const express = require('express');
   const app = express() ;
   const mysql = require('mysql2') ;
   const dotenv = require ('dotenv');
   const cors = require ('cors');
   app.use(express.json()) ;
   app.use(cors());
   dotenv.config() ;
   
// Create the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
  } else {
    console.log('Connected to the MySQL database id',DB_threadId);
  }
  app.listen(process.env.PORT , () =>{
console.log(`server listening on port ${process.env.PORT}`);
console.log('sending message to the browser...');
app.get('/',(req,res) => {
res.send('server start succefully')
})
});  
});

// Get all patients
app.get('/get-patients', (req, res) => {
  const { first_name } = req.query
  let query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients'
  const params = []

  if (first_name) {
    query += ' WHERE first_name = ?'
    params.push(first_name) 
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving patients')
    }
    res.json(results)
  })
})

// Get all providers
app.get('/providers', (req, res) => {
  const { specialty } = req.query
  let query = 'SELECT first_name, last_name, provider_specialty FROM providers'
  const params = []

  if (specialty) {
    query += ' WHERE provider_specialty = ?'
    params.push(specialty)
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers')
    }
    res.json(results)
  })
})