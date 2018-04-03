'use strict';
const myArr =[];

//Creating account
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

    requestRegister.post('api/auth/login', username, password, function(resultData){
        localStorage.setItem('token', resultData.authToken);
        localStorage.setItem('id', resultData.userID);
        console.log(resultData);
        window.location = 'dashboard';
    })
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
        const garageOfHouse = $('#house-garage').val();
        const poolOfHouse = $('#house-pool').val();
        const coolingOfHouse = $('#house-cooling').val();
        const heatingOfHouse = $('#house-heating').val();

        const submitHouse = {
            name: nameOfHouse,
            price: priceOfHouse,
            location: locationOfHouse,
            details: detailsOfHouse,
            garage: garageOfHouse,
            pool: poolOfHouse,
            heating: heatingOfHouse,
            cooling: coolingOfHouse,
            creator: localStorage.getItem('id'),
            image: 'https://static.trulia-cdn.com/images/search/house.svg'
        }
        console.log(submitHouse);
        // this is where the house is posted
        requestHouse.post('/api/houses', submitHouse, function(data){

        });
                      
           // myArr.push(data);
            requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data){
                renderHouses(data);
            });
        });
        

}

function getHouses(){
   const myArr = [];
    requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data){
        for(let i=0; i<data.length; i++){
            
                const getData = {
                    name: data[i].name,
                    price: data[i].price,
                    location: data[i].location,
                    _id: data[i]._id,
                    details: data[i].details,
                    garage: data[i].garage,
                    cooling: data[i].cooling,
                    heating: data[i].heating,
                    pool: data[i].pool,
                    image: data[i].image
            
           
            }
                myArr.push(getData);
                
            }
            
            renderHouses(myArr);
        });
                
    }


function renderHouses(myArr){
    
    $('#houseList').empty();
    for(var i=0; i<myArr.length; i++){
        
        $('#houseList').append(`<li houseID="${myArr[i]._id}" id="${myArr[i]._id}" class="listItemHouse">
        <span> This is the house name: ${myArr[i].name} </span>
        <br>
        <span> This is the house price: ${myArr[i].price} </span>
        <br>
        <span> This is the house location: ${myArr[i].location} </span>
        <br
        </li>`)
        if(myArr[i].image !== undefined){
            $('#houseList > li:last').append(`<img class="house-image" src="${myArr[i].image}">`)
        }
    }   
}

function onClickHouse(){  
$('#houseList').on('click', 'li', function(){
    var houseId = $(this).attr('id');  
    console.log(houseId)
  
    return displayClickedHouse(houseId); 
   
});
}

function displayClickedHouse(houseId){
    $('#singHouseInfo').show();
    $('#singleHouseInfo').empty();
    $('#singleHouseInfoDiv').show();
    requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data){
        const houses = data;
        const editHouse = houses.find(x => x._id === houseId);
        console.log(editHouse._id);
         $('#singleHouseInfoDiv').html(`<div id="singleHouseInfo">
       
         <button type="button" class='edit' houseID="${editHouse._id}" id="${editHouse._id}">Edit</button>
         <button type="button" class="delete" houseID="${editHouse._id}" id="${editHouse._id}">Delete</button>
         <button type="button" class="upload-bttn" houseID="${editHouse._id}">Upload Image</button>
         <button type="button" class='closediv' houseID="${editHouse._id}" id="${editHouse._id}">close</button>
         <div id="single-house-name"  class="detailsOfHouse">House name is ${editHouse.name} </div>
         <div id="single-house-location"  class="detailsOfHouse">${editHouse.location} </div>
         <br>
         
        <br>
        <div id="image-div">
         <img id="single-house-picture" class="detailsOfHouse" src="${editHouse.image}"/>
      </div>
        <span id="single-house-id"  class="detailsOfHouse">House id:${editHouse._id} </span>
        <br>
        <div id="single-house-details"  class="detailsOfHouse"> <p>${editHouse.details}</p> </div>
   
        <div id="single-house-price" class="detailsOfHouse"> <p> For Sale
        <br>
        ${editHouse.price}</p></div>
        <br>
        <div id="single-house-garage"  class="detailsOfHouse">${editHouse.garage} </div>
        <div id="single-house-pool"  class="detailsOfHouse">${editHouse.pool} </div>
        <div id="single-house-cooling"  class="detailsOfHouse">${editHouse.cooling} </div>
        <div id="single-house-heating"  class="detailsOfHouse">${editHouse.heating} </div>
        `);
    });
}




