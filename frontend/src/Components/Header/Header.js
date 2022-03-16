import { Button, Grid, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react';
import { Link } from 'react-router-dom';
export const Header = () => {
    return (
        <Grid display={'flex'} m={2} justifyContent={'end'}>

            <Menu>
                <MenuButton as={Button} colorScheme='pink' >
                    Perfil
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Perfil'>
                        <Link to="/">
                            <MenuItem>
                                Mis operaciones - Home
                            </MenuItem>
                        </Link>
                        <Link to="/operations">
                            <MenuItem>
                                Agregar Operaciones
                            </MenuItem>
                        </Link>
                    </MenuGroup>
                    <MenuDivider />
                    <Link to="/auth/login">
                        <MenuItem>Iniciar Sesión || Cerrar Sesión</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </Grid>

    )
}
