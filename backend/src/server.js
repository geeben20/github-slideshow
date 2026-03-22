import { createApp } from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { startScheduler } from './cron/scheduler.js';

const app = createApp();

connectDb()
  .then(() => {
    startScheduler();
    app.listen(env.port, () => {
      console.log(`API listening on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
