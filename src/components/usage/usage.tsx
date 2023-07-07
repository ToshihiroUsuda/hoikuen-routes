import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

/* components */

/* constants */
import { gradation } from '../../constants'

const Usage: React.FC = () => {
  return (
    <Box
      p={4}
      // bgcolor={'gray'}
      borderRadius={4}
      sx={{
        background:
          'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),' + gradation,
      }}
    >
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        使い方
      </Typography>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box display='flex' sx={{ flexDirection: { sm: 'column', md: 'row' } }}>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box
              height={64}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Typography
                variant='h6'
                display='flex'
                flexDirection='column'
                sx={{ fontWeight: 'bold' }}
              >
                自宅の住所を入力！
              </Typography>
            </Box>

            <Image src='/images/lp2.png' alt='パソコンを使う女性' width={320} height={320} />
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box
              height={64}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                近くの施設までの
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                所要時間や距離・ルートを比較！
              </Typography>
            </Box>
            <Image src='/images/lp3.png' alt='地図を見る女性' width={320} height={320} />
          </Box>
        </Box>
      </Box>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        特徴
      </Typography>
      <ul>
        <li>
          下のフォームにあなたの家の住所や、そのほかの検索条件を入力し「検索」ボタンを押してください。
        </li>
        <li>あなたの家から半径5km以内にある、保育園・幼稚園を検索します。</li>
        <li>
          保育園・幼稚園を示したマップと、あなたの家から近い順に最大10件の保育園・幼稚園のリストが表示されます。
        </li>
      </ul>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        注意点
      </Typography>
      <ul>
        <li>
          施設までのルートや所要時間、距離などの情報はGoogle Map
          APIから取得しています。検索条件によって正しい結果が得られない可能性があります。
        </li>
        <li>
          施設の情報は「
          <a href='https://www.wam.go.jp/kokodesearch/ANN010100E00.do'>ここdeサーチ</a>
          」から2023年6月11日に取得した認可施設のデータを利用しています。ヒットしない施設があったり、最新状況を反映していなかったりする可能性があります。また、未認可の施設の情報は掲載していません。
        </li>
        <li>
          検索結果として表示される最大10件の施設は、出発地からの直線距離が近い施設を選んでいます。地形や線路などによって、遠い経路の施設がヒットすることがあります。
        </li>
      </ul>
    </Box>
  )
}

export default Usage
