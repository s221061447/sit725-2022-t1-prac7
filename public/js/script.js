const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const addProjectToApp = (project) => {
    $.ajax({
        url: '/api/projects',
        data: project,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    })
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();

    addProjectToApp(formData);

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text grey-text text-darken-4">'+item.description+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}

const getProjects = () => {
    $.get('/api/projects', (res) => {
        if (res.statusCode == 200) {
            addCards(res.data);
        } else {
            console.error("Unable to get response from server");
        }
    });
};

let socket = io();
socket.on('number', (msg) => {
    console.log("Current time from server: " + msg);
    $("#heading").html("Welcome to SIT 725 Week 7: " + msg);
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        submitForm();
    });
    getProjects();
    $('.modal').modal();
  });