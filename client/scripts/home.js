const socket = io();

const messages = document.getElementById('messages');
const input = document.getElementById('input');
let username = "Anonymous"
let seat1 = 0
// if(localStorage.getItem("Username") != null){
//    username = localStorage.getItem("Username")
// }

socket.emit('user joined', username)

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit('chat message', input.value);
//     input.value = '';
//   }
// });

// function changeUsername(){
//   username = document.getElementById("username").value
//   if(!username == ""){
//     localStorage.setItem("Username", username)
//   }
//   else{
//     localStorage.setItem("Username", "Anonymous")
//   }
//   socket.emit("user joined", username)
//   document.getElementById("username").value = ''
// }

function sendChat(){
  if (input.value) {
    socket.emit('chat message', username + ": " + input.value);
    input.value = '';
  }
}

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('seatChange', (msg) => {
  if(msg == 1) {
    document.getElementById("table2").style.backgroundColor  = "green"
  }
  else{
    document.getElementById("table2").style.backgroundColor = "#7e7e7e"
  }
  // document.getElementById("space1").innerHTML = seat1
  console.log("SeatChange" + msg)
});


// // send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// // receive a message from the server
// socket.on("hello from server", (...args) => {
//   // ...
// });
// let user = {}
// const socket = io();

// function saveUser(){
//     let username = document.getElementById("username").value
//     let email = document.getElementById("email").value
//     let password = document.getElementById("password").value
    
//     user.username = username
//     user.email = email
//     user.password = password

//     console.log(user)

//     axios.post('http://localhost:3000', user)
//     .then(function (response) {
//       console.log(response);
//       responseDOM.innerHTML = response.data
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

// }

// function getUsers(){
//     axios.get('http://localhost:3000')
//     .then(function (response) {
//       // handle success
//       console.log(response.data);
//       responseDOM.innerHTML = "All users available in console"
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });
// }
