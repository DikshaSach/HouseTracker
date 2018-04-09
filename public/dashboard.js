/*
$.ajax({
    method: 'GET',
    url: '/api/houses' + '/' + localStorage.getItem('id'),
    success: response =>{   
    }
});
*/

function uploadImage(){
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnejk6l5i/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'hefhvs9u';
    var imgFront = document.getElementById('upload');
    
    imgFront.addEventListener('change' , function(event){
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function(res){
    const imageurl = res.data.secure_url;
    imagesUrl(imageurl);
    
    }).catch(function(err){
        console.info('this didnt work');
        console.log(err);
    })
    
    });
   const imageArr = [];

    function imagesUrl(imageurl){
        $('#imageForm').on('submit', function(event){
            event.preventDefault();
            $('#imageFormDiv').hide();

            const imageLink = imageurl;
            console.log(imageLink);
     
            const nameOfHouse = $('#house-name-for-image').val();
            console.log(nameOfHouse);
            requestHouse.get('/api/houses' + '/' + localStorage.getItem('id'), function(houseData){
                const houses = houseData
                
                // extract from all the houses the user created the specific one with speciic id
                const editHouse = houses.find(x => x.name === nameOfHouse);
                //console.log(editHouse._id);
                const thisIsHouseId = editHouse._id;
               putrequest(thisIsHouseId, imageLink);
            })
     });    
        };
};

function putrequest(thisIsHouseId, imageLink){
    console.log('in putrequest');
    const imageObj = {image: imageLink };
    requestHouse.put('/api/houses' + '/' + thisIsHouseId, imageObj, function(){
     
        displayClickedHouse(thisIsHouseId);
    });
    
  
    
    $('#singleHouseInfoDiv').show();
}



uploadImage();



