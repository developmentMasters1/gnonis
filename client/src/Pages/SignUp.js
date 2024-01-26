import React, { useEffect, useState } from 'react';
import {useSignUp} from '../hooks/useSignUp';
import { useUsername } from '../hooks/useUsername';
import { useNavigate } from 'react-router';


const SignUp = () => {
    const [emailId , setEmailId] = useState("");
    const [password , setPassword] = useState(""); 
    const {username,availabilityMessage,handleUsernameChange,handleBlur} = useUsername("");
    const navigate = useNavigate(); 


   const {signUp, isLoading, error,success} = useSignUp();

    const handleSubmit = async  (e) => {

        e.preventDefault();

        await signUp(username,emailId,password) ;

       
    }

    useEffect(()=>{
        if(success){
            navigate("/login");
        }
    },[success])

            

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <label>Username</label>
                <input type="text" placeholder="Enter Username" value={username} onChange={(e)=>{handleUsernameChange(e.target.value)}} onBlur= {handleBlur}/>
                
                <p>{availabilityMessage}</p>
                <br/>
                <label>EmailId</label>
                <input type="email" placeholder="Enter EmailId" value= {emailId} onChange={(e)=>{setEmailId(e.target.value)}}/>
                <br/>
                <label>Password</label>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <br/>
                <button  disabled = {isLoading}>SignUp</button>
                {error && <p>{error}</p>}
               
            </form>
        </div>
    )
}


export default SignUp; 