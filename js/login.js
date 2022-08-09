// const db = require("../models");

// const loginFormHandle = async(event) => {
//     event.preventDefault();
//     const email = document.getElementById('#email-login').value.trim();
//     const password = document.getElementById('#password-login').value.trim();

//     if (email && password) {
//         // send a post request to the API endpoint
//         const response = await fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({email, password})
//     });
//     if (response.ok) {
//         document.location.replace("./posts/new");
//     } else {
//         aler(response.statusText)
//     }
// }
// }

// document.querySelector(".login-form").addEventListener('submit', loginFormHandle);