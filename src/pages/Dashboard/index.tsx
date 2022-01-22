import { Box, Button, Flex, Grid, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useCart } from "../../contexts/CartContext";
import { useProd } from "../../contexts/ProdContext";
import ProductList from "./ProductList";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { getProducts, products } = useProd();
  const { getCart } = useCart();

  const toast = useToast();

  useEffect(() => {
    getProducts()
      .then((_) => {
        setLoading(false);
      })
      .catch((_) => {
        setLoading(false);
        toast({
          position: "top",
          title: "Ooops...",
          description:
            "Parece que nossos servidores estão fora do ar, tente novamente mais tarde.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });

    getCart()
      .then((_) => setLoading(false))
      .catch((_) => {
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

      {loading ? (
        <Grid placeItems="center" h="50vh">
          <Grid placeItems="center">
            <Button
              isLoading={true}
              bg="transparent"
              _hover={{ bg: "transparent" }}
            >
              Carregando
            </Button>
            <Heading>Aguarde...</Heading>
          </Grid>
        </Grid>
      ) : (
        <ProductList products={products} />
      )}
    </Flex>
  );
};

export default Dashboard;
