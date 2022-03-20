import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Graphic } from '../../Components/Graphic/Graphic'
import { Header } from '../../Components/Header/Header'
import { TableOperations } from '../../Components/TableOperations/TableOperations'

export const Home = () => {
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

        <Graphic />
        <TableOperations requestType={'home'} requestForm={false} />
      </Flex>
    </>
  )
}
