
async function getAllUserMessage() {
  const token = localStorage.getItem('token');

  try{

    setInterval(async() => {
  
      const allmsg = await axios.get('/user/all-messages', { headers: { "Authorization": token } });
      document.getElementById('greet').innerHTML = `Hi ${allmsg.data.admin}, Welcome to Group Chat App `
      // console.log("msgdata-->",allmsg.data.message);

      if(allmsg.data.message.length<15){

        localStorage.setItem("messages", JSON.stringify(allmsg.data.message));
      }
      else{
        localStorage.setItem("messages", JSON.stringify(allmsg.data.message.slice(allmsg.data.message.length-15,allmsg.data.message.length)));

      }

  
  
    }, 3000);

    let msgStr = localStorage.getItem('messages');
    let msgParsed = JSON.parse(msgStr);
    console.log("parsed===",msgParsed[10])
    // console.log("split arr--->",msgParsed.slice(msgParsed.length-10,msgParsed.length))

    msgParsed.forEach(element => {
      showOnScreen(element);
    });


    //new messages:
    console.log("--->",msgParsed.length);
    // if(msgParsed.length>10){
    //   msgParsed.slice(msgParsed.length-10,msgParsed.length).forEach(element => {
    //     showOnScreen(element);
    //   });
    // }
    // else{
    //   msgParsed.forEach(element => {
    //       showOnScreen(element);
    //     });

    // }
  }
  catch(err){
    console.log("err====>",err)
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
  window.addEventListener('DOMContentLoaded',async()=>{

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
