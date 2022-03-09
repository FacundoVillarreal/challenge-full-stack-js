import { Grid } from '@chakra-ui/react'
import React from 'react'
import { FormOperations } from '../FormOperations/FormOperations'
import { TableOperations } from '../TableOperations/TableOperations'

export const Home = () => {
  return (
    // <FormOperations />
    <Grid
      templateColumns='repeat(2, 1fr)'
      gap={6}
      padding={6}
    >
      <TableOperations />
    </Grid>

  )
}
