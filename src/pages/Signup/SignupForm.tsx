import {
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useHistory, Link as ReachLink } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface SignUpFormProps {
  handleSignUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignUpData>;
  loading: boolean;
}

const SignUpForm = ({
  errors,
  handleSignUp,
  loading,
  register,
}: SignUpFormProps) => {
  const history = useHistory();
  const {} = useAuth();

  return (
    <Grid
      as="form"
      onSubmit={handleSignUp}
      border="2px solid"
      borderColor="gray.0"
      borderRadius="5px"
      padding="24px"
      w={["100%", "100%", "40%", "40%"]}
      mb={["30px", "30px", "0"]}
    >
      <Flex justifyContent="space-between">
        <Heading fontSize="lg" fontWeight="bold" mb="5">
          Cadastro
        </Heading>
        <Link
          as={ReachLink}
          to="/"
          fontSize="sm"
          color="gray.300"
          textDecoration="underline"
        >
          Retornar para o Login
        </Link>
      </Flex>
      <VStack mt="6" spacing="3" w="100%">
        <Input
          {...register("name")}
          error={errors.name}
          placeholder="Nome"
          textLabel="Nome"
        />
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
        <Input
          {...register("confirm_password")}
          error={errors.confirm_password}
          placeholder="Confirmar Senha"
          textLabel="Confirmar Senha"
          type="password"
        />
      </VStack>

      <Button
        isLoading={loading}
        bg="gray.100"
        w="100%"
        color="gray.300"
        h="60px"
        borderRadius="8px"
        _hover={{ color: "gray.100", background: "gray.300" }}
        type="submit"
        mt="5"
      >
        Cadastrar
      </Button>
    </Grid>
  );
};

export default SignUpForm;
