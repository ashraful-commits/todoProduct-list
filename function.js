
// alert function 
function setAlert( msg, type ="danger"){
    return `<h5 class="alert alert-${type}">${msg}</h5>`
}








// ls set function

function setlsdata(key,value){
    let data = [];
// if key exist or not 
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
    }
    // data push 
        data.push(value);
        // set item 
      return  localStorage.setItem(key, JSON.stringify(data))
}








// ls get item function 

function getitem(key){
    if(localStorage.getItem(key)){
        return JSON.parse( localStorage.getItem(key));
    }
  
}