import { createConnections, getConnectionManager } from 'typeorm';

createConnections().then(() => {
  console.log('Databases connected 🚀🚀🚀!');
  
  const postgresConnect = getConnectionManager().get("postgres");
  const mysqlConnect = getConnectionManager().get("mysql");
  
  if(postgresConnect){
    postgresConnect.runMigrations().then(() => {
        console.log('Migrations PostgresSql is OK');
    })
  }

  if(mysqlConnect){
    postgresConnect.runMigrations().then(() => {
        console.log('Migrations MySql is OK');
    })
  }
});
