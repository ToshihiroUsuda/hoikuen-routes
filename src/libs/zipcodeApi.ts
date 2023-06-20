import axios, { AxiosRequestConfig } from 'axios'

export type ZipcodeApiRequstParams = {
  zipcode: string
}

export type Address = {
  address1: string
  address2: string
  address3: string
}

export type ZipcodeApiResponse = {
  results: Address[]
}

const apiURL = 'https://zipcloud.ibsnet.co.jp/api/search'

export const getZipcodeApiResponse = async (zipcode: string): Promise<Address> => {
  const config: AxiosRequestConfig = {
    params: {
      zipcode: zipcode,
    },
  }
  const res = await axios.get<ZipcodeApiResponse>(apiURL, config)
  return res.data.results[0]
}
