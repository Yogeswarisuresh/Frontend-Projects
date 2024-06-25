const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const pass = document.querySelector('#pass')
const cpass = document.querySelector('#cpass')

form.addEventListener('submit',(e) => {
    if(!validateInputs()){
        e.preventDefault();
    }
})
function validateInputs(){
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passVal = pass.value.trim();
    const cpassVal = cpass.value.trim();
    let success = true
    if(usernameVal===''){
        success = false;
        setError(username,'UserName is required')
    }
    else{
        setSuccess(username)
    }
    if(emailVal === ''){
        success = false;
        setError(email,'Email is required')
    }
    else if(!validateEmail(emailVal)){
        success = false;
        setError(email,'Invalid email')
    }
    else{
        setSuccess(email)
    }
    if(passVal === ''){
        success = false;
        setError(pass,'Confirm Password is required')
    }
    else if(passVal.length<8){
        success = false;
        setError(pass,'password must be atleast 8 characters')
    }
    else{
        setSuccess(pass)
    }
    if(cpassVal === ''){
        success = false;
        setError(cpass,'Password is required')
    }
    else if(cpassVal!==passVal){
        success = false;
        setError(cpass,'enter the correct password')
    }
    else{
        setSuccess(cpass)
    }
return success;
}
function setError(element,message){
    const inputgroup = element.parentElement;
    const errorElement = inputgroup.querySelector('.error');
    errorElement.innerText = message;
    inputgroup.classList.add('error')
    inputgroup.classList.remove('success')
}
function setSuccess(element){
    const inputgroup = element.parentElement;
    const errorElement = inputgroup.querySelector('.error');
    errorElement.innerText = '';
    inputgroup.classList.add('success')
    inputgroup.classList.remove('error')
}
const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}