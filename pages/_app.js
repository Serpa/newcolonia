import { SessionProvider } from "next-auth/react"
import { SnackbarProvider } from 'notistack';
import Wrapper from "../components/Wrapper"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider maxSnack={3} >
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </SnackbarProvider>
    </SessionProvider>
  )
}