import { Button, Grid, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
export const Header = () => {

    const [userId, setUserId] = useContext(UserContext);

    const handleClickLogout = () => {
        setUserId("");
        setUserId(localStorage.removeItem("userId"));
    }

    useEffect(() => {
        setUserId(localStorage.getItem("userId"))
    }, [userId])

    return (
        <Grid display={'flex'} m={6} justifyContent={'end'}>

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
                        <MenuItem onClick={handleClickLogout}>Cerrar Sesión</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </Grid >

    )
}
