import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import prisma from '../../lib/prisma';


const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);
    await runMiddleware(req, res, uploadMiddleware);
    const stream = await cloudinary.uploader.upload_stream(
        {
            folder: "demo",
            use_filename: true,
            resource_type: 'raw',
            filename_override: req.file.originalname
        }, (error, result) => {
            if (error) res.json({ status: 500, message: err.message });
            if (result) prismaInsert(req, res, result)
        }
    )
    const readableStream = streamifier.createReadStream(req.file.buffer).pipe(stream);

    const prismaInsert = async (req, res, result) => {
        if (session) {
            try {
                await prisma.documentos.create({
                    data: {
                        nomeDocumento: req.body.nomeDocumento,
                        urlDocumento: result.secure_url,
                        idColonia: session.user?.acesso,
                        idUsuario: session.user?.id
                    }
                })
                return res.status(200).end();
            } catch (error) {
                return res.status(503).json({ err: err.toString() });
            }
        }
    }
    res.end()
}
export const config = {
    api: {
        bodyParser: false,
    },
};