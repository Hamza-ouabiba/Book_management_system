//the function to create an account
let form = document.querySelector('.form');
form.addEventListener('submit',(event) => 
{
     event.preventDefault()
})
function Signup()
{
     let user = document.getElementById('user').value;
     let password = document.getElementById('password').value;
     console.log(user,password);
     //putting the inputs into the db :
     firebase.auth().createUserWithEmailAndPassword(user,password)
    .then(res => alert('The Account is created succesfully',res))
    .catch(function(error)
    {
         alert(error)
    })
    
}
//the function to sign into an account already existed in database: 
function signIn()
{
    let user = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(user,password)
    .then(function(res)
    {
        alert('Email and Password are correct');
        document.location.href = "/project/ui.html"
    })
    .catch(function(error) 
    {
         alert(error)
    })
}