
console.log(window.location.href); 
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("button-click").addEventListener("click", handler);
  });

function handler(){
    let stock = document.getElementById("name").value.toUpperCase(); 
    if(stock=="") return; 
    console.log("Hello World"); 
    let api = `https://stock-cnn-api.herokuapp.com/getData?stock=${stock}`

    fetch(api)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        if(data[stock]==null){
            return; 
        }
       
        document.getElementById("ticker").innerHTML = data[stock][0]["company"]; 
        document.getElementById("high-target").innerHTML = "High Target: "+data[stock][0]["high"]; 
        document.getElementById("median-target").innerHTML = "Median Target: "+data[stock][0]["median"]; 
        document.getElementById("buy-sell").innerHTML = "Buy/Sell/Hold: "+data[stock][0]["buysell"]; 

    })
}
