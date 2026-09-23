document.getElementById("loginform").addEventListener("submit", function(event){
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message"); // no .value here

    if(username === ""){
        message.textContent = "Please enter username";
        message.style.color = "red";
        return;
    }
    if(password === ""){
        message.textContent = "Please enter password";
        message.style.color = "red";
        return;
    }
    if(username === "haasini" && password === "haasini26@"){
        message.textContent = "Login Successful";
        message.style.color = "green";
    } else {
        message.textContent = "Invalid username or password";
        message.style.color = "red";
    }
});
