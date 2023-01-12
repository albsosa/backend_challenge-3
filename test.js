import csvToJson from 'csvtojson'
import { downloadFile } from './s3.js'

async function handler(event) {
  const result = await downloadFile()
  if(result){
    const csvFilePath = './csv/users.csv'
    const json = await csvToJson().fromFile(csvFilePath)
    const jsonString = JSON.stringify(json, null, 2)
    console.log(jsonString, 'jsonString')
    return {
      statusCode: 200,
      body: JSON.stringify(jsonString),
    }
  }
}
const event = 'esta linea se va'
handler(event);