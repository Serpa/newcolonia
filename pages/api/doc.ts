import Docxtemplater from "docxtemplater";
const JSZip = require("jszip");
const axios = require('axios');
const FileSaver = require('file-saver');
import moment from 'moment';

//Next.js import
import { NextApiRequest, NextApiResponse } from 'next'

export default async function generateDocument(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  
  let hoje = moment().format("DD/MM/YYYY")

  //Receiving data
  const { pescador, urlDocumento, nomeDocumento } = req.body;
  pescador.data = hoje;
  console.log(pescador);
  

  //Fetching the template
  const template = await axios.get(urlDocumento, { responseType: 'arraybuffer' });
  const content = new Uint8Array(template.data);
  const zip = new JSZip();
  await zip.loadAsync(content);
  const doc = new Docxtemplater();
  await doc.loadZip(zip);

  //Setting the data
  doc.setData(pescador);
  try {
    //Rendering the document
    await doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    throw error;
  }

  //Buffer the generated document
  const buf = await doc.getZip().generateAsync({ type: "blob" });

  //Saving the document using FileSaver
  FileSaver.saveAs(buf, `${nomeDocumento}.docx`);
  res.end();
}