import React, { useEffect, useState } from 'react';
import {useLogin} from '../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [name , setName] = useState(""); 
    const [password , setPassword] = useState(""); 
    const navigate  = useNavigate();

    const {login, isLoading, error,success} = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        login(name,password) ; 
       
    }

    useEffect(()=>{
        if(success){
            navigate("/bloglist");
        }
    },[success])    


    return (
        <>
        <div>
            <form onSubmit={handleSubmit}> 
                <h1>Login</h1>
                <label>Username</label>
                <input type="text" placeholder="Enter Username" value={name} onChange={(e)=>{setName(e.target.value)}}/> <br/>
                <label>Password</label>
                <input type="password" placeholder="Enter Password" value={password}  onChange={(e)=>{setPassword(e.target.value)}}/> <br/>
                <button disabled={isLoading} >Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
        <div>
            <Link to = "/signup"> SignUp </Link>
        </div>
        </>

    )
}


export default Login; 