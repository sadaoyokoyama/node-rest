import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from '../config/database';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

const configureExpress = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "views"));

    app.use('/', routes);

    return app;
};

export default () => database.connect().then(configureExpress);
