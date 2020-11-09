const express = require('express');
const app = express();
const port = 8000;

//require layouts 
const expressLayouts = require('express-ejs-layouts');

//cookie parser
const cookieParser = require('cookie-parser');

//database
const db = require('./config/mongoose');

//reading throught post requests
app.use(express.urlencoded());

//setting up cookie parser
app.use(cookieParser());

//use static CSS Javasctipt and images files
app.use(express.static('./assets'));

//use layouts before the views are rendered in the routes, so we need to tell before that those views belong to some layout
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){
        //interpolation is used with ` using which if we put anything inside ${}, it'll get evaluated(like variable or expression)
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`The server is up and running on port: ${port}`);
});