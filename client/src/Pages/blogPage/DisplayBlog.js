import {useEffect, useState}  from 'react';
import { useLoaderData } from 'react-router';
import { Text, Heading ,Box,Flex, Button} from '@chakra-ui/react';
import Comment from '../../Components/Comment' ;


export const loader = async (id) => {
   
    try{
        const res = await fetch(`http://localhost:4000/blog/${id}`) ; 
        const data = await res.json() ; 
        return data ;
    }
    catch(error){
        console.log(error) ; 
        return { isError : true} ;
    }

   
   
}


const DisplayBlog  = (props) => {

    const data = useLoaderData() ; 
    console.log(data) ;
    const [comments , setComments] = useState([]) ;


    useEffect(()=>{

        setComments(data.blogData[0].comments) ; 

    }, [] )  ;
  
    return (
        
        <Flex direction="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box>
        <div dangerouslySetInnerHTML={{ __html: data.blogData[0].blog_article }}></div>
      </Box>
      <Box>
         <Button >Add Comment </Button>
      </Box>

      <Box p={4}>
        <Heading>Comments</Heading>
        {comments && comments.length > 0 ? (
          comments.map((comment) => <Comment key={comment.id} comment={comment} />)
        ) : (
          <Text>No comments</Text>
        )}
      </Box>
      </Flex>

  );
};
        
    


export default  DisplayBlog ;  

