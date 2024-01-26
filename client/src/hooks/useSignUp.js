
import { useState } from 'react'

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  

  const signUp = async (name, emailId, password) => {
    setIsLoading(true);
    setError(null);

    console.log(JSON.stringify({ name,emailId, password })); 

    
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name,emailId, password })
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setSuccess(true);
    }
  }

  return { signUp, isLoading, error , success};
}