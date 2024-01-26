import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import { createBrowserRouter , createRoutesFromElements, Route , Link , Outlet, RouterProvider  } from "react-router-dom";
import UserBlogList, { getUserBlogList } from "./Pages/UserBlogList";
import AddBlog from "./Pages/blogPage/AddBlog";
import DisplayBlog, { loader } from "./Pages/blogPage/DisplayBlog"; 



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path = "/" element={<Root/>} >
         <Route index element={<Home />} />
         <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<SignUp/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/bloglist" element ={<UserBlogList/>} loader={getUserBlogList} />
         <Route path="/addblog" element ={<AddBlog/>}/>
         <Route path="/blog/:id" element = {<DisplayBlog />} loader={({params}) => { return loader(params.id)}} />

      </Route>
    )
  )


  return (
    <> 
     <RouterProvider router={router} />
    </>
    )


}



const Root = () => {
  return (
    <>
    <div>
    <Header/>
    </div>


    <div>
    <Outlet/>
    </div>

    <Footer/>

    </>
  )
}



export default App;
