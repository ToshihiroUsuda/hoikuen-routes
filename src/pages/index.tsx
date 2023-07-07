import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Typography, Button } from '@mui/material'

/* components */
import Link from '../components/common/link'
import Layout from '../components/shell/layout'

/* constants */
import { Prefecture, prefectureMap, prefectureNames } from '../libs/hoikuen'

const Home: NextPage = () => {
  return (
    <Layout home>
      <Head>
        <title>保育園・幼稚園ルート検索: 自宅から施設までの距離と所要時間を検索！</title>
      </Head>
      <Box pt={16} pb={16} sx={{ mx: { sm: 0, md: 8 } }}>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            保育園/幼稚園を選び中の方
          </Typography>
          <Typography variant='h6' sx={{ mt: 2 }}>
            「自宅からの距離で比較したい！」
          </Typography>
          <Typography variant='h6'>と思ったことはありませんか？</Typography>
          <ResponsiveImage src='/images/lp1.png' alt='悩む女性' />
          <Typography variant='h5' sx={{ fontWeight: 'bold', mt: 4 }}>
            そんなあなたへ！
          </Typography>
          <Typography variant='h6' sx={{ mt: 4 }}>
            自宅の住所を入力したら
          </Typography>
          <ResponsiveImage src='/images/lp2.png' alt='パソコンを使う女性' />
          <Typography variant='h6' sx={{ mt: 4 }}>
            近くの保育園・幼稚園までの
          </Typography>
          <ul>
            <li>
              <Typography variant='h6'>所要時間</Typography>
            </li>
            <li>
              <Typography variant='h6'>距離</Typography>
            </li>
            <li>
              <Typography variant='h6'>ルート</Typography>
            </li>
          </ul>
          <Typography variant='h6' sx={{ mt: 0 }}>
            を複数比較できます！
          </Typography>
          <ResponsiveImage src='/images/lp3.png' alt='地図をみる女性' />
        </Box>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='h5'>お住まいの地域を選択してください</Typography>
          {prefectureNames.map((prefecture: Prefecture) => {
            return <LinkButton key={prefecture} prefecture={prefecture} />
          })}
        </Box>
      </Box>
    </Layout>
  )
}

type ResponsiveImageProps = {
  src: string
  alt: string
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = (props) => {
  return (
    <Box position='relative' sx={{ width: { xs: 320, sm: 480 }, height: { xs: 320, sm: 480 } }}>
      <Image src={props.src} alt={props.alt} fill sizes='(max-width: 600px) 480px, 320px' />
    </Box>
  )
}

type LinkButtonProps = {
  prefecture: Prefecture
}

const LinkButton: React.FC<LinkButtonProps> = ({ prefecture }) => {
  const prefectureJa = prefectureMap[prefecture]
  return (
    <Link href={{ pathname: '/search/[prefecture]', query: { prefecture } }}>
      <Button
        variant='contained'
        sx={{ my: 2, width: 320, height: 160, fontSize: 48, fontWeight: 'bold' }}
      >
        {`${prefectureJa}`}版
      </Button>
    </Link>
  )
}

export default Home
