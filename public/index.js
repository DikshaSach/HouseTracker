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
            /*logInFunc(username, password)*/
            window.location = 'signin';
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
            window.location = 'dashboard';

        },
        // if error password is wrong or username is wrong.
        error: function(err){
            console.info('Password is Wrong');
            console.error(err);
            alert('Wrong password');
        }
    });
   
}

function sendAlert(){
    alert('You are logged in now!');
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
        const detailsOfHouse = $('#house-details').val();

        const submitHouse = {
            name: nameOfHouse,
            price: priceOfHouse,
            location: locationOfHouse,
            details: detailsOfHouse
            
        }
        console.log(submitHouse);
        // this is where the house is posted
        postHouses(nameOfHouse, priceOfHouse, locationOfHouse, detailsOfHouse, function(data){
            console.log('posting my house');
                      
           // myArr.push(data);
            
            
            // get all the houses with updated house inside myArr now
            $.ajax({
                method: 'GET',
                url: '/api/houses' + '/' + localStorage.getItem('id'),
                success: response =>{
                    renderHouses(response);
                }
            });
        });
        
    });
}

function postHouses( nameHouse, priceHouse, locationHouse, detailsOfHouse, callback){
    $.ajax({
        type: 'POST',
        url: '/api/houses',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
           name: nameHouse,
           price: priceHouse,
           location: locationHouse,
           details: detailsOfHouse,
           creator: localStorage.getItem('id')
        }),
        headers:{
            'Authorization': "Bearer" + localStorage.getItem('token')
        },
        success: callback,
        error: function(err){
            console.log("Theres an error");
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
            console.log(data);
            myArr = [];
            for(let i=0; i<data.length; i++){
                const getData = {
                    name: data[i].name,
                    price: data[i].price,
                    location: data[i].location,
                    _id: data[i]._id,
                    image: data[i].image
                    
                }
                myArr.push(getData);
            }
           console.log(myArr);
            renderHouses(myArr);
           
        }
    });
}

function renderHouses(myArr){
 
    $('#houseList').empty();
    for(var i=0; i<myArr.length; i++){
        $('#houseList').append(`<li houseID="${myArr[i]._id}" class="listItemHouse">
        <span> This is the house name: ${myArr[i].name} </span>
        <br>
        <span> This is the house price: ${myArr[i].price} </span>
        <br>
        <span> This is the house location: ${myArr[i].location} </span>
        <br
        <span> This is the house details: ${myArr[i].details} <span>
        <br>
        <button type="button" class='delete' id='delete${[i]}' houseID='${myArr[i]._id}'>delete${[i]} </button> 
        <button type="button" class='edit' id='edit${[i]}' houseID='${myArr[i]._id}'>edit${[i]} </button>
        <button type="button" class="upload-bttn">Upload Image</button>
        
       
        </li>`)
    }
    
}




function onDelete(){
    $('#houseList').on('click', '.delete', function() {
        
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


function onEdit(){
    $('#houseList').on('click', '.edit', function() {
       
       const edithouseid = $(this).attr('houseid');
       
       //console.log(localStorage.getItem('id'));
       $.ajax({
        type: 'GET',
        url: '/api/houses' + '/' + localStorage.getItem('id'),
        contentType: 'application/json',
        dataType:'json',
        headers: {
            'Authorization': "Bearer" + localStorage.getItem('token')
        }, 
        success: function (houseData){
            const houses = houseData
            //console.log(houses);
            
            // extract from all the houses the user created the specific one with speciic id
            const editHouse = houses.find(x => x._id === edithouseid);
            console.log(editHouse.name, editHouse.price, editHouse.location);
            $('#house-name').val(editHouse.name);
            $('#house-price').val(editHouse.price);
            $('#house-location').val(editHouse.location);
            $('#house-details').val(editHouse.details);
            const nameOfHouseEdit = $('#house-name').val();
            const priceOfHouseEdit = $('#house-price').val();
            const locationOfHouseEdit = $('#house-location').val();
            const detailsOfHouseEdit = $('#house-details').val();
           
            
            editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, edithouseid);
                   
        }
                });  
                      
    });
}
function editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, edithouseid){
 
    $('.house-edit').on('click', function(){
        const nameOfHouseEdit = $('#house-name').val();
            const priceOfHouseEdit = $('#house-price').val();
            const locationOfHouseEdit = $('#house-location').val();
            const detailsOfHouseEdit = $('#house-details').val();
           
        const editHouse = {
         name : nameOfHouseEdit,
         price : priceOfHouseEdit,
         location : locationOfHouseEdit,
         details : detailsOfHouseEdit,
         _id : edithouseid
     }
  
     putHouses('/api/houses' + '/' + edithouseid, nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit);    
     $.ajax({
        method: 'GET',
        url: '/api/houses' + '/' + localStorage.getItem('id'),
        success: response =>{
            renderHouses(response);
            console.log('House is edited');
            console.log(response);
        },
        error: function(err){
            console.info('Theres an error with updating.');
            console.error(err);
        }
    });
   });
    
    
};




function putHouses(path, newNameHouse, newPriceHouse, newLocationHouse, newDetailsHouse, callback){
    $.ajax({
        type: 'PUT',
        url: path,
        contentType: 'application/json',
        data: JSON.stringify({
            name: newNameHouse,
            price: newPriceHouse,
            location: newLocationHouse,
            details: newDetailsHouse
        }),
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
submitHouseInfo();
onDelete();
onEdit();





$('#adding-houses').on('click', function(){
    $('#houses-form').show();
});

$(document).ready(function() {
$('#houses-form').hide();
$('.register').on('click', function(){
    window.location = 'register';
});
$('#iamtesting').hide();


$('#houseList').on('click', '.upload-bttn', function() {
    $('#iamtesting').show();
});
$('#close').on('click', function(){
    $('#houses-form').hide();
})
});

