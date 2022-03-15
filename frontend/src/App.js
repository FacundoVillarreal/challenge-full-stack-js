import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Users } from './Components/Users/Users';
import { Home } from './Pages/Home/Home';
import { Operations } from './Pages/Operations/Operations';
import { Header } from './Components/Header/Header';
import Login from './Pages/Login/Login';

// Create a Context
export const LoadingContext = React.createContext();

function App() {

  const [isLoading, setIsLoading] = useState(false)


  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box textAlign="start" fontSize="xl">
          <LoadingContext.Provider value={[isLoading, setIsLoading]}>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/users' element={<Users />} />
              <Route path='/operations' element={<Operations />} />
            </Routes>
          </LoadingContext.Provider>
        </Box>
      </ChakraProvider>
    </BrowserRouter >
  );
}

export default App;
