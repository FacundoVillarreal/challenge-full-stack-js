import { Grid } from '@chakra-ui/react'
import React from 'react'
import { Graphic } from '../../Components/Graphic/Graphic'
import { TableOperations } from '../../Components/TableOperations/TableOperations'

export const Home = () => {
  return (
    // <FormOperations />
    <Grid
      templateColumns='repeat(2, 1fr)'
      gap={6}
      padding={6}
    >
      <Graphic />
      <TableOperations requestType={'home'} requestForm={false}/>
    </Grid>

  )
}
