import React, { useContext, useState } from 'react'
import { LoadingContext, UserContext } from '../../App';
import { CalendarIcon, QuestionIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useToast
} from '@chakra-ui/react'
import { useForm } from '../../hooks/useForm';

export const FormOperations = () => {
    //context 
    const [userId] = useContext(UserContext);
    const [_, setIsLoading] = useContext(LoadingContext);

    //alerts
    const toast = useToast();

    const [formValues, handleFormChange] = useForm({
        concepto: "",
        monto: "",
        fecha: "",
        tipo: ""
    });

    const { concepto, monto, fecha, tipo } = formValues;
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({concepto, monto, fecha, tipo})
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
    }


    return (
        <Box bg='twitter.900' height='auto' width={[300, 400, 550, 500]} style={{ borderRadius: '10px' }}>
            <Text
                fontSize={{ base: '20px', md: '30px' }}
                textAlign={'center'}
                color='white' pt={2}
            >
                Formulario de registro de operación
            </Text>
            <Box color='white'>

                <Stack as={"form"} spacing={3} padding={5} onSubmit={handleSubmit}>

                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<QuestionIcon color='white' />}
                        />
                        <Input
                            placeholder='Ingrese un concepto'
                            color='white'
                            autoComplete='off'
                            onChange={handleFormChange}
                            name= 'concepto'
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
                            autoComplete='off'
                            onChange={handleFormChange}
                            name = 'monto'
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
                            autoComplete='off'
                            onChange={handleFormChange}
                            name = 'fecha'
                            value={fecha}
                        />
                    </InputGroup>

                    <InputGroup>
                        <RadioGroup>
                            <Stack direction='row' onChange={handleFormChange}>
                                <Radio name='tipo' value='Ingreso' colorScheme='green' >Ingreso</Radio>
                                <Radio name='tipo' value='Egreso' colorScheme='red' >Egreso</Radio>
                            </Stack>
                        </RadioGroup>
                    </InputGroup>

                    <InputGroup justifyContent={'end'}>
                        <Button colorScheme='green' size='md' type='submit'>
                            Guardar
                        </Button>
                    </InputGroup>

                </Stack>
            </Box>
        </Box>

    )
}
