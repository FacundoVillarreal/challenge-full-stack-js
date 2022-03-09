import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Button,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
}
  from '@chakra-ui/react';
import { CalendarIcon, DeleteIcon, EditIcon, QuestionIcon } from '@chakra-ui/icons';
import moment from 'moment';
import { TableOperations } from '../TableOperations/TableOperations';

export const ListOfOperations = () => {
  // -------FUNCIONALIDAD DEL FORMULARIO ------------
  const toast = useToast();
 

  //actualiza la lista de operaciones
  // const [isLoading, setIsLoading] = useState(true);
  

  //FUNCIONALIDAD GRID
  // const [listOperation, setListOperation] = useState([]);
  //STATE EDIT

  //MODAL
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [conceptoEdit, setConceptoEdit] = useState('');
  const [montoEdit, setMontoEdit] = useState('');
  const [fechaEdit, setFechaEdit] = useState('');
  const [tipoEdit, setTipoEdit] = useState('');
  const [idEdit, setIdEdit] = useState('');

  //valueModal

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

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    // setIsLoading(true);
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
        // setIsLoading(false);
      })
  }

  const handleClickDeleted = (id) => {
    // setIsLoading(true);
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
        // setIsLoading(false);
      })
  }

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/operations')
  //     .then(response => response.json())
  //     .then(operation => {
  //       setListOperation(operation);
  //       setIsLoading(false);
  //     })
  // }, [isLoading]);


  return (
    <Grid
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={6}
      padding={6}>


      <TableOperations/>
      {/* <Box height='auto'>
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
      </Box> */}


      {/* MODAL */}
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
                    autoComplete='of'
                    ref={initialRef}
                    value={conceptoEdit}
                    onChange={handleChangeEdit}
                    name='concepto'
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
                    value={montoEdit}
                    onChange={handleChangeEdit}
                    name='monto'
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
                    value={fechaEdit}
                    onChange={handleChangeEdit}
                    name='fecha'
                  />
                </InputGroup>

                <InputGroup>
                  <RadioGroup>
                    <Stack
                      direction='row'
                      onChange={handleChangeEdit}
                      name='tipo'>
                      <Radio value='Ingreso' colorScheme='green' >Ingreso</Radio>
                      <Radio value='Egreso' colorScheme='red' >Egreso</Radio>
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
    </Grid>
  )
}
