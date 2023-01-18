import nextConnect from "next-connect";
import multer from "multer";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
let nome = "";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let path = './public/uploads/';
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
}).array("file", 5);


const apiRoute = nextConnect({
    onError(error, req, res) {
        res.json({
            status: false,
            data: [],
            oth: `Sorry something Happened! ${error.message}`,
        });
    },
    onNoMatch(req, res) {
        res.json({
            status: false,
            data: [],
            oth: `Method '${req.method}' Not Allowed`,
        });
    },
});


apiRoute.post(async (req, res) => {
    await upload(req, res, function (err) {
        nome = req.body.nomeDocumento;
        console.log(req.body.nomeDocumento);
        if (err) {
            return res.json({
                status: false,
                data: "File uploading faled."
            });
        }
    });

    try {
        const session = await unstable_getServerSession(req, res, authOptions);
        console.log(session);
        await prisma.documentos.create({
            data: {
                nomeDocumento: nome,
                urlDocumento: nome,
                idColonia: session.user?.acesso,
                idUsuario: session.user?.id,
              },
        });
        return res.status(200).end();
    } catch (err) {
        console.log(err);
        return res.status(503).json({ err: err.toString() });
    }
});
export default apiRoute;
export const config = {
    api: {
        bodyParser: false,
    },
};