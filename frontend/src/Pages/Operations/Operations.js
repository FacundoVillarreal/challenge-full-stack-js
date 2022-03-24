import React from 'react'
import { TableOperations } from "../../Components/TableOperations/TableOperations"
import { Header } from '../../Components/Header/Header'
import { Stack } from '@chakra-ui/react'

export const Operations = () => {
  return (
    <>
      <Header />
      <Stack
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        justifyContent="center"
        alignItems={{ base: "center", md: "self-start" }}
      >
        <TableOperations requestType={'operations'} requestForm={true} />
      </Stack>
    </>
  )
}
