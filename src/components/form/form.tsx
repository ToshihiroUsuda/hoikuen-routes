import React, { useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Checkbox,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

/* component */
import ZipcodeForm from './zipcodeForm'

/* type */
import { Address } from '../..//libs/zipcodeApi'
import { Prefecture, prefectureMap } from '../../libs/hoikuen'

const hoikuenTypes = [
  '保育所',
  '幼稚園',
  '認定こども園',
  '小規模保育事業者',
  '家庭的保育事業者',
  '居宅訪問型保育事業者',
  '事業所内保育事業者',
]

// export type SearchParams = yup.InferType<typeof schema>
export type SearchParams = {
  origin: string
  type: string[]
  age: number
  capacity: number
  travelMode: NonNullable<'WALK' | 'DRIVE' | 'BICYCLE'>
}

export const defaultValues: SearchParams = {
  origin: '',
  type: hoikuenTypes,
  age: 0,
  capacity: 1,
  travelMode: 'WALK',
}

type Props = {
  onSubmit: ((res: SearchParams) => void) | ((res: SearchParams) => Promise<void>)
  prefecture: Prefecture
}

const InputForm: React.FC<Props> = (props) => {
  const schema = useMemo(() => {
    const reObj = new RegExp('^' + prefectureMap[props.prefecture])
    return yup.object<SearchParams>().shape({
      origin: yup
        .string()
        .required('必須項目です')
        .matches(reObj, { message: `${prefectureMap[props.prefecture]}の住所を入力してください` }),
      type: yup.array().required('最低ひとつ選択してください').of(yup.string().required()),
      age: yup.number().required('必須項目です').oneOf([0, 1, 2, 3, 4, 5]),
      capacity: yup.number().required('必須項目です'),
      travelMode: yup.string().oneOf(['WALK', 'DRIVE', 'BICYCLE']).required('必須項目です'),
    })
  }, [props.prefecture])

  const {
    control,
    formState: { errors },
    setValue,
    setFocus,
    handleSubmit,
  } = useForm<SearchParams>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onValid: SubmitHandler<SearchParams> = (data: SearchParams) => {
    props.onSubmit(data)
  }

  const onAddressObtained = (address: Address) => {
    setFocus('origin')
    setValue('origin', address.address1 + address.address2 + address.address3)
  }

  return (
    <Stack component='form' noValidate onSubmit={handleSubmit(onValid)} spacing={2} sx={{ pt: 4 }}>
      <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
        検索条件
      </Typography>
      <Typography sx={{ fontWeight: 'bold' }}>出発地</Typography>
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
      <Typography sx={{ fontWeight: 'bold' }}>施設の条件</Typography>
      <Controller
        name='type'
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>施設の種類</InputLabel>
            <Select<string[]>
              {...field}
              onChange={(event: SelectChangeEvent<string[]>) => {
                const value = event.target.value
                const values = typeof value === 'string' ? [value] : value
                field.onChange(values)
              }}
              multiple
              renderValue={(selectedOptions: string[]) => {
                if (!selectedOptions || selectedOptions.length == 0) {
                  return '一つ以上選択してください'
                }
                const selectedTypes = hoikuenTypes.filter(
                  (type) => selectedOptions.indexOf(type) > -1,
                )
                if (JSON.stringify(selectedTypes) === JSON.stringify(hoikuenTypes)) {
                  return 'すべて'
                }
                return selectedTypes.join(', ')
              }}
              fullWidth
              label='施設の種類'
              error={'type' in errors}
            >
              {hoikuenTypes.map((type, index) => {
                // const checked = field.value !== undefined ? field.value!.indexOf(type) > -1 : false
                return (
                  <MenuItem key={index} value={type}>
                    <Checkbox checked={field.value!.indexOf(type) > -1} />
                    <ListItemText primary={type} />
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText>{errors.type?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <Box display='flex' alignItems='end'>
        <Controller
          name='age'
          control={control}
          render={({ field }) => (
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                {...field}
                select
                SelectProps={{ native: true }}
                label='年齢'
                error={'age' in errors}
                helperText={errors.age?.message}
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </TextField>
              <TextField
                {...field}
                select
                label='年齢'
                error={'age' in errors}
                helperText={errors.age?.message}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </TextField>
            </Box>
          )}
        />
        <Box px={2}>
          <Typography>歳児の定員が</Typography>
        </Box>
        <Controller
          name='capacity'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='定員数'
              type='number'
              inputProps={{ max: 30, min: 1 }}
              error={'capacity' in errors}
              helperText={errors.capacity?.message}
              sx={{ flexGrow: 1 }}
            />
          )}
        />
        <Box pl={2}>
          <Typography>人以上</Typography>
        </Box>
      </Box>
      <Typography sx={{ fontWeight: 'bold' }}>ルート検索の条件</Typography>
      <Controller
        name='travelMode'
        control={control}
        render={({ field }) => (
          <>
            <TextField
              {...field}
              select
              SelectProps={{ native: true }}
              label='移動手段'
              fullWidth
              error={'travelMode' in errors}
              helperText={errors.travelMode?.message}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <option value='DRIVE'>車</option>
              <option value='BICYCLE'>自転車</option>
              <option value='WALK'>徒歩</option>
            </TextField>
            <TextField
              {...field}
              select
              label='移動手段'
              fullWidth
              error={'travelMode' in errors}
              helperText={errors.travelMode?.message}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <MenuItem value='DRIVE'>車</MenuItem>
              <MenuItem value='BICYCLE'>自転車</MenuItem>
              <MenuItem value='WALK'>徒歩</MenuItem>
            </TextField>
          </>
        )}
      />
      <Button variant='contained' type='submit' size='large' sx={{ fontSize: 20 }}>
        検索する
      </Button>
    </Stack>
  )
}

export default InputForm
