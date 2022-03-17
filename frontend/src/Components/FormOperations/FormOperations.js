import { CalendarIcon, QuestionIcon } from '@chakra-ui/icons'
import { Box, Button, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { LoadingContext, UserContext } from '../../App';

export const FormOperations = () => {
    const toast = useToast();
    const [_, setIsLoading] = useContext(LoadingContext);

    const [userId] = useContext(UserContext);
    
 

    const [concepto, setConcepto] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [tipo, setTipo] = useState('');

    const onChangeConcepto = (e) => {
        setConcepto(e.target.value);
    }

    const onChangeMonto = (e) => {
        setMonto(e.target.value);
    }

    const onChangeFecha = (e) => {
        setFecha(e.target.value);
    }

    const onChangeTipo = (e) => {
        setTipo(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const values = { concepto, monto, fecha, tipo, user_id: userId };

        const response = fetch('http://localhost:3001/api/operations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        });

        response.then(resp => {

            if (resp.ok) {
                resp.json().then(resp => {

                    const { message } = resp;
                    toast({
                        title: `${message}`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })
                })
                setIsLoading(true);
                clearInputs();
            } else {
                resp.json().then(resp => {
                    const { message } = resp;
                    toast({
                        title: `${message}`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    })
                })
                setIsLoading(false);
            }
        })


        const clearInputs = () => {
            setConcepto('');
            setMonto('');
            setFecha('');
        }

    }


    return (
        <Box bg='twitter.900' height='330px' width='500px' style={{ borderRadius: '10px' }} >
            <Text
                fontSize='30px'
                textAlign={'center'}
                color='white' pt={2}
            >
                Formulario de registro de operación
            </Text>
            <Box color='white'>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3} padding={5}>

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<QuestionIcon color='white' />}
                            />
                            <Input
                                placeholder='Ingrese un concepto'
                                color='white'
                                autoComplete='of'
                                onChange={onChangeConcepto}
                                value={concepto}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                color='white'
                                fontSize='1.2em'
                                children='$'
                            />
                            <Input
                                placeholder='Ingrese un monto'
                                autoComplete='of'
                                onChange={onChangeMonto}
                                value={monto}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                color='white'
                                fontSize='1.2em'
                                children={<CalendarIcon color='white' />}
                            />
                            <Input
                                placeholder='Ingrese una fecha'
                                autoComplete='of'
                                onChange={onChangeFecha}
                                value={fecha}
                            />
                        </InputGroup>

                        <InputGroup>
                            <RadioGroup>
                                <Stack direction='row' onChange={onChangeTipo}>
                                    <Radio value='Ingreso' colorScheme='green' >Ingreso</Radio>
                                    <Radio value='Egreso' colorScheme='red' >Egreso</Radio>
                                </Stack>
                            </RadioGroup>
                        </InputGroup>

                        <InputGroup justifyContent={'end'}>
                            <Button colorScheme='green' size='md' type='submit'>
                                Guardar
                            </Button>
                        </InputGroup>

                    </Stack>
                </form>
            </Box>
        </Box>

    )
}
