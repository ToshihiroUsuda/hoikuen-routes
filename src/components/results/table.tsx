import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

/* types */
import { HoikuenRoute } from '../../types/location'

/* libs */
import { formatDistance, formatDuration } from '../../utils'

type Props = {
  searchResults: HoikuenRoute[]
  age: number
}

const getCapacity = (hoikuen: HoikuenRoute, age: number): string => {
  return [
    hoikuen.capacityAge0,
    hoikuen.capacityAge1,
    hoikuen.capacityAge2,
    hoikuen.capacityAge3,
    hoikuen.capacityAge4,
    hoikuen.capacityAge5,
  ][age].toFixed()
}

const ResultsTable: React.FC<Props> = ({ searchResults, age }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>No.</TableCell>
            <TableCell align='center'>施設名</TableCell>
            <TableCell align='center'>所要時間</TableCell>
            <TableCell align='center'>距離</TableCell>
            <TableCell align='center'>施設の種類</TableCell>
            <TableCell align='center'>{`${age.toFixed()}歳児の定員`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align='center'>{formatDuration(row.duration)}</TableCell>
              <TableCell align='center'>{formatDistance(row.distanceMeters)}</TableCell>
              <TableCell align='center'>{row.type}</TableCell>
              <TableCell align='center'>{getCapacity(row, age)}人</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ResultsTable
