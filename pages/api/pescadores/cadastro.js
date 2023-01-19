import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma';

export default async function CadastroAPI (req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);
    const convertDate = (date) => {
        console.log(isDate);
        let newDate = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")
        if (newDate != "Invalid date") {
            return newDate;
        }
    }
    if (session) {
        if (req.method === "POST") {
            let { ...data } = req.body;
            data = { ...data, acesso: session.user?.acesso, ativo: true };
            data = {
                ...data,
                emissao_cnh: convertDate(data.emissao_cnh),
                vencimento: convertDate(data.vencimento),
                filiacao: convertDate(data.filiacao),
                nascimento: convertDate(data.nascimento),
                emissao_rg: convertDate(data.emissao_rg),
                data_rgp: convertDate(data.data_rgp),
            }
            try {
                await prisma.pescadores.create({
                    data
                });
                return res.status(200).end();
            } catch (err) {
                console.log(err);
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