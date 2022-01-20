import { Flex, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginForm from "./LoginForm";
import { useState } from "react";
import LoginAside from "./LoginAside";
import { useAuth } from "../../contexts/AuthContext";

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
});

interface SignInData {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({ resolver: yupResolver(signInSchema) });

  const toast = useToast();

  const handleSignIn = (data: SignInData) => {
    setLoading(true);
    signIn(data)
      .then((_) => {setLoading(false)
      
      })
      .catch((err) => {
        toast({
          position: 'top',
          title: "Ooops...",
          description: "Email ou senha inválidos",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  return (
    <Flex
      w="100%"
      height={["auto", "auto", "100vh", "100vh"]}
      padding={["40px 18px", "40px 18px", "0"]}
      bg="gray.bg"
      justifyContent="center"
    >
      <Flex
        w={["100%", "100%", "90%", "75%"]}
        justifyContent="center"
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
        alignItems="center"
        gap={["14px", "62px"]}
      >
        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(handleSignIn)}
          loading={loading}
          register={register}
        />
        <LoginAside />
      </Flex>
    </Flex>
  );
};

export default Login;
