import React, { useState } from 'react'
import { Typography } from '@mui/material'

import { GoogleMap as GoogleMapComponent, MarkerF, PolylineF } from '@react-google-maps/api'

/*hooks*/
import { useMap } from '../../hooks/useMap'

/*libs*/
import { decodePath } from '../../utils'

/* types */
import { HoikuenRoute, LatLng } from '../../types/location'

type Props = {
  origin: LatLng
  searchResults: HoikuenRoute[]
}

const ResultsMap: React.FC<Props> = ({ origin, searchResults }) => {
  const { isLoaded, onLoad } = useMap({
    origin,
    destinations: searchResults.map((r) => {
      return { latitude: r.latitude, longitude: r.longitude }
    }),
  })
  const defaultPath = decodePath(searchResults[0].polyline.encodedPolyline)
  const [path, setPath] = useState<{ lat: number; lng: number }[]>(defaultPath)
  const originLatLng = { lat: origin.latitude, lng: origin.longitude }
  const containerStyle = {
    width: '100%',
    height: 400,
  }
  if (!isLoaded) {
    return <>Loading...</>
  }

  const polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#4285f4',
    strokeOpacity: 1.0,
    strokeWeight: 8,
  }

  return (
    <>
      <GoogleMapComponent mapContainerStyle={containerStyle} onLoad={onLoad}>
        <PolylineF path={path} options={polylineOptions} />
        <MarkerF position={originLatLng} />
        {searchResults.map((result, index) => {
          const destination = { lat: result.latitude, lng: result.longitude }
          const markerLabel: google.maps.MarkerLabel = {
            text: (index + 1).toString(),
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: 'bold',
            color: 'white',
          }
          return (
            <MarkerF
              key={index}
              position={destination}
              label={markerLabel}
              clickable
              onClick={() => setPath(decodePath(searchResults[index].polyline.encodedPolyline))}
            />
          )
        })}
      </GoogleMapComponent>
      <Typography>ピンをクリックするとルートを表示できます</Typography>
    </>
  )
}

export default ResultsMap
