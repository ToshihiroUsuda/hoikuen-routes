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
        // console.log(JSON.stringify(searchResults, null, 4))
        setResults(searchResults)
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
    <Box pt={4} display={'flex'} alignItems={'center'}>
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
                <TableCell>{formatDuration(row.duration)}</TableCell>
                <TableCell>{formatDistance(row.distanceMeters)}</TableCell>
                <TableCell>{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ResultsView
