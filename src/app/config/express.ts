import express, { Request, Response, Application } from 'express'
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { sync } from 'glob'
import path from 'path';



export default () =>{
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }));
  app.use(morgan('dev'));

  sync(path.join(__dirname, '../modules','**', 'Routes.ts')).forEach((file: string) => {
    const route = require(file).default;
    if(route){
      app.use('/api', route(express));
    }
  });


  return app;
}