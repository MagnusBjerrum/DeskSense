let responseDOM = document.getElementById("response")

let user = {}



function saveUser(){
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
    user.username = username
    user.email = email
    user.password = password

    console.log(user)

    axios.post('http://localhost:3000/user', user)
    .then(function (response) {
      console.log(response);
      responseDOM.innerHTML = response.data
    })
    .catch(function (error) {
      console.log(error);
    });

}

function getUsers(){
    axios.get('http://localhost:3000')
    .then(function (response) {
      // handle success
      console.log(response.data);
      responseDOM.innerHTML = "All users available in console"
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
