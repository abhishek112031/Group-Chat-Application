async function getAllUserMessage(){
  const token=localStorage.getItem('token');

  try{
    const allmsg=await axios.get('/user/all-messages',{ headers: { "Authorization": token } });
    console.log("msgdata-->",allmsg.data);
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

      console.log("cant be empty message--->")
    }
    else{
      // console.log(msg,token);
      const msgObj={message}

      const response = await axios.post('/user/message', msgObj, { headers: { "Authorization": token } });
      document.getElementById('inp').value="";
      getAllUserMessage();



    }
};
window.addEventListener('DOMContentLoaded',async()=>{
  getAllUserMessage()

})
