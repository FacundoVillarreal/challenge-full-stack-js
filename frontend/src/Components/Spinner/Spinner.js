import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export const Spiner = () => {
    return (
        <Box display={'flex'}
            justifyContent={{ base: "flex-start", md: "center" }}
            alignContent={"flex-start"}
            marginTop={{ base: "3", md: "10" }}
            pt={{ base: "3", md: "10" }}
        >
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Box>
    )
}
