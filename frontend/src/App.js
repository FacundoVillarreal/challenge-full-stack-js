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
import CreateAcount from './Pages/Login/CreateAcount';

// Create a Context
export const LoadingContext = React.createContext();
export const UserContext = React.createContext();


function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState("")



  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box textAlign="start" fontSize="xl">
          <UserContext.Provider value={[userId, setUserId]}>
            <LoadingContext.Provider value={[isLoading, setIsLoading]}>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth/newUser' element={<CreateAcount />} />
                <Route path='/auth/login' element={<Login />} />
                <Route path='/users' element={<Users />} />
                <Route path='/operations' element={<Operations />} />
              </Routes>
            </LoadingContext.Provider>
          </UserContext.Provider>
        </Box>
      </ChakraProvider>
    </BrowserRouter >
  );
}

export default App;
