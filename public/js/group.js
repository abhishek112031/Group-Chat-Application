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
    let childNode=`<li id=${data.id}>${data.nameOfGroup}</li>`

    parent_node.innerHTML+=childNode;
}
function showOtherGroupsOnscreen(data){
    let parent2_node=document.getElementById('other-groups');
    let child2Node=`<li id=${data.id}>${data.nameOfGroup}</li>`

    parent2_node.innerHTML+=child2Node;

}

window.addEventListener('DOMContentLoaded',async ()=>{

    const token=localStorage.getItem('token');
    const usergroupArr=await axios.get('/user-groups',{ headers: { "Authorization": token } });
    // console.log("allgrp==",allgroupArr.data);
    let userGroupArr=usergroupArr.data;
    userGroupArr.forEach(element => {
        showGroupsOnscreen(element);
        
    });
    let allGroups=await axios.get('/all-groups',{ headers: { "Authorization": token } });
    let allgroupArr=allGroups.data;
    let otherGroupsArr=[];

    if(userGroupArr.length===0){
       

        allgroupArr.forEach(elem=>{
            showOtherGroupsOnscreen(elem)
        });

    }
    else{
         for(let i=0;i<userGroupArr.length;i++ ){
            for(let j=0;j<allgroupArr.length;j++){
                if(userGroupArr[i].id!=allgroupArr[j].id){
                    otherGroupsArr.push(allgroupArr[j])
    
                }
            }
        }
        otherGroupsArr.forEach(elem=>{
            showOtherGroupsOnscreen(elem)
        });

    }

   
    
  
    // console.log("==",allGroups.data)
    
    
    
   


 


})