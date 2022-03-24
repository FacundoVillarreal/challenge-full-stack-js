import React from 'react'
import { Graphic } from '../../Components/Graphic/Graphic'
import { Header } from '../../Components/Header/Header'
import { TableOperations } from '../../Components/TableOperations/TableOperations'
import { Box, Stack } from '@chakra-ui/react'

export const Home = () => {

  return (
    <Box>
      <Header />
      <Stack
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        justifyContent="center"
        alignItems={{ base: "center", md: "self-start" }}
      >
        <Graphic />
        <TableOperations requestType={'home'} requestForm={false} />
      </Stack>
    </Box>
  )
}
