const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const passport = require('passport');
const userRoute = require("./routes/users");
const itemRoute = require("./routes/items")
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
dotenv.config();
const cors = require('cors');

mongoose.connect(
    process.env.ATLAS_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch(()=>{
        console.log("Couldn't connect to MongoDB");
    })

//middleware
app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoute);
app.use("/users", userRoute);
app.use("/items", itemRoute);
// app.use("/api/posts", postRoute);

// app.use(passport.initialize());
// app.use(passport.session());

// require('./auth/passport')(passport);

app.listen(8080,()=>{
    console.log("Backend server is running!")
})