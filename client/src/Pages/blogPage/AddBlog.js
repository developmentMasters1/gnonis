
import React, {useContext, useState} from 'react';
import BlogText from './BlogText';
import { ImageUpload } from '../../service/ImageUpload';
import { AuthContext } from '../../Context/AuthContext';


const AddBlog = () => {

const user = useContext(AuthContext) ;  
const [title,setTitle] = useState(''); 
const [description,setDescription] = useState('');
const [image,setImage] = useState('');  
const [imageURL,setImageURL] = useState('');    
const [blogMetaData , setBlogMetaData] = useState({});
const [blogCategory , setBlogCategory] = useState('');  
const [initialInfo , setInitialInfo] = useState(false);

 
const handleClick =  async (e) => { 
    e.preventDefault();

    

    
   if ( image !== '' && /^image\//.test(image.type) ){
       
        const formData = new FormData();
        formData.append("file", image);
        formData.append("user", user.user.username);

        const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
        const url = res ? res.url : null;
        setImageURL(url); 
        
        setBlogMetaData({
            title,
            description,
            imageURL,
            blogCategory,
        })
       setInitialInfo(true);
   }else{
         alert('Please add image to your blog');
   }
    

}


return (
  <>
    {!initialInfo && (<> <div>
        <label>Title</label>
        <input value={title} onChange={(event)=>{
            setTitle(event.target.value)
        }} />
        <label>Description</label>
        <textarea value={description} onChange={(event) => { 
            setDescription(event.target.value)
        }}></textarea>

        <label>Blog Category </label>
        <input type="text" value={blogCategory} onChange={(event) => { 
            setBlogCategory(event.target.value)
        }}/>
        <label>Add Image</label>
        <input type="file" onChange={(e) => { setImage(e.target.files[0])}} />
        <button onClick={handleClick}>Next</button>
    </div> </>)}
    
    {initialInfo &&  <BlogText setIntialInfo={setInitialInfo} blogMetaData={blogMetaData}/>} 
    </>)

}



export default AddBlog;