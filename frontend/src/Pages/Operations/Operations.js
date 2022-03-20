import React from 'react'
import { Box, Flex, Grid, Skeleton, Stack } from '@chakra-ui/react'
import { TableOperations } from "../../Components/TableOperations/TableOperations"
import { Header } from '../../Components/Header/Header'

export const Operations = () => {
  return (
    <>
      <Header />
      <Flex
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        width="100wh"
        height={{ base: "100vh" }}
        justifyContent="center"
        alignItems={{ base: "center", md: "self-start" }}
      >
        <TableOperations requestType={'operations'} requestForm={true} />
      </Flex>
    </>
  )
}
