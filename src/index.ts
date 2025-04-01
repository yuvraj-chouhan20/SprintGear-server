import expressConfig from './app/config/express';

const app = expressConfig();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
