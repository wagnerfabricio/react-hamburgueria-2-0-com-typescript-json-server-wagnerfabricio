import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useCart } from "../../../contexts/CartContext";
import formatValue from "../../../utils/formatValue";
import CartCard from "../../CartCard";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, clearCart, cartTotal } = useCart();

  const formatedTotal = formatValue(cartTotal);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="5px"
        w={["90%", "90%", "450px"]}
        marginTop="80px"
      >
        <ModalHeader
          bg="green.primary"
          color="white"
          fontSize="lg"
          fontWeight="bold"
          borderTopRadius="5px"
        >
          Carrinho de compras
        </ModalHeader>
        <ModalCloseButton color="white" mt="2" />
        {cartTotal > 0 ? 
        (
          <Box>
            <ModalBody>
              {cart.map((item) => (
                <CartCard product={item} key={item.id} />
              ))}
            </ModalBody>
            <Grid placeItems="center" mt="18px" paddingX="24px">
              <Box
                as="hr"
                w="100%"
                borderTop="2px solid"
                borderTopColor="gray.100"
                alignSelf="center"
              />
            </Grid>

            <Flex
              justifyContent="space-between"
              mt="18px"
              paddingX="24px"
              fontSize="sm"
              fontWeight="600"
            >
              <Text color="gray.900">Total</Text>
              <Text color="gray.300">{formatedTotal}</Text>
            </Flex>
            <ModalFooter display="flex" flexDirection="column">
              <Button
                width="100%"
                h="60px"
                color="gray.300"
                bg="gray.100"
                _hover={{ color: "gray.100", background: "gray.300" }}
                mr={3}
                onClick={() => clearCart()}
              >
                Remover todos
              </Button>
            </ModalFooter>
          </Box>
        ) 
        : (
          <Grid h="160px" placeItems="center">
            <Flex flexDirection="column" gap="10px" alignItems="center">
              <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="bold">
                Sua sacola está vazia
              </Heading>
              <Text color="gray.300" fontSize="sm">
                Adicione itens
              </Text>
            </Flex>
          </Grid>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Cart;
