import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

/* types */
import { HoikuenRoute } from '../types/location'
import { FormValues } from './form'

/* libs */
import { getGeocodeApiResponse } from '../libs/geocodingApi'
import { getTopKNearestHoikuen } from '../libs/location'
import { getRoutesApiResponse } from '../libs/routesApi'
import { formatDistance, formatDuration } from '../utils'

/* dev */

type Props = {
  searchParams: FormValues
}

const calcRoutes = async (params: FormValues): Promise<HoikuenRoute[]> => {
  if (process.env.NODE_ENV === 'development') {
    return testResults
  }
  // geocodingの取得
  const originLatLng = await getGeocodeApiResponse(params.origin)
  // 近くの保育園の取得
  const top10Hoikuen = getTopKNearestHoikuen(originLatLng, 'Kanagawa', 10)
  // その保育園の所要時間、距離を取得
  const searchResults = await Promise.all(
    top10Hoikuen.map(async (hoikuen) => {
      const route = await getRoutesApiResponse({
        origin: originLatLng,
        destination: { latitude: hoikuen.latitude, longitude: hoikuen.longitude },
        travelMode: params.travelMode,
      })
      return { ...hoikuen, ...route }
    }),
  )
  return searchResults
}

const ResultsView: React.FC<Props> = ({ searchParams }) => {
  const [results, setResults] = useState<HoikuenRoute[]>([])

  useEffect(() => {
    const getResults = async () => {
      try {
        const searchResults = await calcRoutes(searchParams)
        const sortedResults = searchResults
          .slice()
          .sort((a, b) => a.distanceMeters - b.distanceMeters)
        setResults(sortedResults)
      } catch (error) {
        console.log()
      }
    }
    getResults()
  }, [searchParams])

  if (!results) {
    return <Typography>Loading...</Typography>
  }
  return (
    <Box py={16} sx={{ px: { sm: 0, md: 8 } }}>
      <Typography variant='h4'>検索結果</Typography>
      <Box pt={4} display='flex' alignItems='center'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>保育園</TableCell>
                <TableCell align='center'>所要時間</TableCell>
                <TableCell align='center'>距離</TableCell>
                <TableCell align='center'> 住所</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='center'>{formatDuration(row.duration)}</TableCell>
                  <TableCell align='center'>{formatDistance(row.distanceMeters)}</TableCell>
                  <TableCell>{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default ResultsView

const testResults = [
  {
    name: 'あーす保育園戸塚',
    address: '神奈川県横浜市戸塚区矢部町３００７－４',
    latitude: 35.4048,
    longitude: 139.536375,
    distanceMeters: 398,
    duration: '309s',
  },
  {
    name: 'ベイキッズひまわり保育園',
    address: '神奈川県横浜市戸塚区矢部町３２１',
    latitude: 35.40671,
    longitude: 139.535756,
    distanceMeters: 573,
    duration: '415s',
  },
  {
    name: 'あーす保育園戸塚Ａｎｎｅｘ',
    address: '神奈川県横浜市戸塚区矢部町１４－２',
    latitude: 35.402738,
    longitude: 139.536949,
    distanceMeters: 640,
    duration: '490s',
  },
  {
    name: '戸塚せせらぎ保育園',
    address: '神奈川県横浜市戸塚区矢部町３００１－２',
    latitude: 35.402699,
    longitude: 139.535599,
    distanceMeters: 701,
    duration: '531s',
  },
  {
    name: 'ちゃいれっく戸塚保育園',
    address: '神奈川県横浜市戸塚区矢部町３００２－１',
    latitude: 35.402981,
    longitude: 139.535384,
    distanceMeters: 733,
    duration: '555s',
  },
  {
    name: '明日葉保育園第二戸塚園',
    address: '神奈川県横浜市戸塚区吉田町３０００－５',
    latitude: 35.402519,
    longitude: 139.534801,
    distanceMeters: 781,
    duration: '590s',
  },
  {
    name: '明日葉保育園第三戸塚園',
    address: '神奈川県横浜市戸塚区吉田町３００３－２',
    latitude: 35.402389,
    longitude: 139.534268,
    distanceMeters: 806,
    duration: '608s',
  },
  {
    name: '銀杏保育園　胡桃館',
    address: '神奈川県横浜市戸塚区吉田町３００１－１－１０１',
    latitude: 35.402056,
    longitude: 139.534522,
    distanceMeters: 818,
    duration: '619s',
  },
  {
    name: '幼保連携型認定こども園　ひまわり幼稚園',
    address: '神奈川県横浜市戸塚区戸塚町５１１８',
    latitude: 35.405102,
    longitude: 139.532324,
    distanceMeters: 901,
    duration: '707s',
  },
  {
    name: 'スターチャイルド≪戸塚ナーサリー≫',
    address: '神奈川県横浜市戸塚区矢部町６４１番地３４',
    latitude: 35.4055859,
    longitude: 139.5319852,
    distanceMeters: 1026,
    duration: '819s',
  },
]
