let tbody = document.querySelector('tbody');
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