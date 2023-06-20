import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box } from '@mui/material'

/* components */
import InputForm, { FormValues } from '../components/form'
import ResultsView from '../components/resultsView'
import Layout from '../components/shell/layout'

const Home: NextPage = () => {
  const [searchParams, setSearchParams] = useState<FormValues | null>(null)
  const onSubmit = (data: FormValues) => {
    setSearchParams(data)
  }

  return (
    <Layout home>
      <Head>
        <title>保育園までの距離と時間</title>
      </Head>
      <Box pt={16}>
        <InputForm onSubmit={onSubmit} />
      </Box>
      {searchParams && <ResultsView searchParams={searchParams} />}
    </Layout>
  )
}

export default Home
