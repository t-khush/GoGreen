/*chrome.tabs.onUpdated.addListener(function(tabs){
    
    let rh = "robinhood.com";
    let link =  tabs[0].url;
    console.log(link);
    let stock = "";
    if(link.includes(rh)) {
        link_arr = link.split("/");
        stock = link_arr[link_arr.length-1];
        console.log(stock);
    }
    else {
        console.log("no stock found!");
    }
});*/

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    // do your thing    
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;
        if(url.includes("robinhood.com/stocks/")){
            let urlSplit = url.split("/"); 
            let stock = urlSplit[urlSplit.length -1]; 
            
            chrome.storage.sync.set({ 'stock': stock });
            let api = `https://stock-cnn-api.herokuapp.com/getData?stock=${stock}`
            fetch(api); 
        }
        else{
            chrome.storage.sync.set({ 'stock': null });
        }
      });
});
