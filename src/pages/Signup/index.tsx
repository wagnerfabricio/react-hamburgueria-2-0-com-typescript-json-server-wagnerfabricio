import { Flex, useToast } from "@chakra-ui/react";
import LoginAside from "../Login/LoginAside";
import SignUpForm from "./SignupForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { api } from "../../services/api";
import { useHistory } from "react-router-dom";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    setLoading(true);
    api
      .post("/register", { name, email, password })
      .then((response) => {
        toast({
          position: "top",
          title: "Perfeito!",
          description: "Cadastro efetuado com sucesso! Faça o login",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        history.push('/')

      })
      .catch((error) => {
        toast({
          position: "top",
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
        <LoginAside />
        <SignUpForm
          errors={errors}
          handleSignUp={handleSubmit(handleSignUp)}
          loading={loading}
          register={register}
        />
      </Flex>
    </Flex>
  );
};

export default Signup;
