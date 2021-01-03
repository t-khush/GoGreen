
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
            document.getElementById("high").innerHTML = ""; 
            document.getElementById("median").innerHTML = ""; 
            document.getElementById("low").innerHTML = ""; 
    
    
            document.getElementById("ticker").innerHTML = ""; 
            document.getElementById("high-target").innerHTML = ""; 
            document.getElementById("median-target").innerHTML = ""; 
            document.getElementById("low-target").innerHTML = ""; 
            document.getElementById("buy-sell").innerHTML = "Sorry, we couldn't find this stock"; 
            return; 
        }

        let rec = data[stock][0]["buysell"]; 
        if(rec == "Sell"){
            document.body.style.backgroundColor = "#FF9A8B"; 
            document.body.style.backgroundImage = "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)";
        }
        if(rec == "Hold"){
            document.body.style.backgroundColor = "#FBAB7E"; 
            document.body.style.backgroundImage = "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)";
        }
        if(rec == "Buy"){
            document.body.style.backgroundColor = "#85FFBD";
            document.body.style.backgroundImage = "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)";
        }

        document.getElementById("high").innerHTML = "High: "; 
        document.getElementById("median").innerHTML = "Median: "; 
        document.getElementById("low").innerHTML = "Low: "; 


        document.getElementById("ticker").innerHTML = data[stock][0]["company"]; 
        document.getElementById("high-target").innerHTML = "$"+data[stock][0]["high"]; 
        document.getElementById("median-target").innerHTML = "$"+data[stock][0]["median"]; 
        document.getElementById("low-target").innerHTML = "$"+data[stock][0]["low"]; 

        let analysts = data[stock][0]["analysts"]; 
        document.getElementById("buy-sell").innerHTML = analysts+" Analysts Say: "+ data[stock][0]["buysell"]; 


    })
}
