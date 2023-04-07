async function createGroup(event) {
    event.preventDefault();
    try {

        const token = localStorage.getItem('token');

        const newGroup = {
            newGroup: document.getElementById('group').value
        }

        let resp1 = await axios.post('/add-newGroup', newGroup, { headers: { "Authorization": token } });

        // console.log("newgrp==",resp1)

        showGroupsOnscreen(resp1.data);
        document.getElementById('group').value = "";
    }
    catch (err) {
        document.getElementById('errDel').innerHTML = `<h5 class="text-center bg-danger">${err.response.data.message}<h5/>`
        setTimeout(() => {

            document.getElementById('errDel').innerHTML = ""
        }, 2000);

    }


};

function showGroupsOnscreen(data) {
    let parent_node = document.getElementById('all-groups');
    let childNode = `<li id=${data.id} class="mt-3 fw-bold" >${data.nameOfGroup}<button onclick=deleteGroup('${data.id}')  class=" btn btn-outline-danger ms-4 ">Delete</button><button onclick=openGroup('${data.id}') class="btn btn-outline-primary ms-2">Enter </button></li>`
    
    parent_node.innerHTML += childNode;
};
function showOtherGroupsOnscreen(data) {
    let parent2_node = document.getElementById('other-groups');
    let child2Node = `<li id=${data.id} class="mb-3 bg-light ">${data.nameOfGroup}<button onclick=joinGroup('${data.id}')  class="btn btn-outline-success ms-4">Join</button></li>`

    parent2_node.innerHTML += child2Node;

};

window.addEventListener('DOMContentLoaded', async () => {
    try{

        const token = localStorage.getItem('token');
        const userName = await axios.get('/user-name', { headers: { "Authorization": token } });
        document.getElementById('heading').innerHTML = `Hi , ${userName.data.username} Well Come to Group Chat Application🙂 `;
        const usergroupArr = await axios.get('/user-groups', { headers: { "Authorization": token } });
    
        let userGroupArr = usergroupArr.data;
        userGroupArr.forEach(element => {
            showGroupsOnscreen(element);
    
        });
        let otherGroups = await axios.get('/other-groups', { headers: { "Authorization": token } });
        otherGroups.data.forEach((elem) => {
            showOtherGroupsOnscreen(elem);
        })
    }
    catch(err){
        document.getElementById('errDel').innerHTML = `<h5 class="text-center bg-danger">${err.response.data.message}<h5/>`
        setTimeout(() => {

            document.getElementById('errDel').innerHTML = ""
        }, 2000);

    }




});


async function joinGroup(groupId) {

    const token = localStorage.getItem('token');

    const joinResp = await axios.get(`/join-group/${groupId}`, { headers: { "Authorization": token } });
    if (joinResp.status === 200) {
        let parent3 = document.getElementById('other-groups');
        let child3 = document.getElementById(groupId);
        if (child3) {
            parent3.removeChild(child3);
        }
        showGroupsOnscreen(joinResp.data.group);
        alert(joinResp.data.message);
    }
};

async function deleteGroup(groupId) {
    const token = localStorage.getItem('token');
    try {
        const groupDeletedResp = await axios.delete(`/delete-group/${groupId}`, { headers: { "Authorization": token } });
        if (groupDeletedResp.status === 200) {

            const p = document.getElementById('all-groups');
            const c = document.getElementById(groupId);
            if (c) {
                p.removeChild(c);
            }
            alert(groupDeletedResp.data.message)
        }
        else {
            console.log('something went wrong!')
        }

    }
    catch (err) {
        // console.log(err)
        document.getElementById('errDel').innerHTML = `<h5 class="text-center bg-danger">${err.response.data.message}<h5/>`
        setTimeout(() => {

            document.getElementById('errDel').innerHTML = ""
        }, 2000);

    }
};

//open groupWindow:-->
async function openGroup(grId){
    localStorage.setItem('groupId',grId);
    console.log("save to local storage!");
    window.location.href=`/group/messages`
}