import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import ProdCard from "../../components/ProdCard";

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
  return (
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
  );
};

export default ProductList;
