import expressConfig from './app/config/express';
import { databaseConnection }  from './app/config/sequelize';
import config from './app/config/config';

const app = expressConfig();
databaseConnection();

console.log(config)

app.listen(config.port, () => {
  console.log('Server is running on port', config.port);
});
