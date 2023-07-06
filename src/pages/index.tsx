import type { NextPage } from 'next'
import Head from 'next/head'
import { Box } from '@mui/material'

/* components */
import Layout from '../components/shell/layout'

const Home: NextPage = () => {
  return (
    <Layout home>
      <Head>
        <title>保育園・幼稚園ルート検索: 自宅から施設までの距離と所要時間を検索！</title>
      </Head>
      <Box pt={16} pb={16} sx={{ mx: { sm: 0, md: 8 } }}></Box>
    </Layout>
  )
}

export default Home
