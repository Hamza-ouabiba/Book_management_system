//the function to create an account
let form_ = document.querySelector('.form');
let img = document.getElementById('Profile')

form_.addEventListener('submit',(event) => {
      event.preventDefault()
})
// function addfile(event) {
//    let file = {
//          actual: event.target.files[length]
//      };
//      console.log(file)
// }
//getting the actual profile image : 
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
$(window).on("load",function(){
     $(".loader-wrapper").fadeOut("slow");
});