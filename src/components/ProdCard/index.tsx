import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import formatValue from "../../utils/formatValue";

interface ProdCardProps {
  product: iProduct;
}

interface iProduct {
  prodId: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

const temp = {
  category: "Sanduíches",
  image: "https://i.ibb.co/P1QVcr0/202109090436-skn5yx754p-1.png",
  name: "Hamburguer",
  price: 14,
  prodId: 1,
};

const ProdCard = ({ product }: ProdCardProps) => {
  const [colorSchema, setColorSchema] = useState(false);
  const formatedPrice = formatValue(product.price);

  return (
    <Grid
      w="300px"
      h="350px"
      gridTemplateRows="150px auto"
      justifyContent="center"
      border="2px solid"
      borderColor="gray.0"
      borderRadius="5px"
      _hover={{ borderColor: "green.primary" }}
      onMouseEnter={() => setColorSchema(true)}
      onMouseLeave={() => setColorSchema(false)}
    >
      <Grid placeItems="center" width="296px" bg="gray.0" borderTopRadius="5px">
        <Image src={product.image} objectFit='cover' />
      </Grid>
      <Flex
        flexDirection="column"
        paddingX="20px"
        paddingY="25px"
        justifyContent="space-evenly"
        rowGap="14px"
      >
        <Heading fontSize="lg" fontWeight="bold" color="gray.900">
          {product.name}
        </Heading>
        <Text fontSize="xs" color="gray.300">
          {product.category}
        </Text>
        <Text fontSize="sm" fontWeight="semibold" color="green.primary">
          {formatedPrice}
        </Text>
        <Button
          w="100px"
          h="40px"
          color="white"
          bg={colorSchema ? "green.primary" : "gray.150"}
          _hover={{ bg: "green.secondary" }}
        >
          Adicionar
        </Button>
      </Flex>
    </Grid>
  );
};

export default ProdCard;
