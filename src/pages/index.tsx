import { useState, useRef, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Typography from '@mui/material/Typography'

/* components */
import InputForm, { FormValues } from '../components/form/form'
import ResultsView from '../components/results/resultsView'
import Layout from '../components/shell/layout'
import Usage from '../components/usage/usage'
import { Box } from '@mui/material'

const Home: NextPage = () => {
  const [searchParams, setSearchParams] = useState<FormValues | null>(null)
  const onSubmit = (data: FormValues) => {
    setSearchParams(data)
  }
  const resultsViewRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (searchParams && resultsViewRef && resultsViewRef.current) {
      resultsViewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [searchParams])

  return (
    <Layout home>
      <Head>
        <title>
          保育園・幼稚園ルート検索: 自宅から施設までの距離と所要時間を検索！【神奈川県版】
        </title>
      </Head>
      <Box pt={16} pb={16}>
        <Box sx={{ mx: { sm: 0, md: 8 } }} py={4}>
          <Typography variant='h4'>神奈川県版</Typography>
          <Typography variant='h3'>保育園・幼稚園ルート検索</Typography>
        </Box>
        <Usage />
        <InputForm onSubmit={onSubmit} />
        {searchParams && (
          <div ref={resultsViewRef}>
            <ResultsView searchParams={searchParams} />
          </div>
        )}
      </Box>
    </Layout>
  )
}

export default Home
