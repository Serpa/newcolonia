import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma';

export default async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const { id } = req.query
    if (session) {
        const pescadores = await prisma.pescadores.findFirst({
            where: {
                id: parseInt(id),
                acesso: session.user?.acesso,
            },
            select: {
                id: true,
                ficha: true,
                nome: true,
                endereco: true,
                numero: true,
                bairro: true,
                cidade: true,
                estado: true,
                cep: true,
                celular: true,
                telefone: true,
                tel_recado: true,
                cpf: true,
                rg: true,
                orgao_emissor: true,
                rgp: true,
                pis: true,
                cei: true,
                cnh: true,
                emissao_cnh: true,
                email: true,
                vencimento: true,
                filiacao: true,
                nascimento: true,
                local_nascimento: true,
                observacao: true,
                emissao_rg: true,
                pai: true,
                mae: true,
                data_rgp: true,
                titulo_eleitor: true,
                carteira_trabalho: true,
                capataz: true,
                profissao: true,
                estado_civil: true,
                acesso: true,
                ativo: true,
                nome_colonia: true
              },
        });

        return res.status(200).json(pescadores);
    } else {
        res.status(401)
    }
    res.end()
}