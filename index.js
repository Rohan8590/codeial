const express = require('express');
const app = express();
const port = 8000;

app.listen(port,function(err){
    if(err){
        //interpolation is used with ` using which if we put anything inside ${}, it'll get evaluated(like variable or expression)
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`The server is up and running on port: ${port}`);
});