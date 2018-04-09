'use strict';
const myArr = [];


function submitHouseInfo() {
    $('#createHouse').on('submit', function(event) {
        $('#house-list').show();
        event.preventDefault();
        const nameOfHouse = $('#house-name').val();
        const priceOfHouse = $('#house-price').val();
        const locationOfHouse = $('#house-location').val();
        const detailsOfHouse = $('#house-details').val();
        const ratingOfHouse = $('#house-rating').val();
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
            rating: ratingOfHouse,
            bedroom: bedroomsOfHouse,
            bathroom: bathroomsOfHouse,
            garage: garageOfHouse,
            pool: poolOfHouse,
            heating: heatingOfHouse,
            cooling: coolingOfHouse,
            creator: localStorage.getItem('id'),
            image: 'http://res.cloudinary.com/dnejk6l5i/image/upload/v1522773096/house_1.svg'
        }
        console.log('House Details for submitted house: ' + submitHouse);
        // this is where the house is posted
        requestHouse.post('/api/houses', submitHouse, function(data) {});
        // myArr.push(data);
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            window.location = '/houseList/' + localStorage.getItem('id');
        });
        $(this).closest('form').find("input[type=text], textarea").val("");
    });
}

function displayClickedHouse(houseId) {
    console.log('indispalyclickedout');
    console.log(houseId);
    if (localStorage.getItem('token') !== null) {
        window.location = '/house/' + houseId;
    } else {
        window.location = '/share/house/' + houseId;
    }

}


function onDelete() {
    $('#singleHouseInfoDiv').on('click', '.delete', function() {
        const idParam = $(this).attr('houseID');
        requestHouse.delete(idParam, '/api/houses/' + idParam, function() {

        });
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            window.location = '/houseList/' + localStorage.getItem('id');
        });


    });
};

function onEdit() {
    $('#singleHouseInfoDiv').on('click', '.edit', function() {
        $('#singleHouseInfoDiv').hide();
        $('.close-houses-form').hide();
        $('#close-houses-edit-form').show();
        $('#houses-form').show();
        $('.house-submit').hide();
        const edithouseid = $(this).attr('houseid');
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            const houses = data;
            const editHouse = houses.find(x => x._id === edithouseid);
            console.log(editHouse.name, editHouse.price, editHouse.location, editHouse.details, editHouse.garage, editHouse.pool, editHouse.cooling, editHouse.heating, editHouse.bedroom, editHouse.bathroom);
            $('#house-name').val(editHouse.name);
            $('#house-price').val(editHouse.price);
            $('#house-location').val(editHouse.location);
            $('#house-details').val(editHouse.details);
            $('#house-rating').val(editHouse.rating);
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
            const ratingOfHouseEdit = $('#house-rating').val();
            const bathroomsOfHouseEdit = $('#house-bathroom').val();
            const bedroomsOfHouseEdit = $('#house-bedroom').val();
            const garageOfHouseEdit = $('#house-garage').val();
            const poolOfHouseEdit = $('#house-pool').val();
            const coolingOfHouseEdit = $('#house-cooling').val();
            const heatingOfHouseEdit = $('#house-heating').val();
            editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, garageOfHouseEdit, poolOfHouseEdit, coolingOfHouseEdit, heatingOfHouseEdit, bedroomsOfHouseEdit, bathroomsOfHouseEdit, ratingOfHouseEdit, edithouseid);

        })
    });
}


function editHouses(nameOfHouseEdit, priceOfHouseEdit, locationOfHouseEdit, detailsOfHouseEdit, garageOfHouseEdit, poolOfHouseEdit, coolingOfHouseEdit, heatingOfHouseEdit, bedroomsOfHouseEdit, bathroomsOfHouseEdit, ratingOfHouseEdit, edithouseid) {
    $('.house-edit').on('click', function() {

        const nameOfHouseEdit = $('#house-name').val();
        const priceOfHouseEdit = $('#house-price').val();
        const locationOfHouseEdit = $('#house-location').val();
        const detailsOfHouseEdit = $('#house-details').val();
        const ratingOfHouseEdit = $('#house-rating').val();
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
            rating: ratingOfHouseEdit,
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
            window.location = '/house/' + edithouseid;
        });
        // get new house list
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            console.log('Getting houses');
        });

    });
};

function onLoginError() {
    if ($('#login-acc > div').length === 0) {
        $('#login-acc').append('<br> <div style="color:red;">Wrong Username/ Password<div>');
    }
}
function onRegisterError(){
    if ($('#register-acc > div').length === 0) {
        $('#register-acc').append('<br> <div style="color:red;">Username Taken. Please Try again<div>');
    }
}


submitHouseInfo();
onDelete();
onEdit();