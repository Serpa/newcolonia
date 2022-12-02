import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  console.log(session);
  return (
    <h1>Hello</h1>
  )
}