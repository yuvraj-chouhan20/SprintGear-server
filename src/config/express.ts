import express, { Request, Response, Application } from 'express'
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { sync } from 'glob'
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import config from './config';
import i18n from 'i18n';

export default () =>{
  const app = express();

  i18n.configure({
    locales: ['en', 'hi'],
    directory: path.join(__dirname, '../locales'),
    defaultLocale: 'en',
    cookie: 'lang',
    objectNotation: true
  });

  app.use(i18n.init);
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


  if(config.NODE_ENV !== 'production'){
    let options = {
      customCss: '.swagger-ui .models { display: none }'
    };
    let mainSwaggerData = JSON.parse(fs.readFileSync('swagger.json', 'utf8'));
    mainSwaggerData.host = config.HOST;
    mainSwaggerData.basePath = process.env.BASE_PATH;
    const modules = path.join(__dirname, '../modules');
    fs.readdirSync(modules).forEach(file =>{
      console.log(modules + "/" + file)
      if(fs.existsSync(modules + "/" + file + "/swagger.json")){
        const stats = fs.statSync(modules + "/" + file + "/swagger.json");
        const fileSizeBytes = stats.size;
        if(fileSizeBytes){
          const moduleSwaggerData = JSON.parse(fs.readFileSync(modules + "/" + file + "/swagger.json", 'utf8'));
          mainSwaggerData.paths = { ...mainSwaggerData.paths, ...moduleSwaggerData.paths };
          mainSwaggerData.definitions = { ...mainSwaggerData.definitions, ...moduleSwaggerData.definitions };
        }
      }
    })
    let swaggerDocument = mainSwaggerData;
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));
  }

  sync(path.join(__dirname, '../modules','**', 'Routes.ts')).forEach((file: string) => {
    const route = require(file).default;
    if(route){
      app.use('/api', route(app));
    }
  });


  return app;
}