$.ajax({
    method: 'GET',
    url: '/api/houses' + '/' + localStorage.getItem('id'),
    success: response =>{
        renderHouses(response);
    }
});


