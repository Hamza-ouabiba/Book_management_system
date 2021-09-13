let tbody = document.querySelector('tbody');
let button_ = document.querySelector('.but');
var user_cred = document.querySelector('header');
var image = document.getElementById('img')
//to show the username in the header --->
firebase.auth().onAuthStateChanged(user => 
   {
        if(user)
        {
           let uid = user.uid;
           firebase.storage().ref('users/'+ uid + '/profile.jpg').getDownloadURL()
           .then(img => {
                db.collection('users').doc (uid).get()
               .then(res =>
               {       
                   image.src = img;
                   let html = 
                   `
                     <img src=${image.src}>
                     <h4>${res.data().name}</h4>
                   `
                   user_cred.innerHTML = html;
                   //adding every book to a specific account : 
               })
           })
        }
   })
//getting all the data form the database with the current user ::: 
firebase.auth().onAuthStateChanged(user => {
    if(user)
    {
       console.log()
      let user_id = user.uid;
      db.collection("users").doc(user_id).collection("Book_user").get()
      .then(function(books)
      {
         
         if(books.docs.length == 0) 
         {
             let add = 
             `
                   No current data at the moment
             `
             tbody.innerHTML = add;
             tbody.style.color = "red";
         } else 
         {
            books.forEach((book) =>
          {
              let html = 
              `
                 <tr>
                    <td>${book.data().name}</td>
                    <td>${book.data().Author}</td>
                    <td>${book.data().Edition}</td>
                    <td>${book.data().ISBN}</td>
                 </tr>
              `
              tbody.innerHTML += html;
          })
         }
            
      })
    }
})
//Sign out 
button_.addEventListener('click',function(event)
{
     event.preventDefault();
     firebase.auth().signOut()
     .then(res => 
        {
             console.log(res);
             console.log("log out succesfull : ",res);
             document.location.href = "/Authentication/auth.html";
        })
        .catch(error => console.log(error));
})
$(window).on("load",function(){
   $(".loader-wrapper").fadeOut("slow");
});