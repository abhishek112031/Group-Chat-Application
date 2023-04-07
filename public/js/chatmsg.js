const token=localStorage.getItem('token');
const groupId=localStorage.getItem('groupId');
window.addEventListener('DOMContentLoaded',async()=>{
    try{
        
        const allGroupMemberRes=await axios.get(`/userGroup/members/${groupId}`,{ headers: { "Authorization": token }});
        console.log('members=>',allGroupMemberRes.data);
        allGroupMemberRes.data.forEach(element => {
            showgroupMembersOnScreen(element);
            
        });
        const adminsResp=await axios.get(`/group-admins/${groupId}`,{ headers: { "Authorization": token }});
        console.log("admins arr-->",adminsResp.data)
        adminsResp.data.forEach(element => {
            showgroupAdminsOnScreen(element);
            
        });
//heading data:user name,group name:
        const headingResp=await axios.get(`/group/heading-data/${groupId}`,{ headers: { "Authorization": token }});
        console.log('heading resp==>',headingResp.data);
        document.getElementById('Groupchatheading').innerHTML=`Hi ${headingResp.data.userName}, Welcome to Group: ${headingResp.data.groupName}`;

    }
    catch(err){
        console.log('err-->',err)
    }
});

async function showgroupMembersOnScreen(data){
    let parent1=document.getElementById('members');
    let child1=`<li id=${data.id}>${data.name} <button onclick=makeAdmin('${data.id}') >Make Admin</button><button onclick=removeUser('${data.id}') >Remove</button></li>`
    if(child1){

        parent1.innerHTML+=child1;
    }
    
};
async function showgroupAdminsOnScreen(data){
    let parent2=document.getElementById('admins');
    let child2=`<li id=${data.id}>${data.name}</li>`
    if(child2){

        parent2.innerHTML+=child2;
    }

}
async function makeAdmin(userId){
    try{
        const details={
            userId:userId,
            groupId:groupId
        }

        const makeAdminResp=await axios.post('/make-admin',details,{ headers: { "Authorization": token }});
        let parent2=document.getElementById('members');
        let child2=document.getElementById(userId);

        parent2.removeChild(child2);
        showgroupAdminsOnScreen(makeAdminResp.data);

        


    }
    catch(err){

    }

}

async function removeUser(userId){
    try{
        const details={
            userId:userId,
            groupId:groupId
        }

       const  removeRes=await axios.post('/remove-user',details,{ headers: { "Authorization": token }});
       let parent3=document.getElementById('members');
        let child3=document.getElementById(userId);

        parent3.removeChild(child3);
     

    }
    catch(err){

    }
}
