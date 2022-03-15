import React from 'react'
import { Grid } from '@chakra-ui/react'
import { TableOperations } from "../../Components/TableOperations/TableOperations"

// ACA DEBE ESTAR LA TABLA DE OPERACIONES Y EL FORMULARIO
export const Operations = () => {


  return (
    <Grid
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={6}
      padding={6}>
      <TableOperations requestType={'operations'} requestForm={true}/>
    </Grid>
  )
}
