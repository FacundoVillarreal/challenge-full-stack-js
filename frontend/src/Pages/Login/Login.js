import React, { useContext, useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    InputRightElement,
    Text,
    useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {

    const [userId, setUserId] = useContext(UserContext);

    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    const navigate = useNavigate();
    const toast = useToast();

    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");


    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailValue(e.target.value);
                break;
            case 'password':
                setPassValue(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = { email: emailValue, password: passValue }
        fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(res => {
                const { message, state, user_id } = res;
                if (state) {
                    if (user_id !== undefined) {
                        setUserId(user_id);
                        localStorage.setItem('userId', JSON.stringify(user_id));
                        navigate('/');
                    }
                } else {
                    toast({
                        title: `${message}`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    })
                }
            })
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="twitter.900" />
                <Heading color="twitter.800">Bienvenido</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        name="email"
                                        value={emailValue}
                                        onChange={handleChange} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        name="password"
                                        value={passValue}
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="blue"
                                width="full"
                            >
                                Iniciar Sesión
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                <NavLink as={Link} to="/auth/newUser">
                    <Text color={"twitter.800"} fontSize='15px' fontWeight={'semibold'}>
                        Crear Cuenta
                    </Text>
                </NavLink>
            </Box>
        </Flex>
    );
};

export default Login;
