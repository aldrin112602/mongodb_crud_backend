const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const app = express();
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
app.use(cors());
app.use(jsonParser);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const usersCollection = client.db(dbName).collection('users');
  try {
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ success: false, message: 'User already exists' });
    }
    // Insert new user
    const newUser = { email, password, name: 'Aldrin Caballero' };

    const result = await usersCollection.insertOne(newUser);
    res.status(200).json({success: true, message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(200).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {

  const { email, password } = req.body;
  const usersCollection = client.db(dbName).collection('users');

  try {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(200).json({ success: false, message: 'User not found' });
    }

    
    if (user.password !== password) {
      console.log('Invalid password');
      return res.status(200).json({ success: false, message: 'Invalid password' });
    }

    
    res.status(200).json({ success: true, message: 'Login successful', user });

  } catch (error) {

    console.error("Error logging in:", error);
    res.status(200).json({ success: false, message: 'Internal server error' });

  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
