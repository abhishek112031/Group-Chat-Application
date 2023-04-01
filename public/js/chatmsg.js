
async function getAllUserMessage() {
  const token = localStorage.getItem('token');

  try {



    const allmsg = await axios.get('/user/all-messages', { headers: { "Authorization": token } });
    document.getElementById('greet').innerHTML = `Hi ${allmsg.data.admin}, Welcome to Group Chat App `
    

//local storage logic:----->

   if (localStorage.getItem('messages')!=null){

     let msgStr = localStorage.getItem('messages');
     let msgParsed = JSON.parse(msgStr);
     let lastMsgId = msgParsed[msgParsed.length - 1].id;
 
     let newres = await axios.get(`/user/new-messages/?id=${lastMsgId}`);
 
     localStorage.setItem('messages',JSON.stringify(msgParsed.concat(newres.data)));

     let allchats=JSON.parse(localStorage.getItem('messages'));
     allchats.forEach(element => {
      showOnScreen(element);
      
     });

    //  showOnScreen(JSON.parse(localStorage.getItem("messages")))

   
   }
   else{
    localStorage.setItem('messages',JSON.stringify([{id:0,name:"Chat App",message:"no messages yet,waiting for Your first message🥱"}]))
   

   }


  }
  catch (err) {
    console.log("err====>", err)
  }




}


document.querySelector('.btn1').onclick = async function (e) {
  e.preventDefault();

  const token = localStorage.getItem('token');

  let message = document.getElementById('inp').value;

  if (message === undefined || message === null || message === "") {

    // console.log("cant be empty message--->")
  }
  else {
    // console.log(msg,token);
    const msgObj = { message }

    const response = await axios.post('/user/message', msgObj, { headers: { "Authorization": token } });
    // console.log("***",response.data.message);
    showOnScreen(response.data.message);

    document.getElementById('inp').value = "";
    // getAllUserMessage();



  }
};
window.addEventListener('DOMContentLoaded', async () => {

  getAllUserMessage();
});
function showOnScreen(data) {
  // console.log("data-->",data)
  const child = `<li id=${data.id}><span class=fw-bold>${data.name}:</span> <span class=text-primary>${data.message}</li>`
  const parent = document.getElementById('ul');
  parent.innerHTML += child;
  // console.log("child==",child)
}

document.querySelector('.logout').onclick = async function () {
  if (confirm('Click ok to logout')) {

    localStorage.clear();
    window.location.href = '/login';
  }
}
