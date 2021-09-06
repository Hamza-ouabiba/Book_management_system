var form = document.querySelector('form');
var small = document.querySelector('.text');
var pattern = /^[A-Z0-9]{10,13}$/
//getting input values : 
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
form.addEventListener('submit',function (e) 
{
    //cancelling bubbling ;
    e.preventDefault();
    let book = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let date = document.getElementById('date').value;
    let isbn = document.getElementById('isbn').value;
    if(pattern.test(isbn))
    {
        //creating an object :
      let Book_db = 
    {
       name: book,
       Author: author,
       Edition: date,
       ISBN: isbn
    };
    //taking values to the database :
    db.collection("Book").add(Book_db)
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
  } else 
    {
        small.innerHTML = "ISBN SHOULD HAVE 10 DIGITS  "
        small.setAttribute('class','error');
    }
    
})