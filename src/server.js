import { initMongoConnection } from './db/initMongoConnection.js';
import app from './app.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const setupServer = async () => {
  try {
    await initMongoConnection();
    const PORT = process.env.PORT || 3000;
    app.use(notFoundHandler);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
setupServer();
