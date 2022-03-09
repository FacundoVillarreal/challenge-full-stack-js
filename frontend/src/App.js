import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { ListOfOperations } from './Components/ListOfOperations/ListOfOperations'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Home } from './Components/Home/Home';
import { Users } from './Components/Users/Users';
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box textAlign="start" fontSize="xl">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/operations' element={<ListOfOperations />} />
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
