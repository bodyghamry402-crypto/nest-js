export default () => ({
   port: parseInt(process.env.PORT as string) || 3000,

  database: {
    url: process.env.DB_URL,
  },

  redis: {
    host: process.env.REDIS_URL,
    port: 6379,
  },

  mail: {
    user: process.env.USER_EMAIL,
    password: process.env.USER_PASS,
  },
  jwt: {
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  },

  s3: {
    region: process.env.S3_REGION,
    bucketName: process.env.S3_BUCKET_NAME,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,

    expiresIn:
      parseInt(process.env.S3_EXPIRES_IN as string) || 1800,
  },
  mailer: {
  host: process.env.MAILER_HOST,
  port: parseInt(process.env.MAILER_PORT as string) || 465,

  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
 },
});