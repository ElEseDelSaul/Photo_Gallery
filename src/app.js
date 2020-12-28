const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const {format} = require('timeago.js');
const path = require('path');
const exphbs = require('express-handlebars');

//Routes
const indexRoutes = require('./routes/index.routes');

class Server {

    constructor() {
        this.app = express();
        this.Config();
        this.Routes();
        this.Start();
    }

    Config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path.resolve( __dirname , 'views'));
        //Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        //View Engine
        this.app.engine('.hbs',exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views') , '/layouts'),
            partialsDir: path.join(this.app.get('views') , '/partials'),
            extname: '.hbs'
        }));
        this.app.set('view engine','hbs');
        const storage = multer.diskStorage({
            destination: path.join(__dirname, '/public/uploads'),
            filename: (req,file,cb)=>{
                    //Err , Filename
                cb(null, path.join(new Date().getTime() + path.extname(file.originalname)));
            }
        })
        this.app.use(multer({storage}).single('image'));
        //Global Variable
        this.app.use((req,res,next)=>{
            res.locals.format = format;
            next();
        })
        //Static Files
        this.app.use(express.static( path.join(__dirname , '/public') ));
    }

    Routes() {
        this.app.use(indexRoutes);
    }

    Start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on Port ' + this.app.get('port'));
        })
    }
}

new Server();