
$("#update").submit(function(event){
    event.preventDefault();
    var unindexed_array = $("#update").serializeArray();
    var data = {}
    
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    console.log(data)


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

  

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href = "http://localhost:3000/admin/users"
    })

})