import {
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";

interface iProduct {
  id: number;
  userId: string;
  prodId: number;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartCardProps {
  product: iProduct;
}

const CartCard = ({ product }: CartCardProps) => {
  const { addToCart, subFromCart, removeFromCart, isCartLoading } = useCart();

  return (
    <Grid maxWidth="450px" h="80px" gridTemplateColumns="80px 1fr" mt="14px">
      <Grid
        w="80px"
        h="80px"
        placeItems="center"
        bg="gray.0"
        borderTopRadius="5px"
      >
        <Image src={product.image} alt={product.name} objectFit="cover" />
      </Grid>
      <Flex ml="10px" justifyContent="space-between">
        <Flex flexDirection="column" justifyContent="space-between">
          <Heading fontSize="lg" color="green.900">
            {product.name}
          </Heading>
          <Flex
            width="110px"
            h="34px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              isLoading={isCartLoading}
              bg="gray.100"
              h="100%"
              w="30px"
              padding="0px"
              placeItems="center"
              textAlign="center"
              borderRadius="none"
              _hover={{ bg: "gray.300" }}
              onClick={() => subFromCart(product)}
            >
              <Icon as={FaMinus} w="11px" color="red.secondary" />
            </Button>

            <Text
              w="full"
              textAlign="center"
              fontSize="xs"
              paddingY="6px"
              borderY="2px solid"
              borderColor="gray.100"
            >
              {product.quantity}
            </Text>
            <Button
              isLoading={isCartLoading}
              bg="gray.100"
              h="100%"
              w="30px"
              padding="0px"
              placeItems="center"
              textAlign="center"
              borderRadius="none"
              _hover={{ bg: "gray.300" }}
              onClick={() => addToCart(product.prodId)}
            >
              <Icon as={FaPlus} w="11px" color="red.secondary" />
            </Button>
          </Flex>
        </Flex>
        <Icon
          as={FaTrash}
          w="18px"
          h="18px"
          color="gray.150"
          _hover={{ color: "gray.300" }}
          onClick={() => removeFromCart(product.id)}
        />
      </Flex>
    </Grid>
  );
};

export default CartCard;
