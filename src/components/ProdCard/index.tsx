import { Button, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
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

const ProdCard = ({ product }: ProdCardProps) => {
  const [colorSchema, setColorSchema] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { addToCart } = useCart();
  const formatedPrice = formatValue(product.price);

  const handleAddToCart = async () => {
    setIsCartLoading(true);
    await addToCart(product).then((_) => setIsCartLoading(false));
  };

  return (
    <Grid
      w="300px"
      h="350px"
      gridTemplateRows="150px auto"
      justifyContent="center"
      border="2px solid"
      borderColor="gray.0"
      borderRadius="5px"
      _hover={{ transform: "translateY(7px)", borderColor: "green.primary" }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      onMouseEnter={() => setColorSchema(true)}
      onMouseLeave={() => setColorSchema(false)}
    >
      <Grid placeItems="center" width="296px" bg="gray.0" borderTopRadius="5px">
        <Image src={product.image} objectFit="cover" alt={product.name} />
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
          isLoading={isCartLoading}
          w="100px"
          h="40px"
          color="white"
          bg={colorSchema ? "green.primary" : "gray.150"}
          _hover={{ bg: "green.secondary" }}
          onClick={() => handleAddToCart()}
        >
          Adicionar
        </Button>
      </Flex>
    </Grid>
  );
};

export default ProdCard;
