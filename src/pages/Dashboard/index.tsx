import { Flex } from "@chakra-ui/react";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Flex
      w="100%"
      height={["auto", "auto", "100vh", "100vh"]}
      bg="gray.bg"
      justifyContent="center"
    >
      <Header />
    </Flex>
  );
};

export default Dashboard;
