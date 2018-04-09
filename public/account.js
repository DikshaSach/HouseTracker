function createAcc(){
    $('#register-acc').on('submit', function(event){  
    event.preventDefault();
    const login = $(event.currentTarget).find('#username');
    const username = login.val();
    const createPassword = $(event.currentTarget).find('#password');
    const password = createPassword.val();
    //sending post requestion to api/users endpoint
    requestRegister.post('api/users', username, password, function(){
        
        window.location = 'signin';
    });
    login.val('');
    createPassword.val(''); 
});
}

function logInFunc(username, password){
    console.log(username, password);
    // post request to api/auth/login endpoint 

    requestLogin.post('api/auth/login', username, password, function(resultData){
        localStorage.setItem('token', resultData.authToken);
        localStorage.setItem('id', resultData.userID);
        console.log(resultData);
        var id = resultData.userID;
        
        window.location= 'houseList/'+ id;
       
    })
}

function logIn(){
$('#login-acc').on('submit', function(event){ 
    event.preventDefault();
    var existingUser = $('#acc-username').val();
    var existingPassword = $('#acc-password').val();
    logInFunc(existingUser, existingPassword);
});
}
// log out and remove id and token from storage
function logOut(){
    $('.logOut').on('click', function(){
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        window.location = '/';
    })
}
logOut();
createAcc();
logIn();
$(document).ready(function() {
    $('.register').on('click', function(){
        window.location = 'register';
    });
});