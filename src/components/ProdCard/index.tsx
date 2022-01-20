import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";

const product = {
  image: "https://i.ibb.co/P1QVcr0/202109090436-skn5yx754p-1.png",
  name: "Hamburguer",
  category: "Sanduíches",
  price: 14,
  prodId: 1,
};

const ProdCard = () => {
  return (
    <Grid gridTemplateColumns='1fr 1.5fr'>
      <Box>
        <Image src={product.image} />
      </Box>
      <Flex flexDirection='column'>
          <Heading>{product.name}</Heading>
          <Text>{product.category}</Text>
          
      </Flex>
    </Grid>
  );
};

export default ProdCard;
