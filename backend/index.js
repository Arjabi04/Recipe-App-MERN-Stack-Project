const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

// Arjabi
// passpass

app.use(express.json());
app.use(cors());

async function main() {
    await mongoose.connect('mongodb+srv://Arjabi:passpass@recipe-app.lzac0.mongodb.net/recipe-app?retryWrites=true&w=majority&appName=recipe-app');
    
    app.get('/', (req, res) => {
        res.send('recipe app server is running')
    })
} 

// const router = express.Router()

//routes
const ItemRoutes = require("./src/routes/itemRoute")
const CategoryRoutes = require("./src/routes/categoryRoute")
app.use('/api/auth', require("./src/routes/authRoute"));

app.use('/api',ItemRoutes);
app.use('/api',CategoryRoutes);

main().then(()=>console.log("mongodb connected sucessfully")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 