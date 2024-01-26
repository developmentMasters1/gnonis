import { Box, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Icon, Image, SimpleGrid , Spacer, Text} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { TriangleUpIcon , TriangleDownIcon} from '@chakra-ui/icons';



function BlogCard({blog}) {
    const navigate = useNavigate() ;    
    const handleClick = () => {
        navigate(`/blog/${blog._id}` , {state : {blog : blog}})  ; 
    }

    return (
        <Card align="center" onClick={handleClick} cursor="pointer">
  <Box objectFit="cover">
    <Image src={blog.blog_img} alt="Image blog" />
  </Box>
  
  <CardHeader>
    <Heading>{blog.blog_title}</Heading>
  </CardHeader>

  <CardBody>
    <Text>{blog.blog_info}</Text>
  </CardBody>

  <Divider />

  <CardFooter>
    <Flex alignItems="center" justifyContent="space-between" mt={2}>
      <Flex direction="column">
        <Text fontWeight="bold">By {blog.author_username}</Text>
      </Flex>

     
      <Flex direction="row" alignItems="center">
        <Flex direction="column" alignItems="center" mr={4}>
          <Icon as={TriangleUpIcon} boxSize={6}  />
          <Text>{blog.upvote_count}</Text>
        </Flex>
        <Flex direction="column" alignItems="center">
          <Icon as={TriangleDownIcon} boxSize={6} />
          <Text>{blog.downvote_count}</Text>
        </Flex>
      </Flex>
    </Flex>
  </CardFooter>
</Card>
        
    )
}

export default BlogCard ; 
