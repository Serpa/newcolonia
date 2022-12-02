import { SessionProvider } from "next-auth/react"
import Wrapper from "../components/Wrapper"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>
  )
}