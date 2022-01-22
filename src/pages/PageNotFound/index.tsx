import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import LoginAside from "../Login/LoginAside";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <Flex
      padding={["10px 15px", "10px 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="space-evenly"
      height="100vh"
      flexDirection={["column-reverse", "column-reverse", "row"]}
    >
      <LoginAside />

      <Box mt="4">
        <Heading>Ooops!</Heading>
        <Text mt="4" textAlign="center">
          Não encontramos a página que você procurou, <br />
          <b>vamos tentar novamente.</b>
        </Text>
        <Button
          mt="4"
          bg="green.primary"
          h="60px"
          color="white"
          w="100%"
          _hover={{ bg: "green.secondary" }}
          mb={["10", "10", "0"]}
          onClick={() => history.push("/")}
        >
          Voltar para minha página
        </Button>
      </Box>
    </Flex>
  );
};

export default PageNotFound;
