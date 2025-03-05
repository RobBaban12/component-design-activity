import { Button, Card, Image, Text, Flex } from "@chakra-ui/react"
import {Products }from "./products"

const DisplayProducts = () => {
  return (
    <Flex 
      direction="row" 
      wrap="wrap" 
      gap={6} 
      justify="center"
      px={4}
    >
    {Products.map((product) => (  
    <Card.Root 
      maxW={["100%", "45%", "30%", "22%"]} 
      minW={["250px"]} 
      overflow="hidden"
    >
      <Image
        src={product.img}
        alt={product.title}
        height={["150px"]}
      />
      <Card.Body gap="2">
        <Card.Title>{product.title}</Card.Title>
        <Card.Description>
          {product.description}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="3">
        <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button>
      </Card.Footer>
    </Card.Root>
  ))}
    </Flex>
  );
};

export default DisplayProducts