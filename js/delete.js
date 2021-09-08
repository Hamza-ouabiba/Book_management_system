var form = document.querySelector('form');
var small = document.querySelector('.text');
let button = document.querySelector('.but');
var user_cred = document.querySelector('header');
//to show the username in the header
firebase.auth().onAuthStateChanged(user => 
     {
          if(user)
          {
             let uid = user.uid;
             db.collection('users').doc(uid).get()
             .then(res =>
                 {
                     let html = 
                     `
                       <header>${res.data().name}</header>
                     `
                     user_cred.innerHTML = html;
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
form.addEventListener('submit',function(event)
{
     event.preventDefault();
     let Book = document.getElementById('name').value;
     let Author = document.getElementById('author').value;
     //we should have the id of the book:
     db.collection('Book').get()
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
                    db.collection('Book').doc(book.id).delete()
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