const express = require('express');
const app = express();
const port = 8000;

//require layouts 
const expressLayouts = require('express-ejs-layouts');

//cookie parser
const cookieParser = require('cookie-parser');

//database
const db = require('./config/mongoose');

//express session(used for session cookie)
const session = require('express-session');

//passport
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//passport jwt
const passportJWT = require('./config/passport-jwt-strategy');

const MongoStore = require('connect-mongo')(session);

//SASS
const sassMiddleware = require('node-sass-middleware');

//Connect flash for flash messages
const flash = require('connect-flash');
//Middleware for flash
const customMware = require('./config/middleware');


//SASS files to be complied just before server starts
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

//reading throught post requests
app.use(express.urlencoded());

//setting up cookie parser
app.use(cookieParser());

//use static CSS Javasctipt and images files
app.use(express.static('./assets'));

//making upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//use layouts before the views are rendered in the routes, so we need to tell before that those views belong to some layout
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'somethingblahblah',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disable'
        },
     function(err){
         console.log(err || 'connect-mongodb setup ok');
     }   
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use flash just after where session is being used as it needs session cookie
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        //interpolation is used with ` using which if we put anything inside ${}, it'll get evaluated(like variable or expression)
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`The server is up and running on port: ${port}`);
});