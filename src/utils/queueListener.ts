import { emailQueue } from "../config/emailQueu";

emailQueue.on('completed', (job) => {
  console.log(`Email sent to ${job.data.to}`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Failed to send email to ${job.data.to}:`, err);
});
