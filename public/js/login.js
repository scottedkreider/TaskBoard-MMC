const inputUsernameField = document.getElementById("exampleInputUsername");
const inputPasswordField = document.getElementById("exampleInputPassword");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener('click',(event) => {
    event.preventDefault();
    if(!localStorage.getItem("userLoginCredentials")){
        alert("No user account found. Please create a new account.");
    }
    else{
        if(inputUsernameField.value === JSON.parse(localStorage.getItem("userLoginCredentials")).userEmail
            && inputPasswordField.value === JSON.parse(localStorage.getItem("userLoginCredentials")).userPassword){
                console.log("a");
                window.location.href = "index";
        } else {
            alert("Invalid username or password");
        }
    }
});
