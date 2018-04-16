function createAcc() {
    $('#register-acc').on('submit', function(event) {
        event.preventDefault();
       
        const login = $(event.currentTarget).find('#username');
        const username = login.val();
        const createPassword = $(event.currentTarget).find('#password');
        const password = createPassword.val();
        const password2 = $('#password2').val();
        //sending post requestion to api/users endpoint
        if(checkPasswords(password, password2)){
            requestRegister.post('api/users', username, password, function() {
                console.log('created account');
                            window.location = 'signin';
                        }); 
        }else{
            if ($('#register-acc > div').length === 0) {
                $('#register-acc').append('<br> <div style="color:red;">Username Taken. Please Try again<div>');
        }
    }
        login.val('');
        createPassword.val('');
    });
}
function checkPasswords(password, password2){
    console.log(password, password2);
    if(password === password2){
        
         return true;  
    }
    else{
       return false;
    }
}
function logInFunc(username, password) {
    console.log(username, password);
    // post request to api/auth/login endpoint 
   
    requestLogin.post('api/auth/login', username, password, function(resultData) {
        localStorage.setItem('token', resultData.authToken);
        localStorage.setItem('id', resultData.userID);
        console.log(resultData);
        var id = resultData.userID;

        window.location = 'houseList/' + id;

    })
}

function logIn() {
    $('#login-acc').on('submit', function(event) {
        event.preventDefault();
        var existingUser = $('#acc-username').val();
        var existingPassword = $('#acc-password').val();
        logInFunc(existingUser, existingPassword);
    });
}
// log out and remove id and token from storage
function logOut() {
    $('.logOut').on('click', function() {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        console.log('logging out');
        window.location = '/logOut';
    })
}
logOut();
createAcc();
logIn();
$(document).ready(function() {
    $('.register').on('click', function() {
        window.location = 'register';
    });
});