import expressConfig from './config/express';
import { databaseConnection }  from './config/sequelize';
import config from './config/config';

const app = expressConfig();
databaseConnection();

app.listen(config.port, () => {
  console.log('Server is running on port', config.port);
});
