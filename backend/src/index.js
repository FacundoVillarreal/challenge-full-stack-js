const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001 
// midlewares
app.use(cors())
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api', require('./routes/endpoints'));

//server
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})