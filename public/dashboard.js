$.ajax({
    method: 'GET',
    url: '/api/houses' + '/' + localStorage.getItem('id'),
    success: response =>{
        renderHouses(response);
        
    }
});

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
        

        $('#iamtestingthis').on('submit', function(event){
         
            event.preventDefault();

            const imageLink = imageurl;
            console.log(imageLink);
     
            const nameOfHouse = $('#house-name-test').val();
            console.log(nameOfHouse);
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
                 const editHouse = houses.find(x => x.name === nameOfHouse);
                 //console.log(editHouse._id);
                 const thisIsHouseId = editHouse._id;
                putrequest(thisIsHouseId, imageLink);
                
             }

       });
       
     });    
        };
};
function putrequest(thisIsHouseId, imageLink){
    console.log('in putrequest');
    $.ajax({
        type: 'PUT',
        url: '/api/houses' + '/' + thisIsHouseId,
        contentType: 'application/json',
        data: JSON.stringify({
           image: imageLink,
        }),
        headers: {
            'Authorization': "Bearer" + localStorage.getItem('token')
        },
        success: getHouses(),
       
        
        
        error: function(err){
            console.info('This didnt work upload');
            console.error(err);
        }
    });
}



uploadImage();



