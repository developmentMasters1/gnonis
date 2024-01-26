import {useState , useRef} from 'react';
import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import {useNavigate} from 'react-router-dom' ;
import { useDisclosure } from '@chakra-ui/react';
import { jwtDecode } from "jwt-decode";


import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button , Input
} from '@chakra-ui/react'
import { AuthContext } from '../Context/AuthContext';




const Header = () =>{

  const {user} = useAuthContext(AuthContext) ; 
  const {logout} = useLogout() ;
  const [sidebar , setSidebar] = useState(false) ;  
  const navigate = useNavigate() ; 
  const { isOpen, onOpen, onClose } = useDisclosure() ; 
  const [userDetails , setUserDetails] = useState(null) ; 
  const btnRef = useRef();

  
  

  const handleClick = () => {

    if(user !== null){
      setSidebar(!sidebar) ;

      const data = jwtDecode(user) ;

      setUserDetails(data) ; 

       onOpen();

    }
    else{
       navigate('/login') ;
    }

  }


    return(
        <div className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-semibold">
            Gnonis
          </div>
          <nav className="space-x-4">
            <Link to= "/" className="text-white hover:text-gray-300">Home</Link>
            <Link to= "/about" className="text-white hover:text-gray-300">About</Link>
            <img src="#-TO be add " ref={btnRef}  alt="User" onClick={handleClick}/> 
            {sidebar &&  
            <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Welcome {userDetails.name}</DrawerHeader>
          <DrawerBody>
            <Link to='/bloglist'> My Blogs</Link>
            <Link to='/addblog'>Add New Blog</Link>
          </DrawerBody>

          <DrawerFooter>
             <Button colorScheme='red'> Logout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>}
          </nav>
        </div>
      </div>
      
    )
}
    

 
export default Header;