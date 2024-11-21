import { Queue, Worker } from "bullmq";
import { Redis } from "ioredis";
// import sendEmail from "@/lib/sendMail";

const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  maxRetriesPerRequest: null,
});

const queueName = "email-queue";

const emailQueue = new Queue(queueName, {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
  },
});

async function addToQueue(options: {
  email: string;
  name: string;
  OTP: string;
}) {
  const res = await emailQueue.add(queueName, {
    email: options.email,
    name: options.name,
    OTP: options.OTP,
  });
  console.log("job added to queue", res.id);
}

const worker = new Worker(
  queueName,
  async (job) => {
    const { email, name, OTP } = job.data;
    console.log("Sending email to", email);
    if (!email) {
      throw new Error("No recipients defined");
    }
    // await sendEmail({ email, name, OTP });
  },
  {
    connection: redisConnection,
  },
);

worker.on("ready", () => {
  console.log("Worker is ready to process jobs.");
});

worker.on("failed", (job, err) => {
  console.log(`Job failed: ${(job as any).id}, Error: ${err.message}`);
});

export { addToQueue };
