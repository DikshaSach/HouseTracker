
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
                    isEditing: false
                }
                myArr.push(getData);
            }
            renderHouseLog(myArr);
            enterApp();
        }
    });
}


function putHouses(path, newNameHouse, newPriceHouse, newLocationHouse, callback){
    $.ajax({
        type: 'PUT',
        url: path,
        contentType: 'application/json',
        data: JSON.stringify({
            name: newNameHouse,
            price: newPriceHouse,
            location: newLocationHouse
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

function deleteHouses(path, callback){
    $.ajax({
        type: 'DELETE',
        url: path,
        contentType: 'application/json',
        headers:{
            'Authorization': "Bearer" + localStorage.getItem('token')
        },
        success: callback,
        error: function(err){
            console.info('Theres an error');
            console.error(err);
        }
    });
}