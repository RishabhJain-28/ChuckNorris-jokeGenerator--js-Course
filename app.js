document.querySelector('.get-jokes').addEventListener('click',getJokes);

function getJokes(e){
    const input = document.querySelector('input[type="number"]');
    const number = parseInt(input.value);
    const xhr = new XMLHttpRequest();
      
    if(isNaN(number)){
        alertMsg('Number of jokes cannot be null',false);
    }else{
        xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`,true);
        xhr.onload =function (){
            if(this.status===200){
                const response = JSON.parse(this.responseText);
                let output= '';
                
                if(response.type==='success'){
                   response.value.forEach(j => output += `<li>${j.joke}</li>`);
                }else{
                    output +=`<li>Something went wrong</li>`
                }
                document.querySelector('.jokes').innerHTML = output;
            }
        
        }

        xhr.onerror = function(){
            alertMsg('Couldnt connect to API',false);
        }
        xhr.send();
    }
    input.value = '';
    e.preventDefault();
}


function alertMsg(msg,status){
    const col = (status)?'green':'red';
    const errorDiv = document.querySelector('.error');
    errorDiv.appendChild(document.createTextNode(msg));
    errorDiv.appendChild(document.createElement('br'));
    errorDiv.style.color = col;
    setTimeout(function(){
        errorDiv.innerHTML = '';
    },3000); 
}