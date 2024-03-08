import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import User from './models/User.js';




dotenv.config();


const app = express();
const port = 4000;
app.use(cors());
const PORT = 6000;



app.use(bodyParser.json());

let users = [];
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
    // Rest of your code...
  })
  .catch((error) => console.log(`${error} did not connect`));

app.post('/register', async(req, res) => {
    const { email, password, username } = req.body;

  
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, password, username });
        console.log("new",newUser);

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database based on username and password
        const user = await User.findOne({ username, password });
        console.log("user", user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.patch('/forgot-password', async (req, res) => {
    const { email,username,newPassword } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: email }, { username: username}] });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the homepage!');
});

app.get('/login', (req, res) => {
    res.status(200).send('Welcome to the login page!');
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

