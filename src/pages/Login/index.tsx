import { Box, Flex, Grid, Heading, VStack } from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex
      height={["auto", "auto", "100vh", "100vh"]}
      padding={["40px 18px", "40px 18px", "0"]}
      bg="gray.bg"
    >
      <Flex
        w={["100%", "100%", "90%", "65%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
        alignItems="center"
      >
        <Grid as="form">
          <Heading fontSize='lg' fontWeight='bold'>Login</Heading>
          <VStack>
              <Box w='100%'>
                
              </Box>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Login;
