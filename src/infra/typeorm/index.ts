import { createConnections, getConnectionManager } from 'typeorm';

createConnections().then(() => {
  console.log('Databases connected 🚀🚀🚀!');
  
});
