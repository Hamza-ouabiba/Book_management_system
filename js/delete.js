var form = document.querySelector('form');
var small = document.querySelector('.text');
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
                    .then(function () 
                    {
                        let html = 
                        `
                           <small>Book Deleted successfully</small>
                        `
                        small.innerHTML = html;
                        small.setAttribute('class','success');
                        setTimeout(function()
                        {
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