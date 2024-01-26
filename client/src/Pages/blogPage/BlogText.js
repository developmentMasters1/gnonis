import React, { useContext, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import Quill from 'quill';
import { ImageUpload, GetImage } from '../../service/ImageUpload';
import { AuthContext } from '../../Context/AuthContext';
import { jwtDecode } from "jwt-decode";

Quill.register('modules/imageResize', ImageResize);


function BlogText( {setIntialInfo , blogMetaData}) {
  const [value, setValue] = useState("");
  const [image, setImage] = useState([]);
  const user = useContext(AuthContext); 
  
  const decode = jwtDecode(user.user) ; 
  // console.log(decode);  


  const quillRef = React.useRef() ;


  const handleImage = () => { 
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    const editor = quillRef.current.getEditor();  

    input.onchange = async() =>{

      const file = input.files[0];

      if (/^image\//.test(file.type)) {
  
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user", user.user.username); 

  


        const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
        const url = res ? res.url : null;

        editor.insertEmbed(editor.getSelection(), "image",url);
      } else {
        alert('You could only upload images.');
      }
  

    }  

  }

  const handleRevert = () => {
    console.log(blogMetaData);
    setIntialInfo(false);
  }

  const handleClick = async (e) => {
     
    e.preventDefault(); 

    const sendPost = await fetch("http://localhost:4000/blog", { 
      method : "POST",
      headers : {

        "Content-Type" : "application/json",
        "authorization": `Bearer ${user.user}`,
      },
    
      body : JSON.stringify({
        blog_title : blogMetaData.title,
        blog_info : blogMetaData.description,
        blog_img : blogMetaData.imageURL,
        blog_category : blogMetaData.blogCategory,
        blog_article : value,
        author_username : decode.username ,
        blog_last_updated : Date.now() 
      })
    });
  



    
  }

  const modules = useMemo(() => ({
    toolbar: {

    container : [
      [{ 'header': [1, 2,3,4,5,6, false] }],
      [{ 'font': [] }],
      [{'size' : []}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ] , 
      handlers: { 
        image : handleImage 
      }
    
  },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
        displaySize: true
     }
  }), []);
 
  return(
    <div>
        

          <div >
            <ReactQuill 
              ref={quillRef}
            theme='snow'
             value={value} 
             onChange={setValue}
             modules={modules} />
        </div>
        <button onClick ={handleClick}>Upload</button>
        <button onClick={handleRevert}>Go Back</button> 
        <div dangerouslySetInnerHTML={{__html: value}} /> 
       
    </div>
  );
}


export default BlogText;