async function createGroup(event){
    event.preventDefault();

    const token=localStorage.getItem('token');

    const newGroup={
        newGroup:document.getElementById('group').value
    }

    let resp1=await axios.post('/add-newGroup',newGroup,{ headers: { "Authorization": token } });

    console.log("newgrp==",resp1)
    showGroupsOnscreen(resp1.data);


}

function showGroupsOnscreen(data){
    let parent_node=document.getElementById('all-groups');
    let childNode=`<li id=${data.id}>${data.nameOfGroup}<button onclick=deleteGroup('${data.id}')  class=" btn btn-outline-danger">Delete</button></li>`

    parent_node.innerHTML+=childNode;
}
function showOtherGroupsOnscreen(data){
    let parent2_node=document.getElementById('other-groups');
    let child2Node=`<li id=${data.id}>${data.nameOfGroup}<button onclick=joinGroup('${data.id}')  class=" btn btn-outline-success">Join</button></li>`

    parent2_node.innerHTML+=child2Node;

}

window.addEventListener('DOMContentLoaded',async ()=>{
    

    const token=localStorage.getItem('token');
    const usergroupArr=await axios.get('/user-groups',{ headers: { "Authorization": token } });

    let userGroupArr=usergroupArr.data;
    userGroupArr.forEach(element => {
        showGroupsOnscreen(element);
        
    });
    let otherGroups=await axios.get('/other-groups',{ headers: { "Authorization": token } });
    otherGroups.data.forEach((elem)=>{
        showOtherGroupsOnscreen(elem);
    })


});


async function joinGroup(groupId){

    const token=localStorage.getItem('token');

    const joinResp=await axios.get(`/join-group/${groupId}`,{ headers: { "Authorization": token } });
    if(joinResp.status===200){
        let parent3=document.getElementById('other-groups');
        let child3=document.getElementById(groupId);
        if(child3){
            parent3.removeChild(child3);
        }
        showGroupsOnscreen(joinResp.data.group);
        alert(joinResp.data.message);
    }
}