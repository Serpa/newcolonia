import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"
import prisma from '../../lib/prisma';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function UploadAPI(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const file = data?.files?.inputFile.filepath;

  try {
    const response = await cloudinary.v2.uploader.upload(file, {
      use_filename: true,
      resource_type: 'raw',
      filename_override: data?.files?.inputFile.originalFilename
    });
    try {
      console.log(response);
      const insert = await prisma.documentos.create({
        data: {
          nomeDocumento: data?.fields?.nomeDocumento,
          public_id: response.public_id,
          urlDocumento: response.secure_url,
          idColonia: session.user?.acesso,
          idUsuario: session.user?.id
        }
      })
      return res.json(insert);
    } catch (error) {
      return res.json(err);
    }
  } catch (err) {
    return res.json(err);
  }
};

