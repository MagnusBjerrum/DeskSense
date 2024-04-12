let responseDOM = document.getElementById("response")

let user = {}

function saveUser(){
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    
    user.username = username
    user.password = password

    axios.post('http://localhost:3000/login', user)
    .then(function (response) {
      console.log(response.data);
        if(response. data == "User logged in"){
            localStorage.setItem("Username", username)
        }
      responseDOM.innerHTML = response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

