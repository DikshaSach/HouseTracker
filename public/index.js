'use strict';
const myArr = [];

function submitHouseInfo() {
    $('#createHouse').on('submit', function(event) {
        $('#houses-form').hide();
        $('#house-list').show();
        event.preventDefault();
        const nameOfHouse = $('#house-name').val();
        const priceOfHouse = $('#house-price').val();
        const locationOfHouse = $('#house-location').val();
        const detailsOfHouse = $('#house-details').val();
        const bedroomsOfHouse = $('#house-bedroom').val();
        const bathroomsOfHouse = $('#house-bathroom').val();
        const garageOfHouse = $('#house-garage').val();
        const poolOfHouse = $('#house-pool').val();
        const coolingOfHouse = $('#house-cooling').val();
        const heatingOfHouse = $('#house-heating').val();

        const submitHouse = {
            name: nameOfHouse,
            price: priceOfHouse,
            location: locationOfHouse,
            details: detailsOfHouse,
            bedroom: bedroomsOfHouse,
            bathroom: bathroomsOfHouse,
            garage: garageOfHouse,
            pool: poolOfHouse,
            heating: heatingOfHouse,
            cooling: coolingOfHouse,
            creator: localStorage.getItem('id'),
            image: 'http://res.cloudinary.com/dnejk6l5i/image/upload/v1522773096/house_1.svg'
        }
        console.log(submitHouse);
        // this is where the house is posted
        requestHouse.post('/api/houses', submitHouse, function(data) {});
        // myArr.push(data);
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            renderHouses(data);
        });
        $(this).closest('form').find("input[type=text], textarea").val("");
    });


}

function getHouses() {
    const myArr = [];
    requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
        for (let i = 0; i < data.length; i++) {

            const getData = {
                name: data[i].name,
                price: data[i].price,
                location: data[i].location,
                _id: data[i]._id,
                details: data[i].details,
                bedroom: data[i].bedroom,
                bathroom: data[i].bathroom,
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


function renderHouses(myArr) {
    $('#houseList').empty();
    $('#adding-houses').show();
    for (var i = 0; i < myArr.length; i++) {

        $('#houseList').append(`<li houseID="${myArr[i]._id}" id="${myArr[i]._id}" class="listItemHouse">
        <div id=""lihousediv">
        <span id="houseNameSpan">${myArr[i].name} </span>
        <br>
        
        <span id="housePriceSpan">&nbsp;<span id="bulletpoint"> &#8226; &nbsp;</span>${myArr[i].price} </span>
        <br>
        <span id="houseLocationSpan">${myArr[i].location} </span>
        </div>
        
        </li>`)
        if (myArr[i].image !== undefined) {
            $('#houseList > li:last').append(`<div id="imageDiv"><img class="house-image" src="${myArr[i].image}" style="height: 300px;"></div>`)
        };

    }
}


function displayClickedHouse(houseId) {
    $('#singHouseInfo').show();
    $('#singleHouseInfo').empty();
    $('#singleHouseInfoDiv').show();
    $('#house-list').hide();
    $('#adding-houses').hide();
    requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
        const houses = data;
        const editHouse = houses.find(x => x._id === houseId);
        $('#singleHouseInfoDiv').html(`<div id="singleHouseInfo">
         <div id="bttnsDiv">
         <input type="image" src="images/close.png" class="closediv" houseID="${editHouse._id}" id="${editHouse._id}">
         <input type="image" src="images/edit.png" class="edit" houseID="${editHouse._id}" id="${editHouse._id}">
         <input type="image" src="images/delete.png" class="delete" houseID="${editHouse._id}" id="${editHouse._id}">
         <input type="image" src="images/uploadd.png" class="upload-bttn" houseID="${editHouse._id}" id="${editHouse._id}">
        
         </div>
         <div id="single-house-name"  class="detailsOfHouse"><span>${editHouse.name} <span></div>
         <div id="single-house-location"  class="detailsOfHouse">${editHouse.location} </div>
         <br>     
        <br>
        <div id="image-div">
         <img id="single-house-picture" class="detailsOfHouse" src="${editHouse.image}"/>
      </div>
        <div id="single-house-id"  class="detailsOfHouse">ID: ${editHouse._id} </div>
        <div id="single-house-location-body"  class="detailsOfHouse">${editHouse.location} </div>
        <div id="single-house-bedroom-bathroom">${editHouse.bedroom} Bedrooms  &#8226;  ${editHouse.bathroom} Bathrooms </div>
        <br>
        <div id="details-price-container">
        <div id="single-house-details"  class="detailsOfHouse"> <h1>Details</h1><p>${editHouse.details}</p> </div>
   
        <div id="single-house-price" class="detailsOfHouse"> <h1>For Sale</h1><p>${editHouse.price}</p></div>
        </div>
        <br>
        <div id="house-features">
        <h1 id="features">Features: </h1>
        <div id="features-cont">
        <div id="single-house-garage"  class="features detailsOfHouse"><span>Garage: <br><img id="garage-image" src="images/garage.png" ></span>&nbsp;${editHouse.garage} </div>
        <div id="single-house-pool"  class="features detailsOfHouse"><span>Pool: <br> <img id="pool-image" src="images/pool.png"> </span>&nbsp;${editHouse.pool} </div>
        <div id="single-house-cooling"  class="features detailsOfHouse"><span>Cooling:<br> <img id="cooling-image" src="images/cooling.png"> </span>&nbsp;${editHouse.cooling} </div>
        <div id="single-house-heating"  class="features detailsOfHouse"><span>Heating:<br> <img id="heating-image" src="images/heating.png"> </span>&nbsp;${editHouse.heating} </div>
       </div>
        </div>
        `);
    });
}

function onDelete() {
    $('#singleHouseInfoDiv').on('click', '.delete', function() {

        $('#singleHouseInfoDiv').hide();
        const idParam = $(this).attr('houseID');
        console.log(idParam);
        requestHouse.delete(idParam, 'api/houses/' + idParam, function() {
            getHouses();
        });
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            renderHouses(data);
        });
        $('#adding-houses').show();
        $('#house-list').show();

    });
};

