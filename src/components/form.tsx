import { yupResolver } from '@hookform/resolvers/yup'
import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

/* lib */

/* component */
import ZipcodeForm from './zipcodeForm'

/* type */
import { Address } from '../libs/zipcodeApi'

const schema = yup.object().shape({
  origin: yup.string().required('必須項目です'),
  travelMode: yup.string().oneOf(['DRIVE', 'BICYCLE', 'WALK']).required(),
})

export type FormValues = yup.InferType<typeof schema>

export const defaultValues: FormValues = {
  origin: '',
  travelMode: 'WALK',
}

type Props = {
  onSubmit: ((res: FormValues) => void) | ((res: FormValues) => Promise<void>)
}

const InputForm: React.FC<Props> = (props) => {
  const {
    control,
    formState: { errors },
    setValue,
    setFocus,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onValid: SubmitHandler<FormValues> = (data: FormValues) => {
    props.onSubmit(data)
  }

  const onAddressObtained = (address: Address) => {
    setFocus('origin')
    setValue('origin', address.address1 + address.address2 + address.address3)
  }

  return (
    <Stack component='form' noValidate onSubmit={handleSubmit(onValid)} spacing={2} sx={{ m: 2 }}>
      <Typography>出発地</Typography>
      <ZipcodeForm onAddressObtained={onAddressObtained} />
      <Controller
        name='origin'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type='text'
            label='住所'
            fullWidth
            required
            error={'origin' in errors}
            helperText={errors.origin?.message}
          />
        )}
      />
      {/* <Typography>保育園</Typography>
      <Controller
        name='destination'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type='text'
            label='目的地'
            fullWidth
            required
            error={'destination' in errors}
            helperText={errors.destination?.message}
          />
        )}
      /> */}

      <Typography>その他</Typography>
      <Controller
        name='travelMode'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label='移動手段'
            fullWidth
            error={'travelMode' in errors}
            helperText={errors.travelMode?.message}
          >
            <MenuItem value='DRIVE'>車</MenuItem>
            <MenuItem value='BICYCLE'>自転車</MenuItem>
            <MenuItem value='WALK'>徒歩</MenuItem>
          </TextField>
        )}
      />
      <Button variant='contained' type='submit' size='large'>
        送信する
      </Button>
    </Stack>
  )
}

export default InputForm
