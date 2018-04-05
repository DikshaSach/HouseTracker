
function onClickCloseHousesForm(){
    $('.close-houses-form').on('click', function(){
        $(this).closest('form').find("input[type=text], textarea").val("");
        $('#houses-form').hide();
        $('.closediv').show();
        $('.upload-bttn').show();
        $('.delete').show();
        $('#singleHouseInfoDiv').hide();
        $('#dashboard').show();
        $('#house-list').show();
        $('#adding-houses').show();
    });
}
function onClickAddingHouses(){
    $('#adding-houses').on('click', function(){
        $('#houses-form').show();
       $('.house-edit').hide();
       $('#dashboard').hide();
       $('#house-list').hide();
       $('#adding-houses').hide();
      
    
    
    });
}
function onClickClose(){
    $('#singleHouseInfoDiv').on('click', '.closediv', function(){
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            renderHouses(data);
            console.log('Rendering new Data');
            $('#house-list').show();
            $('#singleHouseInfoDiv').hide();
        });
       
        $('#adding-houses').show();
    });
}

function onClickHouse(){  
    $('#houseList').on('click', 'li', function(){
        var houseId = $(this).attr('id');  
        return displayClickedHouse(houseId); 
       
    });
}
function onclickCloseImageForm(){
    $('.house-upload-form-close').on('click', function(){
        $('#imageFormDiv').hide();
        $('.closediv').show();
        $('.edit').show();
        $('.delete').show();
        $('#singleHouseInfoDiv').show();
    });
};
function onClickImageUpload(){
    $('#singleHouseInfoDiv').on('click', '.upload-bttn', function() {
        $('#imageFormDiv').show();
        $('.closediv').hide();
        $('.upload-bttn').show();
        $('.delete').hide();
        $('.edit').hide();
        $('#singleHouseInfoDiv').hide();
        const edithouseid = $(this).attr('houseID');
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data){
            const houses = data;
            const editHouse = houses.find(x => x._id === edithouseid);
            document.getElementById("house-name").value = editHouse.name;
            $("#house-name").prop('disabled', true);

        });
    });

}


onclickCloseImageForm();
onClickCloseHousesForm();
onClickAddingHouses();
onClickClose();
onClickImageUpload();
onClickHouse();