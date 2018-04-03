var requestHouse = {
    get: function(url, callback){

        $.ajax({
            method: 'GET',
            url: url,
            success: callback,
            error: function(err){
                console.log("Theres an error");
                console.error(err);
            }
        });
    },
    post: function(url, nameHouse, priceHouse, locationHouse, detailsOfHouse, callback){
        $.ajax({
            type: 'POST',
            url: url,
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
    },
    delete: function(url, idParam, callback){
        $.ajax({
            type: 'DELETE',
            url: 'api/houses/'+ idParam,
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
    put: function(url, newNameHouse, newPriceHouse, newLocationHouse, newDetailsHouse, callback){
        $.ajax({
            type: 'PUT',
            url: url,
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
}
