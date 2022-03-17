import { Box, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { LoadingContext, UserContext } from '../../App';

export const Graphic = () => {
  const [userId] = useContext(UserContext);

  const [data, setDate] = useState([]);
  const [ingresoTotal, setIngresoTotal] = useState(0)
  const [egresoTotal, setEgresoTotal] = useState(0)

  const [loading] = useContext(LoadingContext);

  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: [`Ingreso`, `Egreso`]
  }
  const series = [ingresoTotal, egresoTotal];

  useEffect(() => {
    fetch(`http://localhost:3001/api/graphic/${userId}`)
      .then(response => response.json())
      .then(setDate);
  }, [loading])

  useEffect(() => {
    const i = data.filter(op => op.tipo === "Ingreso").reduce((acc, actual) => acc + actual.monto, 0);
    const e = data.filter(op => op.tipo === "Egreso").reduce((acc, actual) => acc + actual.monto, 0);
    setIngresoTotal(i);
    setEgresoTotal(e);
  }, [data])

  return (
    <div>
      < Chart
        options={options}
        series={series}
        type={'pie'}
        width={380}
      />
      <Box>
        <Text pt={5}>
          Saldo Total: ${ingresoTotal - egresoTotal}
        </Text>
      </Box>
    </div >
  )
}
