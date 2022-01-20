import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/images/logo.svg";
import { FiShoppingBag } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

const LoginAside = () => {
  return (
    <Grid as="aside" w={["100%", "100%", "40%", "40%"]}>
      <Image src={logo} alt="Kenzie burguer" mb="30px" />
      <Box
        h="95px"
        maxWidth={["100%", "100%", "380px"]}
        border="1px solid"
        borderColor="gray.100"
        borderRadius="5px"
      >
        <Flex h="100%" w="100%" alignItems="center" padding="14px">
          <Center
            h="60px"
            w="60px"
            bg="rgba(39, 174, 96, 0.1)"
            color="#219653"
            borderRadius="5px"
            flexShrink="0"
            mr="20px"
          >
            <FiShoppingBag />
          </Center>
          <Text fontSize="sm" color="gray.300">
            A vida é como um sanduíche, é preciso recheá-la com os{" "}
            <b style={{ color: "black" }}>melhores</b> ingredientes.
          </Text>
        </Flex>
      </Box>
      <Grid
        display={["none", "none", "grid"]}
        gridTemplateColumns="repeat(6, 1fr)"
        gridTemplateRows="repeat(3, 1fr)"
        w="180px"
        h="80px"
        gap="24px"
        flexWrap="wrap"
        mt="30px"
        color="gray.0"
        fontSize="11px"
      >
        {Array.from(Array(18).keys()).map((circle) => (
          <FaCircle key={circle} />
        ))}
      </Grid>
    </Grid>
  );
};

export default LoginAside;