function onDelete(){
    $('#singleHouseInfoDiv').on('click', '.delete', function() { 
        $('#singleHouseInfoDiv').hide();
        const idParam =  $(this).attr('houseID');
        console.log(idParam);
       
        requestHouse.delete(idParam, 'api/houses/' + idParam, function(){
            getHouses();
        });

    });
};


function onEdit(){
    $('#singleHouseInfoDiv').on('click', '.edit', function() {
        $('#houses-form').show();
       $('.house-submit').hide();
       $('#createHouse > h1').html('Edit your house ');
       const edithouseid = $(this).attr('houseid');
       requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data){
        const houses = data;
        const editHouse = houses.find(x => x._id === edithouseid);
        console.log(editHouse.name, editHouse.price, editHouse.location, editHouse.details, editHouse.garage, editHouse.pool, editHouse.cooling, editHouse.heating);
        $('#house-name').val(editHouse.name);
        $('#house-price').val(editHouse.price);
        $('#house-location').val(editHouse.location);
        $('#house-details').val(editHouse.details);
        $('#house-garage').val(editHouse.garage);
        $('#house-pool').val(editHouse.pool);
        $('#house-cooling').val(editHouse.cooling);
        $('#house-heating').val(editHouse.heating);
        const nameOfHouseEdit = $('#house-name').val();
        const priceOfHouseEdit = $('#house-price').val();
        const locationOfHouseEdit = $('#house-location').val();
        const detailsOfHouseEdit = $('#house-details').val();
        const garageOfHouseEdit = $('#house-garage').val();
        const poolOfHouseEdit = $('#house-pool').val();
        const coolingOfHouseEdit = $('#house-cooling').val();
        const heatingOfHouseEdit = $('#house-heating').val();
        editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, garageOfHouseEdit, poolOfHouseEdit,coolingOfHouseEdit, heatingOfHouseEdit, edithouseid);
       
    })                  
    });
}
function onClickImageUpload(){
    $('#singleHouseInfoDiv').on('click', '.upload-bttn', function() {
        $('#imageFormDiv').show();
        const edithouseid = $(this).attr('houseID');
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data){
            const houses = data;
            const editHouse = houses.find(x => x._id === edithouseid);
            document.getElementById("house-name-test").value = editHouse.name;
            $("#house-name-test").prop('disabled', true);

        });
    });

}
function editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, garageOfHouseEdit, poolOfHouseEdit, coolingOfHouseEdit, heatingOfHouseEdit, edithouseid){
   
    $('.house-edit').on('click', function(){
        const nameOfHouseEdit = $('#house-name').val();
            const priceOfHouseEdit = $('#house-price').val();
            const locationOfHouseEdit = $('#house-location').val();
            const detailsOfHouseEdit = $('#house-details').val();
            const garageOfHouseEdit = $('#house-garage').val();
            const poolOfHouseEdit = $('#house-pool').val();
            const coolingOfHouseEdit = $('#house-cooling').val();
            const heatingOfHouseEdit = $('#house-heating').val();
           
        const editHouse = {
         name : nameOfHouseEdit,
         price : priceOfHouseEdit,
         location : locationOfHouseEdit,
         details : detailsOfHouseEdit,
         garage: garageOfHouseEdit,
         cooling: coolingOfHouseEdit,
         heating: heatingOfHouseEdit,
         pool: poolOfHouseEdit,
         _id : edithouseid
     }
  // update houses
    // requestHouse.put('/api/houses' + '/' + edithouseid, nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, function(){
        requestHouse.put('/api/houses' + '/' + edithouseid, editHouse, function(){ 
    console.log('house has been edited');
         getHouses();
     });    
     // get new house list
     requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data){
         console.log('Getting houses');
     });
    $('#houses-form').hide();
   });   
};


// log out and remove id and token from storage
function logOut(){
    $('.logOut').on('click', function(){
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        window.location = '/';
    })
}
function onClickClose(){
    $('#singleHouseInfoDiv').on('click', '.closediv', function(){
 
        $('#singleHouseInfoDiv').hide();
    });
}
onClickClose();
onClickImageUpload();
onClickHouse();
logOut();
createAcc();
logIn();
submitHouseInfo();
onDelete();
onEdit();


$('#adding-houses').on('click', function(){
    $('#houses-form').show();
    $('#createHouse > h1').html('Add House Details');

});

$(document).ready(function() {
    


$('#houses-form').hide();
$('.register').on('click', function(){
    window.location = 'register';
});
$('#imageFormDiv').hide();



$('#close').on('click', function(){
    $('#houses-form').hide();
})
});

