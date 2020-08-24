import express from 'express';
import routes from './src/routes';

const app = express(); 
const server= app.listen(4000, () => {
  console.log(`API Service started on port ${4000}`);
});

app.use('/', routes);