import { Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Form/Input";

interface SignInData {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSignIn: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignInData>;
  loading: boolean;
}

const LoginForm = ({
  handleSignIn,
  errors,
  register,
  loading,
}: LoginFormProps) => {
  const history = useHistory();

  return (
    <Grid
      as="form"
      onSubmit={handleSignIn}
      border="2px solid"
      borderColor="gray.0"
      borderRadius='5px'
      padding="24px"
      w={["100%", "100%", "40%", "40%"]}
    >
      <Heading fontSize="lg" fontWeight="bold" mb="5">
        Login
      </Heading>
      <VStack mt="6" spacing="5" w="100%">
        <Input
          {...register("email")}
          error={errors.email}
          placeholder="Email"
          textLabel="Email"
          type="email"
        />
        <Input
          {...register("password")}
          error={errors.password}
          placeholder="Senha"
          textLabel="Senha"
          type="password"
        />
      </VStack>

      <VStack mt="5" spacing="5">
        <Button
          isLoading={loading}
          bg="green.primary"
          w="100%"
          color="white"
          h="60px"
          borderRadius="8px"
          _hover={{ background: "green.secondary" }}
          type="submit"
        >
          Logar
        </Button>
        <Text color="gray.200" textAlign="center">
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </Text>
        <Button
          bg="gray.100"
          w="100%"
          color="gray.300"
          h="60px"
          borderRadius="8px"
          onClick={() => history.push("/signup")}
          _hover={{ color: "gray.100", background: "gray.300" }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};

export default LoginForm;
