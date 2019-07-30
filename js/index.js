// the page reloads on home button click
function reloadPage(){
    location.reload(true);
}

const url = "http://abiolablog.onlinewebshop.net/wp-json/wp/v2/posts";
const content = document.getElementById('mylist');
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hYmlvbGFibG9nLm9ubGluZXdlYnNob3AubmV0IiwiaWF0IjoxNTY0NDY2NDMxLCJuYmYiOjE1NjQ0NjY0MzEsImV4cCI6MTU2NTA3MTIzMSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMiJ9fX0.kXViPin9vWJlB0Emj687dPNFyP5ai9YvLQibegQ2DW8';

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 5000);
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}
// Shows the spinner
showSpinner();
fetch(url)
    .then(status)
    .then(json)
    .then(function(posts) {   
        for (post in posts) {
            let list = document.createElement('li');
            list.setAttribute("class", "ui-first-child ui-last-child");
            let link = document.createElement('a');
            link.setAttribute("href", "#");
            link.setAttribute("class", "ui-btn");
            let date = document.createElement('p');
            //let strong = document.createElement('strong');
            let title = document.createElement('h2');
            let excerpt = document.createElement('div');
            let time = document.createElement('p'); 
            time.setAttribute("style", "text-align:right");
            time.innerHTML = '<strong>'+ posts[post].date.slice(11,16) +'</strong>';
            date.innerHTML =  '<strong>'+ posts[post].date.slice(0,10) +'</strong>';
            title.textContent = posts[post].title.rendered;
            excerpt.innerHTML = posts[post].excerpt.rendered;
            
            link.appendChild(time);
            link.appendChild(date);
            link.appendChild(title);
            link.appendChild(excerpt);
            list.appendChild(link);
            content.appendChild(list);
        }
                
    }).catch(function(error) {
        console.log('Request failed', error);
    });

    
    // The code below runs after the form is submitted 
    var postForm = $( '#post-form' );
 
    var jsonData = function( form ) {
        let arrData = form.serializeArray(),
            objData = {};
         
        $.each( arrData, function( index, elem ) {
            objData[elem.name] = elem.value;
        });
         
        return JSON.stringify( objData );
    };
     
    postForm.on( 'submit', function( e ) {
        e.preventDefault();
         
        $.ajax({
            url: 'http://abiolablog.onlinewebshop.net/wp-json/wp/v2/posts',
            method: 'POST',
            data: jsonData( postForm ),
            crossDomain: true,
            contentType: 'application/json',
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader( 'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hYmlvbGFibG9nLm9ubGluZXdlYnNob3AubmV0IiwiaWF0IjoxNTY0NDY2NDMxLCJuYmYiOjE1NjQ0NjY0MzEsImV4cCI6MTU2NTA3MTIzMSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMiJ9fX0.kXViPin9vWJlB0Emj687dPNFyP5ai9YvLQibegQ2DW8' );
            },
            success: function( data ) {
                window.location.href = "#home";
                document.getElementById("notification").style.display = "block"; 
                console.log( data );
            },
            error: function( error ) {
                console.log( error );
            }
        });
    });
