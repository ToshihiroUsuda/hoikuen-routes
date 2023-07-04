import React, { useEffect } from 'react'
import { Box } from '@mui/material'

// const hostname = "hoikuen-routes.ver?"  //本番サイトのホスト名

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: any
  }
}

const GoogleAdsense: React.FC = () => {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
      const adsbygoogle = window.adsbygoogle || []
      adsbygoogle.push({})
    }
  }, [])

  return (
    <Box py={4}>
      {process.env.NODE_ENV === 'production' ? (
        <ins
          className='adsbygoogle'
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout='in-article'
          // data-ad-format='fluid'
          data-ad-format='auto'
          data-full-width-responsive='true'
          data-ad-client={process.env.NEXT_ADSENSE_KEY || ''}
          data-ad-slot='XXXXXXXXX'
        ></ins>
      ) : (
        <Box p={10} textAlign={'center'} bgcolor='rgb(200, 200, 200)'>
          広告
        </Box>
      )}
    </Box>
  )
}

export default GoogleAdsense
