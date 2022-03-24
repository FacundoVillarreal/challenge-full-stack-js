import React, { useContext, useEffect, useState } from 'react'
import { LoadingContext, UserContext } from '../../App';
import { Box, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import Chart from 'react-apexcharts'

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
          <Stack width={"auto"} mr={{md: "600px"}}>
            <SkeletonCircle size='200' />
            <Skeleton height='10px' width='200px' m={'20px 40px'} />
          </Stack>
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
