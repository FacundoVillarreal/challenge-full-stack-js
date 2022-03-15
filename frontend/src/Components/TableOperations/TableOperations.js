import React, { useContext, useEffect, useState } from 'react'
import { CalendarIcon, DeleteIcon, EditIcon, QuestionIcon } from '@chakra-ui/icons'
import { Box, Button, Input, InputGroup, InputLeftElement, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast, Modal } from '@chakra-ui/react'
import moment from 'moment'
import { FormOperations } from '../FormOperations/FormOperations'
import { LoadingContext } from '../../App'
export const TableOperations = ({ requestType, requestForm }) => {
    //alertas
    const toast = useToast();

    //modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const finalRef = React.useRef();

    //state para el modal de edit; carga los inputs
    const [conceptoEdit, setConceptoEdit] = useState('');
    const [montoEdit, setMontoEdit] = useState('');
    const [fechaEdit, setFechaEdit] = useState('');
    const [tipoEdit, setTipoEdit] = useState('');
    const [idEdit, setIdEdit] = useState('');

    //estado global; se utiliza para detectar cuando volver a realizar una peticion a la lista de operaciones
    const [isLoading, setIsLoading] = useContext(LoadingContext);

    //lista de operaciones
    const [listOperation, setListOperation] = useState([]);

    const handleClickEdit = ({ concepto, monto, fecha, tipo, id }) => {
        setConceptoEdit(concepto);
        setMontoEdit(monto);
        setFechaEdit(moment(fecha).format('DD/MM/YYYY'));
        setTipoEdit(tipo);
        setIdEdit(id);
        onOpen();
    }

    const handleChangeEdit = (e) => {
        switch (e.target.name) {
            case 'concepto':
                setConceptoEdit(e.target.value);
                break;
            case 'monto':
                setMontoEdit(e.target.value);
                break;
            case 'fecha':
                setFechaEdit(e.target.value);
                break;
            case 'tipo':
                setTipoEdit(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleClickDeleted = (id) => {
        setIsLoading(true);
        fetch(`http://localhost:3001/api/operation/${id}`, {
            method: 'DELETE'
        })
            .then(resp => resp.json())
            .then(res => {
                toast({
                    title: `${res}`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                setIsLoading(false);
            })
    }

    const handleSubmitEdit = (e) => {
        console.log("edit")
        e.preventDefault();
        setIsLoading(true);
        fetch(`http://localhost:3001/api/operation/${idEdit}`, {
            method: 'PUT',
            body: JSON.stringify({ concepto: conceptoEdit, monto: montoEdit, fecha: fechaEdit, tipo: tipoEdit, user_id: 1 }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => {

                const { message } = resp;
                toast({
                    title: `${message}`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                onClose();
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetch(`http://localhost:3001/api/${requestType}`)
            .then(response => response.json())
            .then(operation => {
                setListOperation(operation);
                setIsLoading(false);
            })
    }, [isLoading]);

    return (
        <>
            {
                requestForm && <FormOperations setIsLoading={setIsLoading} />
            }
            <Box height='auto'>
                <Table size='md' variant='simple' colorScheme='twitter'>
                    <TableCaption>Lista de operaciones
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Tipo</Th>
                            <Th>Concepto</Th>
                            <Th isNumeric>Monto</Th>
                            <Th>Fecha</Th>
                            <Th>Accion</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            listOperation.map((op, i) => {
                                return (
                                    <Tr key={i}>
                                        <Td>{op.tipo}</Td>
                                        <Td>{op.concepto}</Td>
                                        <Td isNumeric>${op.monto}</Td>
                                        <Td>{moment(op.fecha).format('DD/MM/YYYY')}</Td>
                                        <Td isTruncated>
                                            <Tooltip label='Editar' fontSize='xs'>
                                                <Button
                                                    colorScheme={'facebook'}
                                                    size='sm'
                                                    mr={1}
                                                    onClick={() => handleClickEdit(op)}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip label='Eliminar' fontSize='xs'>
                                                <Button colorScheme={'red'} size='sm' onClick={() => handleClickDeleted(op.id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </Tooltip>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Box>

            {/* ---------MODAL------     */}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleSubmitEdit}>
                    <ModalContent bgColor={'twitter.900'} color='white'>
                        <ModalHeader>Editar operacion</ModalHeader>
                        <ModalBody>
                            <Stack spacing={3} padding={5}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<QuestionIcon color='white' />}
                                    />
                                    <Input
                                        placeholder='Ingrese un concepto'
                                        color='white'
                                        autoComplete='off'
                                        ref={initialRef}
                                        name='concepto'
                                        value={conceptoEdit}
                                        onChange={handleChangeEdit}
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
                                        name='monto'
                                        value={montoEdit}
                                        onChange={handleChangeEdit}
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
                                        name='fecha'
                                        value={fechaEdit}
                                        onChange={handleChangeEdit}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <RadioGroup>
                                        <Stack
                                            direction='row'
                                            name='tipo'
                                            onChange={handleChangeEdit}
                                        >
                                            <Radio
                                                value='Ingreso'
                                                colorScheme='green'
                                                isDisabled>
                                                Ingreso
                                            </Radio>
                                            <Radio value='Egreso' colorScheme='red' isDisabled>Egreso</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </InputGroup>

                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='green' mr={3} type='submit'>
                                Guardar
                            </Button>
                            <Button onClick={onClose} colorScheme='red'>Cancelar</Button>
                        </ModalFooter>

                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}
