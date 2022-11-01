// fa7e307410c6822b368710d120b72ac2
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// 
var clearButton=document.getElementById("clearLS");
var button=document.getElementById("clickable");
var prevSearches=document.getElementById("prevSearch");
var storage={};
pastSearches=JSON.parse(localStorage.getItem("pastSearches"));
if (pastSearches){
    storage=pastSearches;
    for (let cityName in pastSearches){
        console.log(cityName);
        var pastSearchesButton=document.createElement('button');
        pastSearchesButton.setAttribute('id','button'+cityName);
        pastSearchesButton.setAttribute('class','button');
        
        pastSearchesButton.textContent =cityName;
        prevSearches.appendChild(pastSearchesButton);
        
    }
}
// function callApi(input){
//     var requestUrl='https://api.openweathermap.org/data/2.5/forecast?q='+input+'&appid=fa7e307410c6822b368710d120b72ac2'
//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//     })
//         .then(function (response){
            
//             console.log(response)
//         }).catch(err=> console.log(err))};
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
clearButton.addEventListener('click',function(){
    localStorage.clear();
})
button.addEventListener('click',function(){
    var counter;
    if (typeof counter !== 'undefined'){
        removeAllChildNodes(document.querySelector('#card0'))
        removeAllChildNodes(document.querySelector('#card1'))
        removeAllChildNodes(document.querySelector('#card2'))
        removeAllChildNodes(document.querySelector('#card3'))
        removeAllChildNodes(document.querySelector('#card4'))
    }

    var responseText = document.querySelector("#response-text").value;

    console.log(responseText)
    var requestUrl='https://api.openweathermap.org/data/2.5/forecast?q='+responseText+'&units=imperial&appid=fa7e307410c6822b368710d120b72ac2'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
    })
        .then(function (response){
            // if(listElementTemp.textContent !=""){
            //     listElementDate.remove();
            //     listElementWind.remove();
            //     listElementHumid.remove();
            //     listElementIcon.remove();
            // };

            counter=0;
            var data=[];
            for (let i=3;i<36;i +=8){
                
                var date=(response.list[i].dt_txt.split(' ')[0])
                var iconLink=("http://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png")
                var degrees=(response.list[i].main.temp+' degrees')
                var wind=(response.list[i].wind.speed+' mph wind')
                var humidity=(response.list[i].main.humidity+'% humidity')

                var listElementTemp=document.createElement('div');
                var listElementDate=document.createElement('div');
                var listElementWind=document.createElement('div');
                var listElementHumid=document.createElement('div');
                var listElementIcon=document.createElement('img');
                var cardBody=document.createElement('div');

                listElementTemp.setAttribute('id','temp'+counter);
                listElementDate.setAttribute('id','date'+counter);
                listElementWind.setAttribute('id','wind'+counter);
                listElementHumid.setAttribute('id','humid'+counter);
                listElementIcon.setAttribute('id','icon'+counter);
                cardBody.setAttribute('id','cardBody'+counter);

                listElementTemp.setAttribute('class','temp'+counter);
                listElementDate.setAttribute('class','card-header');
                listElementWind.setAttribute('class','wind'+counter);
                listElementHumid.setAttribute('class','humid'+counter);
                listElementIcon.setAttribute('class','icon'+counter);
                cardBody.setAttribute('class','class-body')

                listElementDate.appendChild(document.createTextNode(date));
                listElementIcon.setAttribute('src',iconLink);
                listElementTemp.appendChild(document.createTextNode(degrees));
                listElementWind.appendChild(document.createTextNode(wind));
                listElementHumid.appendChild(document.createTextNode(humidity));

                document.querySelector('#card'+counter).appendChild(listElementDate);
                document.querySelector('#card'+counter).appendChild(cardBody);
                cardBody.appendChild(listElementIcon);
                cardBody.appendChild(listElementTemp);
                cardBody.appendChild(listElementWind);
                cardBody.appendChild(listElementHumid);
                counter +=1;
                data.push({'date':date,"iconLink":iconLink,"temp":degrees,'wind':wind,"humidity":humidity})
            }
            console.log(data)
            storage[responseText]=data
            console.log(storage)
            window.localStorage.setItem('pastSearches', JSON.stringify(storage));


        }).catch(err=> console.log(err))})
