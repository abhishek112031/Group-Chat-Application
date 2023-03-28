async function loginUser(event){
    event.preventDefault();

    const loginDetails={
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    }

    const postloginResponse=await axios.post('/post-login-data',loginDetails);
}