import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home/Home';
import { Operations } from './Pages/Operations/Operations';
import Login from './Pages/Login/Login';
import CreateAcount from './Pages/Login/CreateAcount';
import {
  ChakraProvider,
  Box,
  theme
} from '@chakra-ui/react';

// Create a Context
export const LoadingContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState("")
  const userIsTrue = userId === false

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Box textAlign="start" fontSize="xl">
          <UserContext.Provider value={[userId, setUserId]}>
            <LoadingContext.Provider value={[isLoading, setIsLoading]}>
              <Routes>
                <Route path='/' element={ !userIsTrue ? <Home /> : <Login/>} />
                <Route path='/auth/newUser' element={<CreateAcount />} />
                <Route path='/auth/login' element={<Login />} />
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
