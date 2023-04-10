let token = localStorage.getItem('token');
let groupId = localStorage.getItem('groupId');
let userId=localStorage.getItem('userId');
let lastMsgId=0;
let socket=io();
// socket.on('custom',(data)=>{
//     console.log("from socket io:::",data.name)
// });
window.addEventListener('DOMContentLoaded', async () => {
    try {
         //heading data:user name,group name:
         const headingResp = await axios.get(`/group/heading-data/${groupId}`, { headers: { "Authorization": token } });
         console.log('heading resp==>', headingResp.data);
         document.getElementById('Groupchatheading').innerHTML = `Hi ${headingResp.data.userName}, Welcome to Group Chat Room`;
         document.getElementById('chatbox').innerHTML=`${headingResp.data.groupName}`
         localStorage.setItem('userId',headingResp.data.userId);
        userId=headingResp.data.userId;


        //display function:****
       const allMsgResp=await axios.get(`/all-messages/?groupId=${groupId}&lastMessageId=${lastMsgId}`);
       console.log("allmsg-->",allMsgResp.data);
      lastMsgId=allMsgResp.data[allMsgResp.data.length-1].id;

      allMsgResp.data.forEach((elem)=>{
        display(elem);
    });

      


        
        const allGroupMemberRes = await axios.get(`/userGroup/members/${groupId}`, { headers: { "Authorization": token } });
        console.log('members=>', allGroupMemberRes.data);
        allGroupMemberRes.data.forEach(element => {
            showgroupMembersOnScreen(element);

        });
        const adminsResp = await axios.get(`/group-admins/${groupId}`, { headers: { "Authorization": token } });
        console.log("admins arr-->", adminsResp.data)
        adminsResp.data.forEach(element => {
            showgroupAdminsOnScreen(element);

        });
       

 
    //    console.log("lastMsgId==",lastMsgId)
        


    }
    catch (err) {
        console.log('err-->', err)
    }
});
// console.log("lastMsgId==",lastMsgId)

async function showgroupMembersOnScreen(data) {
    let parent1 = document.getElementById('members');
    let child1 = `<li id=${data.id}>${data.name} <button class="btn btn-outline-warning" onclick=makeAdmin('${data.id}') >Make Admin</button><button class="ms-1 btn btn-outline-dark" onclick=removeUser('${data.id}')>Remove</button></li>`
    if (child1) {

        parent1.innerHTML += child1;
    }
        

};
async function showgroupAdminsOnScreen(data) {
    let parent2 = document.getElementById('admins');
    let child2 = `<li id=${data.id}>${data.name}</li>`
    if (child2) {

        parent2.innerHTML += child2;
    }

}
async function makeAdmin(userId) {
    try {
        const details = {
            userId: userId,
            groupId: groupId
        }

        const makeAdminResp = await axios.post('/make-admin', details, { headers: { "Authorization": token } });
        let parent2 = document.getElementById('members');
        let child2 = document.getElementById(userId);

        parent2.removeChild(child2);
        showgroupAdminsOnScreen(makeAdminResp.data);




    }
    catch (err) {

    }

}
async function removeUser(userId) {
    try {
        const details = {
            userId: userId,
            groupId: groupId
        }

        const removeRes = await axios.post('/remove-user', details, { headers: { "Authorization": token } });
        let parent3 = document.getElementById('members');
        let child3 = document.getElementById(userId);

        parent3.removeChild(child3);


    }
    catch (err) {

    }
}


//post message:
document.getElementById('send').onclick = async function (e) {
    e.preventDefault();
    try {
        const messageDetails = {
            message: document.getElementById('textArea').value,
            userId: Number(userId),
            groupId:Number(groupId)  

        }
        const postResp = await axios.post('/user/message', messageDetails, { headers: { "Authorization": token } });
        console.log("****", postResp.data);
      
        document.getElementById('textArea').value="";

        //socket function:==>
        socket.emit('send-message',(groupId));


        // showOnScreen(postResp.data);

    }
    catch (err) {
        console.log('err-->', err)
    }

}


socket.on('receive', async(data)=>{
    console.log('received from back end:-->',data==groupId);
    try{

        if(groupId===data){
            const newMessages= await axios.get(`/new-messages/?groupId=${groupId}&lastMsgId=${lastMsgId}`);
            console.log("newmessages---->",newMessages.data);
            lastMsgId=newMessages.data[newMessages.data.length-1].id;
            console.log('lastmsgId',lastMsgId);
            newMessages.data.forEach((elem)=>{
                display(elem);
            });
            
    
        }
    }
    catch(err){
        console.log('socket on err==>',err)
    }

})
function display(data){
    if(data.id!==0){
        let parentNode=document.getElementById('usermsg');
        let childNode=`<li id=${data.id}  class="mt-2 text-light  bg-secondary rounded rounded-3"><span class="fw-bold">${data.senderName}:</span> <span class="fst-italic">${data.message}</span></li>`;
        parentNode.innerHTML+=childNode;

    }
}


// async function localStorageLogic() {
//     if (localStorage.getItem('messages') != null) {

//         let msgStr = localStorage.getItem('messages');
//         let msgParsed = JSON.parse(msgStr);
//         let lastMsgId = msgParsed[msgParsed.length - 1].id;
//         // ?page=1&size=${noOfRows}
//         let newres = await axios.get(`/user/new-messages/?lastId=${lastMsgId}&groupId=${groupId}`,{ headers: { "Authorization": token } });

//         localStorage.setItem('messages', JSON.stringify(msgParsed.concat(newres.data)));

//         let allchats = JSON.parse(localStorage.getItem('messages'));
//         allchats.forEach(element => {
//             showOnScreen(element);

//         });
   
//     }
//     else {
//         localStorage.setItem('messages', JSON.stringify([{ id: 0, senderName: "Chat App", message: "no messages yet,waiting for Your first message🥱" }]));
//     }




// }

// function showOnScreen(data){
//     // if(data.userId==userId){
//         let parentNode=document.getElementById('usermsg');
//         let childNode=`<li id=${data.id}>${data.senderName}::${data.message}</li>`;
//         parentNode.innerHTML+=childNode;
//     // }
//     // else{
//     //     let parentNode2=document.getElementById('othermsg');
//     //     let childNode2=`<li id=${data.id}>${data.senderName}::${data.message}</li>`;
//     //     parentNode2.innerHTML+=childNode2;

//     // }

// }

// function showOnScreen(data){
//     let parentNode=document.getElementById('usermsg');
//     if(data.userId==userId){
//         let childNode=`<li id=${data.id}  class="mt-2 text-light pe-2 text-end bg-secondary rounded rounded-3"><span class="fw-bold">${data.senderName}:</span> <span class="fst-italic">${data.message}</span></li>`;
//         parentNode.innerHTML+=childNode;
//     }
//     else{
 
//         let childNode2=`<li id=${data.id} class="mt-2 ps-2 text-light bg-secondary rounded rounded-3">${data.senderName}::${data.message}</li>`;
//         parentNode.innerHTML+=childNode2;

//     }

// }






