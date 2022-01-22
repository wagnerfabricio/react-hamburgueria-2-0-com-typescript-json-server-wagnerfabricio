import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ProdCard from "../../components/ProdCard";
import { useProd } from "../../contexts/ProdContext";

interface ProductListProps {
  products: iProduct[];
}

interface iProduct {
  prodId: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

const ProductList = ({ products }: ProductListProps) => {
  const { searchProducts } = useProd();

  return (
    <>
      {products.length > 0 ? (
        <Flex
          w="100vw"
          flexWrap={["nowrap", "nowrap", "wrap"]}
          gap={["20px", "20px", "50px"]}
          mt="32px"
          mb="32px"
          justifyContent={["flex-start", "flex-start", "center"]}
          paddingX={["20px", "10px", "0"]}
          overflowX="scroll"
          flexGrow="1"
        >
          {products.map((product) => (
            <ProdCard product={product} key={product.prodId} />
          ))}
        </Flex>
      ) : (
        <Flex
          padding={["10px 15px", "10px 15px", "0px", "0px"]}
          alignItems="center"
          justifyContent="space-evenly"
          height="100vh"
          flexDirection={["column-reverse", "column-reverse", "row"]}
        >
          <Box mt="4">
            <Heading>Ooops!</Heading>
            <Text mt="4" textAlign="center">
              Não encontramos o produto que você procurou <br />
              <b>Faça uma nova busca ou...</b>
            </Text>
            <Button
              mt="4"
              bg="green.primary"
              h="60px"
              color="white"
              w="100%"
              _hover={{ bg: "green.secondary" }}
              mb={["10", "10", "0"]}
              onClick={() => searchProducts("")}
            >
              Voltar para lista de produtos
            </Button>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ProductList;
