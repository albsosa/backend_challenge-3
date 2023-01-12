import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } from './config.js'
import fs from 'fs'

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
      accessKeyId: AWS_PUBLIC_KEY,
      secretAccessKey: AWS_SECRET_KEY
  }
})

export async function downloadFile() {
  const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: 'users.csv'
  })
  try {
    const result = await client.send(command)
    result.Body.pipe(fs.createWriteStream(`./csv/users.csv`))
    return { status: 200, message: 'Ok' }
  } catch (error) {
    console.log(error)
  }

}