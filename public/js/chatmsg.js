const token = localStorage.getItem('token');
const groupId = localStorage.getItem('groupId');
const userId=localStorage.getItem('userId');
window.addEventListener('DOMContentLoaded', async () => {
    try {

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
        //heading data:user name,group name:
        const headingResp = await axios.get(`/group/heading-data/${groupId}`, { headers: { "Authorization": token } });
        console.log('heading resp==>', headingResp.data);
        document.getElementById('Groupchatheading').innerHTML = `Hi ${headingResp.data.userName}, Welcome to Group: ${headingResp.data.groupName}`;
        localStorage.setItem('userId',headingResp.data.userId)

        // localstorage savingfunction:
        setInterval(()=>{

            localStorageLogic()
            document.getElementById('usermsg').innerHTML="";
            // document.getElementById('othermsg').innerHTML="";
            
        },3000)
        // localStorageLogic()

    }
    catch (err) {
        console.log('err-->', err)
    }
});

async function showgroupMembersOnScreen(data) {
    let parent1 = document.getElementById('members');
    let child1 = `<li id=${data.id}>${data.name} <button onclick=makeAdmin('${data.id}') >Make Admin</button><button onclick=removeUser('${data.id}') >Remove</button></li>`
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
        // let userMsgArr=[];
        // userMsgArr.push(postResp)
        // const postRespStringify=JSON.stringify()
        showOnScreen(postResp.data);

    }
    catch (err) {
        console.log('err-->', err)
    }

}


async function localStorageLogic() {
    if (localStorage.getItem('messages') != null) {

        let msgStr = localStorage.getItem('messages');
        let msgParsed = JSON.parse(msgStr);
        let lastMsgId = msgParsed[msgParsed.length - 1].id;
        // ?page=1&size=${noOfRows}
        let newres = await axios.get(`/user/new-messages/?lastId=${lastMsgId}&groupId=${groupId}`,{ headers: { "Authorization": token } });

        localStorage.setItem('messages', JSON.stringify(msgParsed.concat(newres.data)));

        let allchats = JSON.parse(localStorage.getItem('messages'));
        allchats.forEach(element => {
            showOnScreen(element);

        });
       


        //  showOnScreen(JSON.parse(localStorage.getItem("messages")))


    }
    else {
        localStorage.setItem('messages', JSON.stringify([{ id: 0, senderName: "Chat App", message: "no messages yet,waiting for Your first message🥱" }]));
    }




}

function showOnScreen(data){
    // if(data.userId==userId){
        let parentNode=document.getElementById('usermsg');
        let childNode=`<li id=${data.id}>${data.senderName}::${data.message}</li>`;
        parentNode.innerHTML+=childNode;
    // }
    // else{
    //     let parentNode2=document.getElementById('othermsg');
    //     let childNode2=`<li id=${data.id}>${data.senderName}::${data.message}</li>`;
    //     parentNode2.innerHTML+=childNode2;

    // }

}






