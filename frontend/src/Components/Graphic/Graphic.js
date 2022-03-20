import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { LoadingContext, UserContext } from '../../App';

export const Graphic = () => {
  const [userId, setUserId] = useContext(UserContext);

  const [data, setDate] = useState([]);
  const [ingresoTotal, setIngresoTotal] = useState(0)
  const [egresoTotal, setEgresoTotal] = useState(0)
  const [isLoading, set] = useContext(LoadingContext);

  const [loading, setLoading] = useState(false);


  const options = {
    chart: {
      type: 'pie',
    },
    labels: [`Ingreso`, `Egreso`],

  }
  const series = [ingresoTotal, egresoTotal];


  // useEffect(() => {
  //   setUserId(parseInt(localStorage.getItem("userId")))
  // }, [])


  useEffect(() => {
    setLoading(true);
    setUserId(parseInt(localStorage.getItem("userId")))
    userId && fetch(`http://localhost:3001/api/graphic/${userId}`)
      .then(response => response.json())
      .then(res => {
        setDate(res)
        setLoading(false)
      })
      .catch(err => setLoading(false))
  }, [isLoading, userId])

  useEffect(() => {
    // console.log("se cargo grapichs desde data")
    const i = data.filter(op => op.tipo === "Ingreso").reduce((acc, actual) => acc + actual.monto, 0);
    const e = data.filter(op => op.tipo === "Egreso").reduce((acc, actual) => acc + actual.monto, 0);
    setIngresoTotal(i);
    setEgresoTotal(e);
  }, [data, userId])

  return (
    <div>
      {
        loading
          ?
          <Box>
            <SkeletonCircle size='275' />
            <Skeleton height='20px' width='250px' m={'20px 40px'} />
          </Box>
          :
          <Box width={[300, 350, 550, 500]}>
            < Chart
              options={options}
              series={series}
              type={'pie'}
              width={350}
            />
            <Box>
              <Text pt={5} textAlign={'start'}>
                Saldo Total: ${ingresoTotal - egresoTotal}
              </Text>
            </Box>
          </Box>
      }

    </div >
  )
}
