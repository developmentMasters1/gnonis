
import React from 'react'
import { useLoaderData } from 'react-router';
import BlogCard from '../Components/BlogCard';
import { SimpleGrid } from '@chakra-ui/react';


export const getUserBlogList = async () => {
    try{
        const token = JSON.parse(localStorage.getItem("user")) ;
        const res = await fetch("http://localhost:4000/blog/user/list", {
            method : "GET",
            headers : {

                "authorization": `Bearer ${token}`,
            }
        }) ; 
        const data = await res.json() ; 
        return data ;   
    }
    catch(error){
        console.log(error) ; 
        return { isError : true} ;
    }
}

function UserBlogList() {
    const {userBlogs} = useLoaderData() ;
    console.log(userBlogs);

    
    
    
    return (
        <SimpleGrid spacing={5} minChildWidth="200px">
        { userBlogs && userBlogs.map((blog) => {
            return <BlogCard key={blog._id} blog={blog} />
            
        })}
        </SimpleGrid>
    )
  
    }
export default UserBlogList
