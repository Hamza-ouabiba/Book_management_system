var form = document.querySelector('form');
var small = document.querySelector('.text');
let button = document.querySelector('.but');
var user_cred = document.querySelector('header');
var image = document.querySelector('#img')
var ifd = document.querySelector('header')
console.log(image);
ifd.addEventListener('click',(event) => {
     console.log(event)
      document.location.href = "/project/settings.html"
      console.log("ha hia")
})
//to show the username in the header
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
firebase.auth().onAuthStateChanged(user => {
      if(user)
      {
           let user_id = user.uid;
          form.addEventListener('submit',function(event)
          {
               event.preventDefault();
               let Book = document.getElementById('name').value;
               let Author = document.getElementById('author').value;
               //we should have the id of the book:
               db.collection("users").doc(user_id).collection("Book_user").get()
               .then(function(books) 
               {
                    let flag = false;
                    books.forEach(function(book)
                    {
                         //searching for the book and getting the id :
                         if(Book === book.data().name && Author === book.data().Author)
                         {
                             flag = true;
                              //getting the id : -->
                              db.collection('users').doc(user_id).collection("Book_user").doc(book.id).delete()
                              .then(function (e) 
                              {
                                  let html = 
                                  `
                                     <small>Book Deleted successfully</small>
                                  `
                                  small.innerHTML = html;
                                  small.setAttribute('class','success');
                                  setTimeout(function(e)
                                  {
                                      console.log(e)
                                      small.innerHTML = "";
                                      small.setAttribute('class','d');
                                  },3000)
                                  form.reset()
                              })
                         }
                    })
                    if(flag === false)
                    {
                        let html = 
                       `
                          <small>Book Not Found </small>
                       `
                      small.innerHTML = html;
                      small.setAttribute('class','error');
                      setTimeout(function()
                      {
                          small.innerHTML = "";
                          small.setAttribute('class','d');
                      },3000)
                      form.reset()
                    }
               })
          })
      }
})
//jquery
$(window).on("load",function(){
     $(".loader-wrapper").fadeOut("slow");
});