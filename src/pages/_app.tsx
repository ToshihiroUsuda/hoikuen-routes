import { useMemo } from 'react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import createEmotionCache from '../createEmotionCache'
import defaultTheme from '../theme'

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // const router = useRouter()

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     gtag.pageview(url)
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  const theme = useMemo(
    () =>
      createTheme({
        ...defaultTheme,
      }),
    [],
  )
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* <GaScript /> */}
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
