import { useState, useRef, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

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
        <title>保育園までの距離と時間</title>
      </Head>
      <Box pt={16} pb={16}>
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