function onEdit() {
    $('#singleHouseInfoDiv').on('click', '.edit', function() {
        $('#singleHouseInfoDiv').hide();
        $('#houses-form').show();
        $('.house-edit').show();
        $('.house-submit').hide();
        $('.closediv').hide();
        $('.upload-bttn').hide();
        $('.delete').hide();
        const edithouseid = $(this).attr('houseid');
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            const houses = data;
            const editHouse = houses.find(x => x._id === edithouseid);
            console.log(editHouse.name, editHouse.price, editHouse.location, editHouse.details, editHouse.garage, editHouse.pool, editHouse.cooling, editHouse.heating, editHouse.bedroom, editHouse.bathroom);
            $('#house-name').val(editHouse.name);
            $('#house-price').val(editHouse.price);
            $('#house-location').val(editHouse.location);
            $('#house-details').val(editHouse.details);
            $('#house-bedroom').val(editHouse.bedroom);
            $('#house-bathroom').val(editHouse.bathroom);
            $('#house-garage').val(editHouse.garage);
            $('#house-pool').val(editHouse.pool);
            $('#house-cooling').val(editHouse.cooling);
            $('#house-heating').val(editHouse.heating);
            const nameOfHouseEdit = $('#house-name').val();
            const priceOfHouseEdit = $('#house-price').val();
            const locationOfHouseEdit = $('#house-location').val();
            const detailsOfHouseEdit = $('#house-details').val();
            const bathroomsOfHouseEdit = $('#house-bathroom').val();
            const bedroomsOfHouseEdit = $('#house-bedroom').val();
            const garageOfHouseEdit = $('#house-garage').val();
            const poolOfHouseEdit = $('#house-pool').val();
            const coolingOfHouseEdit = $('#house-cooling').val();
            const heatingOfHouseEdit = $('#house-heating').val();
            editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, garageOfHouseEdit, poolOfHouseEdit, coolingOfHouseEdit, heatingOfHouseEdit, bedroomsOfHouseEdit, bathroomsOfHouseEdit, edithouseid);

        })
    });
}


function editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, garageOfHouseEdit, poolOfHouseEdit, coolingOfHouseEdit, heatingOfHouseEdit, bedroomsOfHouseEdit, bathroomsOfHouseEdit, edithouseid) {
    $('.house-edit').on('click', function() {
        const nameOfHouseEdit = $('#house-name').val();
        const priceOfHouseEdit = $('#house-price').val();
        const locationOfHouseEdit = $('#house-location').val();
        const detailsOfHouseEdit = $('#house-details').val();
        const bedroomsOfHouseEdit = $('#house-bedroom').val();
        const bathroomsOfHouseEdit = $('#house-bathroom').val();
        const garageOfHouseEdit = $('#house-garage').val();
        const poolOfHouseEdit = $('#house-pool').val();
        const coolingOfHouseEdit = $('#house-cooling').val();
        const heatingOfHouseEdit = $('#house-heating').val();

        const editHouse = {
            name: nameOfHouseEdit,
            price: priceOfHouseEdit,
            location: locationOfHouseEdit,
            details: detailsOfHouseEdit,
            bedroom: bedroomsOfHouseEdit,
            bathroom: bathroomsOfHouseEdit,
            garage: garageOfHouseEdit,
            cooling: coolingOfHouseEdit,
            heating: heatingOfHouseEdit,
            pool: poolOfHouseEdit,
            _id: edithouseid
        }
        // update houses

        requestHouse.put('/api/houses' + '/' + edithouseid, editHouse, function() {
            console.log('house has been edited');
            getHouses();
        });
        // get new house list
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            console.log('Getting houses');
            getHouses();

        });
        $('#house-list').show();
        $('#houses-form').hide();
        displayClickedHouse(edithouseid);
        $('#singleHouseInfoDiv').show();
    });
};




submitHouseInfo();
onDelete();
onEdit();


$(document).ready(function() {

    $('#houses-form').hide();

    $('#imageFormDiv').hide();



    $('#close').on('click', function() {
        $('#houses-form').hide();
    })
});