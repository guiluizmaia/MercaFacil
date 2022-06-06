
  
import { Router } from 'express';
import v1Routes from '@infra/http/routes/v1';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import { getConnectionManager } from 'typeorm';

//const fileContents = fs.readFileSync('swagger.yml', 'utf8');
const appRoutes = Router();

appRoutes.get('/health-check', async (req, res) => {
    const postgresConnect = getConnectionManager().get("postgres");
    const mysqlConnect = getConnectionManager().get("mysql");

    let databasePostgre = false;
    let databaseMySql = false;

    if(postgresConnect){
        databasePostgre = true
    }
  
    if(!mysqlConnect){
        databaseMySql = true
    }
    
    return res.status(200).json({
      success: {
        type: 'SUCCESS_REQUEST',
        server: 'Is online',
        databasePostgre,
        databaseMySql,
        message: 'The application is healthy.',
      },
    });
});

appRoutes.use(v1Routes);

/*appRoutes.use(
  '/api-doc/v1',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);*/

appRoutes.all('*/*', (req, res) => {
  return res.status(404).json({
    error: {
      errorType: 'RESOURCE_NOT_FOUND',
      message: `Cannot found resource ${req.method} ${req.path}`,
    },
  });
});

export default appRoutes;