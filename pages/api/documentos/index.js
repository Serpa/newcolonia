import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma';

export default async function DocumentosAPI (req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        const documentos = await prisma.documentos.findMany({
            where: {
                idColonia: session.user?.acesso
            }
        })
        return res.status(200).json(documentos);
    } else {
        res.status(401)
    }
    res.end()
}