let img = document.querySelector('#Profile');
let form_ = document.querySelector('.form');
form_.addEventListener('submit',(event) => {
    event.preventDefault()
})
let file = {};
img.addEventListener('change',(event) => {
     file = event.target.files[0]
})
console.log(file)
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
          //adding the image to the storage : 
          console.log(file)
          firebase.storage().ref('users/'+ res.user.uid + '/profile.jpg').put(file)
          .then(response => console.log('the image is succesfful'));
          console.log(file)
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
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});