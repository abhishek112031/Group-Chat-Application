async function loginUser(event){
    event.preventDefault();
    try{

        const loginDetails={
            email:document.getElementById('email').value,
            password:document.getElementById('password').value
        }
    
        const resp=await axios.post('/post-login-data',loginDetails);
    
        if(resp.status===200){
            if(confirm(resp.data.message)){
    
              localStorage.setItem('token',resp.data.token);

              window.location.href='/user/chat';
      
            //   window.location.href='/user/chat'
            console.log('successful login')
            }
      
          }
    }
  
  
  catch(err){
    // console.log(err.response.data.message)
        document.body.innerHTML+=`<div class="text-white text-center bg-danger">Error: ${err.response.data.message}</div>`
  }
}