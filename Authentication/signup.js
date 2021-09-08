//the function to create an account
let form_ = document.querySelector('.form');
form_.addEventListener('submit',(event) => {
      event.preventDefault()
})
function Signup()
{
     let user = document.getElementById('user').value;
     let password = document.getElementById('password').value;
     let username = document.getElementById('username').value;
     console.log(user,password);
     //putting the inputs into the db :
     firebase.auth().createUserWithEmailAndPassword(user,password)
    .then(res => {
          alert('The Account is created succesfully',res);
          db.collection('users').doc(res.user.uid).set({
                id: res.user.uid,
                name: username,
                email: user,
                Password: password
          });
    })
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
// function logOut()
// {
//      firebase.auth().signOut()
//      .then(res => 
//         {
//              alert('log out succesfull');
//              console.log("log out succesfull : ",res);
//              document.location.href = "/Authentication/auth.html";
//         })
//      .catch(error => console.log(error));
// }
