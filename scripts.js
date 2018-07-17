

function checkEmail(){
    // read email by querySelector API
    let email = document.querySelector("#id_email").value;
    
    // validate email
    if (!email || email === ""){
        alert("Blank Value supplied");
        return;
    }

    // query URL
    let queryURL = "http://localhost:3000/"+email;
    
    // make AJAX request using fetch API
    fetch(queryURL)
        .then(function (response) {
            //return response;
            return response.json();
        })
        .then(function (result) {
            displayEmailResult(result);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

function displayEmailResult(result){

$('#emailModal').modal('hide');

let msgDiv = document.querySelector("#message");

let Div = document.querySelector("#result");

if(result.message) {
    
    Div.innerHTML = "";

    msgDiv.innerHTML = ` <div class = "alert alert-success alert-dismissible" role="alert">\
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                         <strong> Good News !</strong> Your email address is never hacked.\
    </div>`;

}
else {
    msgDiv.innerHTML = ` <div class = "alert alert-danger alert-dismissible" role="alert">\
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong> Hacked !</strong> Better check yourself, you\'re not looking too good.\
</div>`;

  Div.innerHTMl = "";

  var i =0;

  result.forEach(function(currentResult){

     let hackedHTMLDiv = `<div ="jumbotron" id="id_${i}">\
                             <div class ="row">
                                 <div class="col-xs-12 col-sm-4">
                                 <h5> ${currentResult.Title}: <small><a target ="_blank"  href="${currentResult.Domain}">website</a></small></h5>
                                  <h5> Breach date :<small>${currentResult.BreachDate}   </small>   </h5>
                                  <h5> Added : <small> ${currentResult.AddedDate}  </small>   </h5>
                                   <h5> Modified : <small>${currentResult.ModifiedDate}  </small>   </h5>
                                 </div>
                                  <div class =" col-xs-12 col-sm-8">
                                  <h5>${currentResult.Name}</h5>
                                  <p> ${currentResult.Description}</P>  
                                  </div>
                                   <div class ="col-xs-12" id ="data_id_${i}">
                                   <h5>compromised data</h5>
                                   </div>

                             </div>
     
                        </div>`;

            $(`#result`).append(hackedHTMLDiv);

            currentResult.DataClasses.forEach(function(currentDateclass){
            $(`#data_id_${i}`).append(`<span class="label label-danger danger-label">${currentDateclass}</span>`);

            
              });

             i++;

         });
     console.log(result);

     }

}