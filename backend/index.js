require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const walkRoutes = require('./routes/walkDetails')

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    next()
})

// app.get('/', (req, res) => {
//     res.json("connected to db ");
// })

app.use('/api/walkDetails', walkRoutes)
//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(9000, () => {
            console.log("server started at 9000");
        });
    })
    .catch((error) => {
        console.log(error);
    });

//listen for requests
// app.listen(9000, () => {
//     console.log(process.env.MONGO_URI);
//     console.log('fe');
// });