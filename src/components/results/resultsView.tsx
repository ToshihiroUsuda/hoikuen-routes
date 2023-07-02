import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/* types */
import { HoikuenRoute, LatLng } from '../../types/location'
import { FormValues } from '../form/form'

/* components */
import ResultsTable from './table'
import ResultsMap from './map'

/* libs */
import { getGeocodeApiResponse } from '../../libs/geocodingApi'
import { getTopKNearestHoikuen } from '../../libs/hoikuen'
import { getRoutesApiResponse } from '../../libs/routesApi'

type Props = {
  searchParams: FormValues
}

const calcRoutes = async (
  params: FormValues,
): Promise<{ originLatLng: LatLng; searchResults: HoikuenRoute[] }> => {
  if (process.env.NODE_ENV === 'development') {
    return { originLatLng: testOrigin, searchResults: testResults }
  }
  // geocodingの取得
  const originLatLng = await getGeocodeApiResponse(params.origin)
  // 近くの保育園の取得
  const top10Hoikuen = getTopKNearestHoikuen(
    originLatLng,
    'Kanagawa',
    10,
    params.type,
    params.age,
    params.capacity,
  )
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
  return { originLatLng, searchResults }
}

const ResultsView: React.FC<Props> = ({ searchParams }) => {
  const [results, setResults] = useState<HoikuenRoute[]>([])
  const [origin, setOrigin] = useState<LatLng | null>(null)

  useEffect(() => {
    const getResults = async () => {
      try {
        const { originLatLng, searchResults } = await calcRoutes(searchParams)
        console.log(originLatLng, searchResults)

        const sortedResults = searchResults
          .slice()
          .sort((a, b) => a.distanceMeters - b.distanceMeters)
        setResults(sortedResults)
        setOrigin(originLatLng)
      } catch (error) {
        console.log(error)
      }
    }
    getResults()
  }, [searchParams])

  if (!origin || !results) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box py={8} sx={{ mx: { sm: 0, md: 8 } }}>
      <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
        検索結果
      </Typography>
      {results.length == 0 ? (
        <Typography>条件に合う保育園・幼稚園が見つかりませんでした。</Typography>
      ) : (
        <Box>
          <Box pt={4}>
            <ResultsMap origin={origin} searchResults={results} />
          </Box>
          <Box pt={4} display={'block'}>
            <ResultsTable searchResults={results} age={searchParams.age} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ResultsView

const testOrigin: LatLng = { latitude: 35.407864, longitude: 139.5373787 }

const testResults = [
  {
    name: 'ベイキッズひまわり保育園',
    address: '神奈川県横浜市戸塚区矢部町３２１',
    latitude: 35.40671,
    longitude: 139.535756,
    type: '小規模保育事業者－A型',
    capacityAge0: 2,
    capacityAge1: 4,
    capacityAge2: 4,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 573,
    duration: '415s',
    polyline: {
      encodedPolyline: '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMhApADHj@d@RL[zAsBSkAZCJBZaAV',
    },
  },
  {
    name: 'あーす保育園戸塚',
    address: '神奈川県横浜市戸塚区矢部町３００７－４',
    latitude: 35.4048,
    longitude: 139.536375,
    type: '小規模保育事業者－A型',
    capacityAge0: 5,
    capacityAge1: 6,
    capacityAge2: 8,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 398,
    duration: '309s',
    polyline: {
      encodedPolyline: '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMhApADHj@d@\\Tf@Qh@C',
    },
  },
  {
    name: 'あーす保育園戸塚Ａｎｎｅｘ',
    address: '神奈川県横浜市戸塚区矢部町１４－２',
    latitude: 35.402738,
    longitude: 139.536949,
    type: '小規模保育事業者－A型',
    capacityAge0: 3,
    capacityAge1: 8,
    capacityAge2: 8,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 640,
    duration: '490s',
    polyline: {
      encodedPolyline: '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMFFFIjApAbBo@pBq@bAO|@Av@JJBz@Dr@Jd@TFD',
    },
  },
  {
    name: '正光寺保育園吉田町園',
    address: '神奈川県横浜市戸塚区吉田町１３８－６',
    latitude: 35.399868,
    longitude: 139.539545,
    type: '小規模保育事業者－A型',
    capacityAge0: 6,
    capacityAge1: 6,
    capacityAge2: 7,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 1185,
    duration: '878s',
    polyline: {
      encodedPolyline:
        '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMFKtGwBv@MbAElADpC\\VFj@ZhHbGRiAlBwMf@oABBZe@@C',
    },
  },
  {
    name: 'ぱぷりか保育園　戸塚',
    address: '神奈川県横浜市戸塚区上倉田町493-１',
    latitude: 35.3997302,
    longitude: 139.5360784,
    type: '小規模保育事業者－A型',
    capacityAge0: 3,
    capacityAge1: 8,
    capacityAge2: 8,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 1054,
    duration: '800s',
    polyline: {
      encodedPolyline:
        '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMFKtGwBv@MbAElADpC\\VFj@ZhHbGCLRBvAa@x@Ix@ENBp@?EhA',
    },
  },
  {
    name: '戸塚チューリップ保育園',
    address: '神奈川県横浜市戸塚区上倉田町３９４－１',
    latitude: 35.396124,
    longitude: 139.535284,
    type: '小規模保育事業者－A型',
    capacityAge0: 6,
    capacityAge1: 6,
    capacityAge2: 7,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 1473,
    duration: '1131s',
    polyline: {
      encodedPolyline:
        '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMFKtGwBv@MbAElADpC\\VFj@ZhHbGCLJBjB`BHJhCtBx@VH?RJ|@lANL?EOQxDaAjFkAZD|AF',
    },
  },
  {
    name: 'アネラ保育室',
    address: '神奈川県横浜市戸塚区上矢部町２８１－８',
    latitude: 35.4207922,
    longitude: 139.535378,
    type: '小規模保育事業者－C型',
    capacityAge0: 2,
    capacityAge1: 4,
    capacityAge2: 4,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 1897,
    duration: '1433s',
    polyline: {
      encodedPolyline:
        '{qbwEmltrYw@[]_@Oq@a@_ABO`@_@u@kA[[cA_@WG[EMIkH{AuA]g@WSQ_J}EgBsAaBeBu@EiFzFk@|@_DtG{ArCGGS\\aAlAo@n@WHeA`AMNQLE@UXo@f@i@f@eEpD{AvBOS',
    },
  },
  {
    name: 'あおぞらみらい保育園',
    address: '神奈川県横浜市戸塚区上倉田町５４５－９',
    latitude: 35.39434,
    longitude: 139.536018,
    type: '小規模保育事業者－A型',
    capacityAge0: 6,
    capacityAge1: 6,
    capacityAge2: 7,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 1599,
    duration: '1208s',
    polyline: {
      encodedPolyline:
        '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMFKtGwBv@MbAElADpC\\VFj@ZhHbGCLRBvAa@x@Ix@ENBhE@r@Dn@NzHz@|AAxGYrAFNB',
    },
  },
  {
    name: '小規模保育施設はまっこ',
    address: '神奈川県横浜市戸塚区矢部町２０６１',
    latitude: 35.40761,
    longitude: 139.520207,
    type: '小規模保育事業者－A型',
    capacityAge0: 2,
    capacityAge1: 8,
    capacityAge2: 8,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 2487,
    duration: '1991s',
    polyline: {
      encodedPolyline:
        '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMhApADHj@d@\\Tc@zBICMz@EHw@`FA^FJ~@BLCbAFA\\ZDCz@TP?BGHw@YkC[ABqBHGBU@_A\\wBfAe@hAENQVSVI\\_@t@OL_ATs@^a@\\GJ[Xk@\\G@w@lCKJo@`@CBNLxAbBVv@r@nCb@xAIDJ^Fl@FhDC\\W`BH~AJB|@nBb@zANn@NbATdALZCL`@p@EDDDIPoAtFGPBPRXb@JRNJNBRPRH^Xp@F^@^Hh@?R',
    },
  },
  {
    name: 'はまっこ乳児ルーム',
    address: '神奈川県横浜市戸塚区矢部町２０７１',
    latitude: 35.409495,
    longitude: 139.520286,
    type: '小規模保育事業者－A型',
    capacityAge0: 2,
    capacityAge1: 4,
    capacityAge2: 4,
    capacityAge3: 0,
    capacityAge4: 0,
    capacityAge5: 0,
    distanceMeters: 2570,
    duration: '2097s',
    polyline: {
      encodedPolyline:
        '{qbwEmltrY`@H\\En@RC~@pAXj@DtBi@NMhApADHj@d@\\Tc@zBICMz@EHw@`FA^FJ~@BLCbAFA\\ZDCz@TP?BGHw@YkC[ABqBHGBU@_A\\wBfAe@hAENQVSVI\\_@t@OL_ATs@^a@\\GJ[Xk@\\G@w@lCKJo@`@CBRPCFSt@o@p@GR@LIJw@Du@x@_@ZU\\Bh@GTi@rEnAXQzAfDjUFhA?t@~@BIdFCt@H@AlAjAVRODr@AN',
    },
  },
]
