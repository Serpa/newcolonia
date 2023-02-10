import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma';

export default async function DeleteAPI (req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        if (req.method === "POST") {
            let { ...data } = req.body;
            try {
                await prisma.pescadores.update({
                    where: { id: data.id },
                    data:{ativo: false}
                });
                return res.status(200).end();
            } catch (err) {
                return res.status(503).json({ err: err.toString() });
            }
        } else {
            return res
                .status(405)
                .json({ error: "This request only supports POST requests" });
        }
    } else {
        res.status(401);
    }
    res.end()
}