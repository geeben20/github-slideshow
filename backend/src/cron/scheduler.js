import cron from 'node-cron';
import { env } from '../config/env.js';
import { ingestAllContent } from '../services/ingestionService.js';

export function startScheduler() {
  if (!env.enableCron) return null;
  return cron.schedule(env.cronSchedule, async () => {
    console.log('Running scheduled ingestion...');
    await ingestAllContent();
  });
}
