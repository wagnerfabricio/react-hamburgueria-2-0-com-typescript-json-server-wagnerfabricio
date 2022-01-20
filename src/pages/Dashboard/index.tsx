import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useProd } from "../../contexts/ProdContext";
import ProductList from "./ProductList";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { getProducts, products } = useProd();

  const toast = useToast();

  useEffect(() => {
    getProducts()
      .then((_) => {
        setLoading(false);
      })
      .catch((_) => {
        toast({
          position: "top",
          title: "Ooops...",
          description:
            "Parece que nossos servidores estão fora do ar, tente novamente mais tarde.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      w="100%"
      height="100vh"
      bg="gray.bg"
      flexDirection="column"
      alignItems="center"
    >
      <Header />
      <ProductList products={products} />
      {loading && <h1>Ainda está carregando</h1>}
    </Flex>
  );
};

export default Dashboard;
