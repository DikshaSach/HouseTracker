function onClickCloseHousesForm() {
    $('#close-houses-form').on('click', function() {
        $(this).closest('form').find("input[type=text], textarea").val("");
        window.location = '/houseList/' + localStorage.getItem('id');

    });
}

function onClickHouseLink() {
    $('.houses').on('click', function() {
        window.location.href = '/houseList/' + localStorage.getItem('id');
    })
}

function onClickCloseHousesFormEdit() {
    $('#close-houses-edit-form').on('click', function() {
        $(this).closest('form').find("input[type=text], textarea").val("");
        $('#singleHouseInfoDiv').show();
        $('.close-houses-form').hide();
        $('#close-houses-edit-form').hide();
        $('#houses-form').hide();
        $('#sharelink').show();
        $('#hothouses').show();
    })
}

function onClickAddingHouses() {
    $('#adding-houses').on('click', function() {
        $('#houses-form').show();
        $('#houseList').hide();
        $('#adding-houses').hide();
        $('#sharelink').hide();
        $('.house-edit').hide();
        $('#hothouses').hide();
    });
}

function onClickHotHouses() {
    $('#hothouses').on('click', function() {
        window.location = '/hothouses';
    });
}

function onClickClose() {
    $('#singleHouseInfoDiv').on('click', '.closediv', function() {
            window.location.href = '/houseList/' + $(this).attr('creatorId');
       


    });
}

function onClickCopy() {
    $('.copy-button').on('click', function() {
        $('.copy-button').html('Copied!');
    })
}

function onClickHouse() {
    $('#houseList').on('click', 'li', function() {
        var houseId = $(this).attr('id');
        return displayClickedHouse(houseId);
    });
}

function onclickCloseImageForm() {
    $('.house-upload-form-close').on('click', function() {
        $('#imageFormDiv').hide();
        $('#singleHouseInfoDiv').show();
    });
};

function onClickImageUpload() {
    $('#singleHouseInfoDiv').on('click', '.upload-bttn', function() {
        $('#imageFormDiv').show();
        $('#singleHouseInfoDiv').hide();
        const edithouseid = $(this).attr('houseID');
        requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(data) {
            const houses = data;
            const editHouse = houses.find(x => x._id === edithouseid);
            console.log(editHouse.name);
            $("#house-name-for-image").val(editHouse.name);
            $("#house-name-for-image").prop('disabled', true);
        });
    });

}

onClickCloseHousesFormEdit();
onclickCloseImageForm();
onClickCloseHousesForm();
onClickAddingHouses();
onClickHotHouses();
onClickHouseLink();
onClickClose();
onClickImageUpload();
onClickHouse();
onClickCopy();