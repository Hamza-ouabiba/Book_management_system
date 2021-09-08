var form = document.querySelector('form');
var user_cred = document.querySelector('header');
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
                    <small>Name</small>
                    <input value = ${res.data().name} placeholder="User">
                    <small>E-mail</small>
                    <input value = ${res.data().email} placeholder="User">
                    <small>User-id</small>
                    <input value = ${res.data().id} placeholder="User">
                    <button>Save</button>
                    `
                    form.innerHTML = html;
                })
         }
    })

// db.collection('users').get()
// .then(res => 
//     {
//          //getting the values from the database : 
//          res.forEach(book => 
//             {
//                 let html = 
//                 `
//                   <small>Name</small>
//                   <input value = ${book.data().name} placeholder="User">
//                   <small>E-mail</small>
//                   <input value = ${book.data().email} placeholder="User">
//                   <small>User-id</small>
//                   <input value = ${book.data().id} placeholder="User">
//                   <button>Save</button>
//                 `
//                 form.innerHTML = html;
//             })
//     })
//jquery for the preloader :
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
 });