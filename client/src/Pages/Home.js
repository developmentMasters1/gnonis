import React from 'react';

const category = ["Science & Technology", "Business", "Health", "Sports", "Entertainment", "General", "Technology"];


const Home = () =>{

    return (
        <div>
            <h1>Field</h1>
            {
                category.map((item, index)=>{
                    return (
                        <div key={index}>
                            <h3>{item}</h3>
                        </div>
                    )
                })
            }

            <div>
                <h1>Trending</h1>
                
            </div>


        </div>
    )
}


export default Home; 