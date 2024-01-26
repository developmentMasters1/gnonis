export  const ImageUpload = async (data) => {
    try {
        console.log(data);
        const res = await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: data
        }) ;

        const url  = await res.json() ;  
         
        return url;
    } catch (error) {
        console.log(error);
    }
} 

export  const GetImage = async (url) => {

    try { 
        const res = await fetch(url) ; 
        console.log(res) ; 
        const blob = await res.blob() ; 
        const file = new File([blob], "image.png", {type : blob.type}) ; 
        console.log(file) ; 
        return file ;

    }catch(error){
        console.log(error) ;
    }   
}