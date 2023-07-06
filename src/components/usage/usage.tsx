import React from 'react'
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
          'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),' + gradation,
      }}
    >
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        使い方
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
          」から2023年6月11日に取得したデータを利用しています。ヒットしない施設があったり、最新状況を反映していなかったりする可能性があります。
        </li>
        <li>
          検索結果として表示される最大10件の施設は、出発地からの直線距離が近い施設を選んでいます。地形や線路などによって、遠い経路の施設がヒットすることがあります。
        </li>
      </ul>
    </Box>
  )
}

export default Usage
