async function getAllUserMessage(){
  const token=localStorage.getItem('token');

  try{
    const allmsg=await axios.get('/user/all-messages',{ headers: { "Authorization": token } });
    document.getElementById('greet').innerHTML=`Hi ${allmsg.data.name}, Welcome to Group Chat App `
    // console.log("msgdata-->",allmsg.data.message);
    allmsg.data.message.forEach((data)=>{
      // console.log(data)
      showOnScreen(data);
    })
  }
  catch(err){
    console.log(err);
  }

}
 
 
 document.querySelector('.btn1').onclick=async function(e){
    e.preventDefault();

    const token=localStorage.getItem('token');
    
    let message =document.getElementById('inp').value;

    if(message===undefined || message===null || message===""){

      // console.log("cant be empty message--->")
    }
    else{
      // console.log(msg,token);
      const msgObj={message}

      const response = await axios.post('/user/message', msgObj, { headers: { "Authorization": token } });
      // console.log("***",response.data.message);
      showOnScreen(response.data)
      
      document.getElementById('inp').value="";
      // getAllUserMessage();



    }
};
window.addEventListener('DOMContentLoaded',async()=>{
  
  getAllUserMessage();
});
function showOnScreen(data){
  // console.log(data.message)
  const child=`<li>${data.message}</li>`
  const parent=document.getElementById('ul');
  parent.innerHTML+=child;
}

document.querySelector('.logout').onclick=async function(){
  if(confirm('Click ok to logout')){

    localStorage.clear();
    window.location.href='/login';
  }
}
