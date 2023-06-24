import React, { useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField, InputAdornment } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

/*lib*/
import { getZipcodeApiResponse, Address } from '../libs/zipcodeApi'

const schema = yup.object().shape({
  zipcode: yup
    .string()
    .min(1, '郵便番号を入力してください')
    .matches(/^[^-]+$/, 'ハイフンなしで入力してください')
    .matches(/^[0-9]+$/, '半角数字で入力してください')
    .length(7, '7桁で入力してください')
    .required(),
})

export type FormValues = yup.InferType<typeof schema>

export const defaultValues: FormValues = {
  zipcode: '',
}

type Props = {
  onAddressObtained: (address: Address) => void
}

const ZipcodeForm: React.FC<Props> = (props) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const [invalidError, setInvalidError] = useState('')
  const onValid = () => {
    const zipcode = getValues('zipcode')
    getZipcodeApiResponse(zipcode)
      .then((address) => {
        props.onAddressObtained(address)
        setInvalidError('')
      })
      .catch(() => setInvalidError('不正な郵便番号です'))
  }

  useEffect(() => {
    if (isValid) {
      setInvalidError('')
    }
  }, [setInvalidError, isValid])

  return (
    <Controller
      name='zipcode'
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type='text'
          label='郵便番号'
          error={'zipcode' in errors || !!invalidError}
          helperText={errors.zipcode?.message || invalidError}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button variant='contained' onClick={handleSubmit(onValid)} disabled={!isValid}>
                  住所入力
                </Button>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

export default ZipcodeForm
