const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config(); 

const mongoURI=process.env.MONGODB_URI

mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));;

const app=express();
const PORT=3000;

app.use(bodyParser.json());
app.use(cors());


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
  });

const User = mongoose.model('User', userSchema);
app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.post('/users', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      // Create a new user instance
      const newUser = new User({ username, email, password });
      // Save the user to the database
      await newUser.save();
      res.status(201).json(newUser); // Send the created user as response
    } catch (error) {
      res.status(500).json({ error: error.message }); // Send error response
    }
  });

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});