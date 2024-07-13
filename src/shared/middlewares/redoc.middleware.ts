import redoc from 'redoc-express';

export function setupRedoc(app: any) {
  const redocOptions = {
    title: 'Study Tech API',
    version: '1.0',
    specUrl: '/api-json',
  };

  app.use('/docs', redoc(redocOptions));
}
