import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/images/logo.svg";
import { useProd } from "../../contexts/ProdContext";
import SearchBar from "./SearchBar";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const {searchProducts} = useProd()

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
    <Flex
      w="100%"
      h="80px"
      bg="gray.0"
      justifyContent="space-between"
      alignItems="center"
      flexShrink="0"
      paddingX="5vw"
    >
      <Image src={Logo} w="160px" onClick={() => searchProducts("")}/>
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
            <Badge
              variant="solid"
              bg="green.primary"
              borderRadius="7px"
              paddingX="4px"
              position="absolute"
              left="12px"
              bottom="22px"
            >
              5
            </Badge>
            <Icon
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
          />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
