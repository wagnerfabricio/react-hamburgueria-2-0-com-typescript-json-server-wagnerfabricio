import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface SearchBarProps {
  openSearch: boolean;
  setOpenSearch: (arg0: boolean) => void;
}

const SearchBar = ({ openSearch, setOpenSearch }: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setOpenSearch(false);
  };

  return (
    <Flex
      w={openSearch ? "100%" : "365px"}
      h="60px"
      flexDir="row"
      display={openSearch ? "flex" : ["none", "none", "flex"]}
    >
      <InputGroup w="100%" h="100%">
        <Input
          h="60px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digitar pesquisa"
          border="2px"
          _focus={{ borderColor: "gray.600" }}
        />
        <InputRightElement
          borderRadius="8px"
          as="button"
          mt="10px"
          mr="2"
          w="50px"
          h="40px"
          fontSize="sm"
          color="white"
          bg="green.primary"
          _hover={{ bg: "green.secondary" }}
          children={<FaSearch color={theme.colors.white} />}
          onClick={handleSearch}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
