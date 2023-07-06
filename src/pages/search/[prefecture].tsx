import { useState, useRef, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

/* components */
import InputForm, { SearchParams } from '../../components/form/form'
import ResultsView from '../../components/results/resultsView'
import Layout from '../../components/shell/layout'
import Usage from '../../components/usage/usage'
import GoogleAdsense from '../../components/common/adsense'

/*constants*/
import { Prefecture, prefectureMap } from '../../libs/hoikuen'

const Search: NextPage = () => {
  const router = useRouter<'/search/[prefecture]'>()
  const { prefecture } = router.query

  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
  const onSubmit = (data: SearchParams) => {
    if (JSON.stringify(data) !== JSON.stringify(searchParams)) {
      setSearchParams({ ...data })
    }
  }
  const resultsViewRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (searchParams && resultsViewRef && resultsViewRef.current) {
      resultsViewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [searchParams, resultsViewRef])

  const prefectureNames = Object.keys(prefectureMap)
  if (prefectureNames.indexOf(prefecture) < 0) {
    return (
      <Box m={4}>
        <Typography>リンクが不正です。下記をお試しください</Typography>
        <ul>
          {prefectureNames.map((key) => {
            return (
              <li key={key}>
                <a href={`/search/${key}`}>{prefectureMap[key]}版 保育園・幼稚園ルート検索</a>
              </li>
            )
          })}
        </ul>
      </Box>
    )
  }

  return (
    <Layout>
      <Head>
        <title>
          {`保育園・幼稚園ルート検索: 自宅から施設までの距離と所要時間を検索！【${prefectureMap[prefecture]}版】`}
        </title>
      </Head>
      <Box pt={16} pb={16} sx={{ mx: { sm: 0, md: 8 } }}>
        <Box py={4}>
          <Typography variant='h4'>{`${prefectureMap[prefecture]}版`}</Typography>
          <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
            保育園・幼稚園ルート検索
          </Typography>
        </Box>
        <Usage />
        <GoogleAdsense />
        <InputForm onSubmit={onSubmit} prefecture={prefecture as Prefecture} />
        <GoogleAdsense />
        {searchParams && (
          <div ref={resultsViewRef}>
            <ResultsView searchParams={searchParams} prefecture={prefecture as Prefecture} />
          </div>
        )}
      </Box>
    </Layout>
  )
}

export default Search
