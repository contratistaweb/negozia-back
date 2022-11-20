export default () => ({
  mongoUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_COLLECTION}`,
  apiHost: process.env.API_HOST || 'localhost',
  apiPort: Number(process.env.API_Port) || 3000,
});
