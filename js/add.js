var form = document.querySelector('form');
var small = document.querySelector('.text');
var image = document.getElementById('img');
var para = document.querySelector('p');
var pattern = /^[A-Z0-9]{10,13}$/
//pour faire différencier les données de chaque utilisateur il faut creer a chaque fois une collection liée a l' ID de user :::
//une fonction qui permet de retourner un nombre aléatoire pour le ISBN 
function isbn_gen()
{
   return Math.floor(Math.random() * 100000 );
}
//getting the profile name : 
firebase.auth().onAuthStateChanged(user => 
    {
         if(user)
         {
            let uid = user.uid;
            firebase.storage().ref('users/'+ uid + '/profile.jpg').getDownloadURL()
            .then(img => {
                 db.collection('users').doc(uid).get()
                .then(res =>
                {       
                    image.src = img;
                    let profile = `${res.data().name}`
                    para.innerHTML = profile;
                    //Ajouter chaque livre a un compte spécifique 
                })
            })
         }
    })
var button = document.querySelector('.button');
button.addEventListener('click',function(event)
{
     event.preventDefault();
     firebase.auth().signOut()
     .then(res => 
        {
             alert('log out succesfull');
             console.log("log out succesfull : ",res);
             document.location.href = "/Authentication/auth.html";
        })
        .catch(error => console.log(error));
})
//faire stocker les livres a chaque utilisateur : 
firebase.auth().onAuthStateChanged(user => {
     if(user)
     {
        form.addEventListener('submit',function(e) 
        {
            //cancelling bubbling ;
            e.preventDefault();
            let book = document.getElementById('name').value;
            let author = document.getElementById('author').value;
            let date = document.getElementById('date').value;
              let Book_db = 
            {
               name: book,
               Author: author,
               Edition: date,
               ISBN: isbn_gen()
            };
            let user_id = user.uid;
            //Faire stocker dans la base de donnée 
            db.collection("users").doc(user_id).collection("Book_user").add(Book_db)
            .then(function () 
            {
                let html = 
                `
                   <small>Book Added successfully</small>
                `
                small.innerHTML = html;
                small.setAttribute('class','success');
                setTimeout(function() 
                {
                    small.innerHTML= ""
                    small.setAttribute('class',' ');
                    form.reset()
                },3000);
            })
            .catch(function()
            {
                let html = 
                `
                   <small>ERROR !</small>
                `   
                small.innerHTML = html;
                small.setAttribute('class','error');
                form.reset() 
            })
        })
     }
})
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});
