const mongoose = require('mongoose');
require('dotenv').config();

const connection = ()=>{
     
         mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
            console.log("Database is connect successfully");
        })
        .catch((error)=>{
           console.error(error.message);
           console.log("db connection failed");
           process.exit(1);
        })
}

module.exports = connection;