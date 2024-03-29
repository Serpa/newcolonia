import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/prisma';

export const authOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const dbUser = await prisma.usuarios.findUnique({
                    where: {
                        usuario: credentials.usuario
                    },
                    include: {
                        nome_colonia: true,
                    },
                })
                if (dbUser) {
                    if (dbUser.senha == credentials.senha) {
                        delete dbUser.senha
                        return dbUser
                    }
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, user, token }) {
            session.user = token.user;
            return session
        },
        async jwt({ token, user, account }) {
            if (typeof user !== typeof undefined) {
                token.user = user;
            }
            return token;
        }
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        csrfToken: {
            name: `next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
    }
}
export default NextAuth(authOptions)