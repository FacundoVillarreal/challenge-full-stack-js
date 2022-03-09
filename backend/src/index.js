const express = require('express');
const app = express();
const cors = require('cors');


// midlewares
app.use(cors())
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api', require('./routes/endpoints'));
app.use('/api', require('./routes/endpoints'));

//server
app.listen(3001, ()=>{
    console.log("Server on port 3001")
})