let tableValues = [];
RequestBloodService.getAllBloodRequest().then(res => {
    let data = res.data;
    console.log("response : ", data);
    tableValues = data.rows;
    console.log("table list :", tableValues);
    displayTasks(tableValues);
}).catch(err => {
    let errorMessage = err;
    console.error(errorMessage);
    // console.log("failed");
    toastr.error("Error-" + errorMessage);
});

function displayTasks(tableData) {

    let content = "";
    for (let taskObj of tableData) {
        content =
            content +
            `<tr>
            <td>${taskObj.doc._id}</td>
            <td>${taskObj.doc.name}</td>
            <td>${taskObj.doc.bloodtype}</td>
            <td>${taskObj.doc.phonenumber}</td>
            <td>${taskObj.doc.city}</td>
            <td>${taskObj.doc.status}</td>
                       
            <td>
            <button type='button' onclick="updateStatus('${taskObj.doc._id}','CLOSE')">Close</button>
            </td>

            </tr>`;
        document.querySelector("#bloodRequestTable").innerHTML = content;
        
    }

}


function updateStatus(id, status) {
    //call backend api and update status


    const dbusername = "apikey-v2-zyhv5j7i61imeby1qya0ma2ejrc0fkf9n4e4bl3w5gn";
    const dbpassword = "ec6094ae0714dc7a5ffc50a86924bef3";
    const basicAuth = "Basic " + btoa(dbusername + ":" + dbpassword);

    const url = "https://fffdcced-9a09-44ae-aa2f-e27add7efeb7-bluemix.cloudantnosqldb.appdomain.cloud/bloodbank-bloodrequest/" + id;
    console.log('Update ' + id + ',status=' + status);

    //get by id

    axios.get(url, { headers: { 'Authorization': basicAuth } }).then(res => {
        const applicationObj = res.data;

        applicationObj.status = status;

        //update status api
        const updateURL = url + "?rev=" + applicationObj._rev;
        console.log(updateURL);
        axios.put(updateURL, applicationObj, { headers: { 'Authorization': basicAuth } }).then(result => {
            console.log("Update row", result.data);
            toastr.success(" Status Updated");
            setTimeout(function () {
                window.location.reload();
            });


        });

    }).catch(err => {
        let errorMessage = err.response.data;
        console.error(errorMessage);
        // console.log("failed");
        toastr.error("Error-" + errorMessage);
    });
}




