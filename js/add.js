var form = document.querySelector('form');
var small = document.querySelector('.text');
//getting input values : 
form.addEventListener('submit',function (e) 
{
    //cancelling bubbling ;
    e.preventDefault();
    let book = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    //creating an object :
    let Book_db = 
    {
       name: book,
       Author: author
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
})