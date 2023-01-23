import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
import prisma from '../../../lib/prisma';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});


export default async function DeleteAPI(req, res) {

    const doc = req.body;
    console.log(doc);

    try {
        const response = await cloudinary.v2.uploader.destroy(doc.public_id, {
            resource_type: 'raw',
        });
        try {
            console.log(response);
            const insert = await prisma.documentos.delete({
                where: {
                    id: doc.id
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

