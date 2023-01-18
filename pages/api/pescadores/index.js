import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma';

export default async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        const pescadores = await prisma.pescadores.findMany({
            where: {
                acesso: session.user?.acesso,
            }
        });

        return res.status(200).json(pescadores);
    } else {
        res.status(401)
    }
    res.end()
}