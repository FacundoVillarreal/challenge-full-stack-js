import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Table, TableCaption, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

export const TableOperations = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [listOperation, setListOperation] = useState([]);


    const handleClickEdit = () => {
        console.log("edit")
    }

    const handleClickDeleted = () => {
        console.log("deleted")
    }



    useEffect(() => {
        fetch('http://localhost:3001/api/operations')
            .then(response => response.json())
            .then(operation => {
                setListOperation(operation);
                setIsLoading(false);
            })
    }, [isLoading]);


    return (
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
    )
}
