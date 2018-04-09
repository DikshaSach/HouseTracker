var requestHouse = {
    get: function(url, callback){

        $.ajax({
            method: 'GET',
            url: url,
            headers:{
                'Authorization': "Bearer" + localStorage.getItem('token')
            },
            success: callback,
            error: function(err){
                console.log("Theres an error");
                console.error(err);
                window.location = '/';
            }
        });
    },
    post: function(url, submitHouse, callback){
        console.log('Posting House');
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(submitHouse),
            headers:{
                'Authorization': "Bearer" + localStorage.getItem('token')
            },
            success: callback,
            error: function(err){
                console.log("Theres an error");
                console.error(err);
                
            }
        });
    },
    delete: function(idParam, url, callback){
        console.log('Deleting House');
        $.ajax({
            type: 'DELETE',
            url: url,
            contentType: 'application/json',
            headers:{
                'Authorization': "Bearer" + localStorage.getItem('token')
            },
            success: callback,
            error: function(err){
                console.info('Theres an error with delete');
                console.error(err);
            }
        });
    },
    put: function(url, editHouse, callback){
        $.ajax({
            type: 'PUT',
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(editHouse),
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token')
            },
            success: callback,
            error: function(err){
                console.info('Theres an error');
                console.error(err);
            }
        });
}
}

const requestRegister = {
    post: function(url, username, password, callback){
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json',
            data: JSON.stringify({ 
                username: username,
                password: password
            }),
            dataType: 'json',
            // if successful reaching post endpoint then go to login function with username and pass
            success: callback,
            // else endpoint was not reached
            error: function(err) {
                console.info('There is an error');
                console.error(err);
                
            }
        });
    }

}

const requestLogin = {
    post: function(url, username, password, callback){
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            // if successfull console log token and id
            success: callback,
            error: function(err){
                console.info('Password is Wrong');
                console.error(err);
               onLoginError();
                
            }
        });
    }
}
