'use strict';
var myArr = [];


//Creating account
function createAcc(){
    $('#register-acc').on('submit', function(event){  
    event.preventDefault();
    const login = $(event.currentTarget).find('#username');
    const username = login.val();
    const createPassword = $(event.currentTarget).find('#password');
    const password = createPassword.val();
    //sending post requestion to api/users endpoint
    $.ajax({
        type: 'POST',
        url: 'api/users',
        contentType: 'application/json',
        data: JSON.stringify({ 
            username: username,
            password: password
        }),
        dataType: 'json',
        // if successful reaching post endpoint then go to login function with username and pass
        success: function(){
            logInFunc(username, password)
        },
        // else endpoint was not reached
        error: function(err) {
            console.info('There is an error');
            console.error(err);
            
        }
    });
    // clear values
    login.val('');
    createPassword.val(''); 
});
}

function logInFunc(username, password){
    console.log(username, password);
    // post request to api/auth/login endpoint 
    $.ajax({
        type: 'POST',
        url: 'api/auth/login',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        // if successfull console log token and id
        success: function(resultData) {
            localStorage.setItem('token', resultData.authToken);
            localStorage.setItem('id', resultData.userID);
            console.log(resultData);
        // if successful then do a get request to api/protected
            $.ajax({
                type: 'GET',
                url: 'api/protected',
                contentType: 'application/json',
                dataType: 'json',
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                },
                // if successfull go to sendalert function
                success: 
                
                sendAlert()
            
            }) 
        },
        // if error password is wrong or username is wrong.
        error: function(err){
            console.info('Password is Wrong');
            console.error(err);
        }
    });
    $('#createHouse').show();
    $('#house-list h1').show();
   
}

function sendAlert(){
    alert('You are logged in now!');
    
    $('#houses').show();
    $('#register-acc').hide();
    $('#login-acc').hide();
    getHouses();
}

function logIn(){
$('#login-acc').on('submit', function(event){
    
    event.preventDefault();
    var existingUser = $('#acc-username').val();
    var existingPassword = $('#acc-password').val();
    
    logInFunc(existingUser, existingPassword);
    
    

});
}

function submitHouseInfo(){
    $('#createHouse').on('submit', function(event){
        event.preventDefault();
        const nameOfHouse = $('#house-name').val();
        const priceOfHouse = $('#house-price').val();
        const locationOfHouse = $('#house-location').val();

        const submitHouse = {
            name: nameOfHouse,
            price: priceOfHouse,
            location: locationOfHouse
        }
        console.log(nameOfHouse, priceOfHouse, locationOfHouse);
        postHouses(nameOfHouse, priceOfHouse, locationOfHouse, function(data){
            console.log('posting my house');
                      
            myArr.push(data);
            renderHouses(myArr);
            console.log(myArr);
        });
    });
}

function postHouses( nameHouse, priceHouse, locationHouse, callback){
    $.ajax({
        type: 'POST',
        url: '/api/houses',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
           name: nameHouse,
           price: priceHouse,
           location: locationHouse,
           creator: localStorage.getItem('id')
        }),
        headers:{
            'Authorization': "Bearer" + localStorage.getItem('token')
        },
        success: callback,
        error: function(err){
            console.ingo("Theres an error");
            console.error(err);
        }
    });
}

function getHouses(){
    $.ajax({
        type: 'GET',
        url: '/api/houses' + '/' + localStorage.getItem('id'),
        contentType: 'application/json',
        dataType:'json',
        headers: {
            'Authorization': "Bearer" + localStorage.getItem('token')
        },
        success: function(data){
            myArr = [];
            for(let i=0; i<data.length; i++){
                const getData = {
                    name: data[i].name,
                    price: data[i].price,
                    location: data[i].location,
                    _id: data[i]._id,
                    
                }
                myArr.push(getData);
            }
            console.log(myArr);
            renderHouses(myArr);
            //enterApp();
        }
    });
}

function renderHouses(myArr){
    console.log(myArr);
    $('#houseList').empty();
    for(var i=0; i<myArr.length; i++){
        $('#houseList').append(`<li houseID="${myArr[i]._id}" class="listItemHouse">
        <span> This is the house name: ${myArr[i].name} </span>
        <span> This is the house price: ${myArr[i].price} </span>
        <span> This is the house location: ${myArr[i].location} </span>
        <button type="button" class='delete' id='delete${[i]}' houseID='${myArr[i]._id}'>delete${[i]} </button> 
        <button type="button" class='edit' id='edit${[i]}' houseID='${myArr[i]._id}'>edit${[i]} </button>
        </li>`)
    }
}




function onDelete(){
    $('#houseList').on('click', '.delete', function() {
        alert('button clicked');
        const idParam =  $(this).attr('houseID');
        console.log(idParam);
       $(this).closest(".listItemHouse").remove();

       $.ajax({
        type: 'DELETE',
        url: 'api/houses/'+ idParam,
        contentType: 'application/json',
        headers:{
            'Authorization': "Bearer" + localStorage.getItem('token')
        },
        success: getHouses(),
        error: function(err){
            console.info('Theres an error with delete');
            console.error(err);
        }
    });
});

};


createAcc();
logIn();
submitHouseInfo();
onDelete();

$(document).ready(function() {
  $('#house-list h1').hide();
    $('#createHouse').hide();
});
