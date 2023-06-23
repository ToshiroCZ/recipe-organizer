const express = require('express');
const app = express();
const mssql = require('mssql');

app.use(express.json());

// Configure the MSSQL connection string
const connectionString = "Data Source=(localdb)\\Local;Initial Catalog=recipe-organizer-db2;Encrypt=False;";

// Define the API endpoints
app.post('/api/recipes', async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  try {
    // Create a new MSSQL connection pool using the connection string
    const pool = await mssql.connect(connectionString);

    // Execute the SQL query to insert the new recipe
    const query = `INSERT INTO Recipes (Title, Ingredients, Instructions)
    VALUES (@title, @ingredients, @instructions)`;

    const result = await pool.request()
      .input('title', mssql.VarChar(100), title)
      .input('ingredients', mssql.NVarChar(mssql.MAX), ingredients)
      .input('instructions', mssql.NVarChar(mssql.MAX), instructions)
      .query(query);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    // Create a new MSSQL connection pool using the connection string
    const pool = await mssql.connect(connectionString);

    // Execute the SQL query to retrieve all recipes
    const query = `SELECT *
      FROM Recipes`;
    const result = await pool.request().query(query);

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});