import Bull from 'bull';
import { sendEmail } from '../utils/sendemail';

export const emailQueue = new Bull('emailQueue', {
  redis: { host: '127.0.0.1', port: 6379 },
  limiter: {
    max: 100,           // max 100 jobs
    duration: 60000,    // per 1 minute
  },
});

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  await sendEmail(to, subject, html);
});
