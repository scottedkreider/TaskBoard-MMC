console.log("debugging");

debugButton = document.getElementById("debugButton");

debugButton.addEventListener('click',() => {
    if(confirm("Are you sure you want to reset your experience? This will delete anything you've entered into this application and take you back to the login screen.")){
        localStorage.clear();
        window.location.href = "login";
    }
})