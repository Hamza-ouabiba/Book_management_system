let tbody = document.querySelector('tbody');
let button_ = document.querySelector('.but');
//getting all the data form the database :
db.collection("Book").get()
.then(function(books)
{
    books.forEach(function(book)
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
})
//
button_.addEventListener('click',function(event)
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