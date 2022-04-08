const submittedPasswordField = document.getElementById("exampleInputPassword");
const repeatedPasswordField = document.getElementById("exampleRepeatPassword")
const submittedInputUsername = document.getElementById("exampleInputUsername")
const registerButton = document.getElementById("register-button")

registerButton.addEventListener('click',(event)=>{
    if(submittedPasswordField.value !== repeatedPasswordField.value
        || submittedPasswordField.value === ""
        || submittedInputUsername.value ===""){
        event.preventDefault();
        confirm("Invalid login credentials. Please try again.");
        return;
    }
    else {
        confirm("Your account has been created");
        localStorage.setItem("userLoginCredentials", JSON.stringify({
            userEmail: submittedInputUsername.value,
            userPassword: submittedPasswordField.value,
        }));
    }
});