import React,{ useEffect,useState } from "react";

export const useUsername = (initialUsername) => {
    const [username, setUsername] = useState(initialUsername);
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    let debounceTimer;
  
    useEffect(() => {

        const checkUsernameAvailability = async () => {  
        clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(async () => {
          try {
            const response = await fetch(`http://localhost:4000/checkusername`,{
                method : "POST",
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({username})
            });
            const data = await response.json();
            setAvailabilityMessage(data.msg);
          } catch (error) {
            console.error('Error:', error);
          } 
        }, 500); 
      };
  
      checkUsernameAvailability();
    }, [username]);
  
    const handleUsernameChange = (newUsername) => {
      setUsername(newUsername);
    };
  
    const handleBlur = () => {
      clearTimeout(debounceTimer);
    };
  
    return { username, availabilityMessage, handleUsernameChange, handleBlur };
  };