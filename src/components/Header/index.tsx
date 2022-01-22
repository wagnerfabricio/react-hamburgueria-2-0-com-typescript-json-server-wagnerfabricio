import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useProd } from "../../contexts/ProdContext";
import Cart from "../Modal/Cart";
import SearchBar from "./SearchBar";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const { signOut } = useAuth();
  const { searchProducts } = useProd();
  const { cart, cartQty } = useCart();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  if (openSearch)
    return (
      <Flex
        w="100%"
        h="80px"
        bg="gray.0"
        justifyContent="space-between"
        alignItems="center"
        flexShrink="0"
        paddingX="5vw"
      >
        <SearchBar openSearch setOpenSearch={setOpenSearch} />
      </Flex>
    );

  return (
    <>
      <Cart isOpen={isCartOpen} onClose={onCartClose} />
      <Flex
        w="100%"
        h="80px"
        bg="gray.0"
        justifyContent="space-between"
        alignItems="center"
        flexShrink="0"
        paddingX="5vw"
      >
        <Image src={Logo} w="160px" onClick={() => searchProducts("")} />
        <Flex alignItems="center">
          <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
          <HStack spacing="5">
            <Icon
              display={["block", "block", "none"]}
              as={FaSearch}
              w="25px"
              h="25px"
              color="gray.150"
              _hover={{ color: "gray.300" }}
              onClick={() => setOpenSearch(true)}
            />
            <Box top="3px" position="relative">
              {cart.length > 0 && (
                <Badge
                  variant="solid"
                  bg="green.primary"
                  borderRadius="7px"
                  paddingX="4px"
                  position="absolute"
                  left="12px"
                  bottom="22px"
                  onClick={() => onCartOpen()}
                >
                  {cartQty}
                </Badge>
              )}
              <Icon
                onClick={() => onCartOpen()}
                as={FaShoppingCart}
                w="25px"
                h="25px"
                color="gray.150"
                _hover={{ color: "gray.300" }}
              />
            </Box>
            <Icon
              as={FaSignOutAlt}
              w="25px"
              h="25px"
              color="gray.150"
              _hover={{ color: "gray.300" }}
              onClick={() => signOut()}
            />
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
