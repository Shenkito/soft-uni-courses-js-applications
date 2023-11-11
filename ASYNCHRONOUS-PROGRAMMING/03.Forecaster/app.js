function attachEvents() {

    let getWeatherButton = document.getElementById('submit');
    getWeatherButton.addEventListener('click', onClickGetWeather);

    function onClickGetWeather(e) {
        e.preventDefault();

        let locationInput = document.getElementById('location');
        let locationInputValue = locationInput.value.toLowerCase();
        let locationCode = undefined;

        let urlLocation = 'http://localhost:3030/jsonstore/forecaster/locations';

        fetch(urlLocation)
            .then(response => {

                if (response.status !== 200) {
                    throw new Error()
                }

                return response.json();
            })
            .then(data => {

                let locations = data;
                let location = locations.find(loc => loc.name.toLowerCase() === locationInputValue);
                if (location) {
                    locationCode = location.code;

                    let urlCurrConditions = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
                    let urlUpcomingForecast = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`

                    fetch(urlCurrConditions)
                        .then(currConRes => {

                            if (currConRes.status !== 200) {
                                throw new Error();
                            }
                            return currConRes.json()
                        })
                        .then(currentConditions => {
                            let forecastElement = document.getElementById('forecast');
                            forecastElement.style.display = 'block';

                            let currentDiv = document.getElementById('current');

                            let spanConditionSymbol = document.createElement('span');
                            spanConditionSymbol.className = 'condition symbol';
                            spanConditionSymbol.innerHTML = getWeatherSymbol(currentConditions.forecast.condition)

                            let divElement = document.createElement('div');
                            divElement.className = 'forecasts';


                            let spanElement = document.createElement('span');
                            spanElement.className = 'condition';

                            let spanElement1 = document.createElement('span');
                            spanElement1.className = 'forecast-data';
                            spanElement1.textContent = currentConditions.name;

                            let spanElement2 = document.createElement('span');
                            spanElement2.className = 'forecast-data';
                            spanElement2.textContent = `${currentConditions.forecast.low}°/${currentConditions.forecast.high}°`;

                            let spanElement3 = document.createElement('span');
                            spanElement3.className = 'forecast-data';
                            spanElement3.textContent = currentConditions.forecast.condition;

                            spanElement.appendChild(spanElement1);
                            spanElement.appendChild(spanElement2);
                            spanElement.appendChild(spanElement3);

                            divElement.appendChild(spanConditionSymbol);
                            divElement.appendChild(spanElement);

                            currentDiv.appendChild(divElement);


                            fetch(urlUpcomingForecast)
                                .then(upComingForRes => {

                                    if (upComingForRes.status !== 200) {
                                        throw new Error();
                                    }

                                    return upComingForRes.json()
                                })
                                .then(upComingConditions => {

                                    let labelElement = document.querySelector('#upcoming .label');

                                    let newDiv = document.createElement('div');
                                    newDiv.className = 'forecast-info';

                                    let upcomingForecast = upComingConditions.forecast;
                                    for (let i = 0; i < upcomingForecast.length; i++) {
                                        let forecast = upcomingForecast[i];
                                        let newSpan = document.createElement('span');
                                        newSpan.className = 'upcoming';

                                        let newSpan1 = document.createElement('span');
                                        newSpan1.className = 'symbol';
                                        newSpan1.innerHTML = getWeatherSymbol(forecast.condition);

                                        let newSpan2 = document.createElement('span');
                                        newSpan2.className = 'forecast-data';
                                        newSpan2.textContent = `${forecast.low}°/${forecast.high}°`;

                                        let newSpan3 = document.createElement('span');
                                        newSpan3.className = 'forecast-data';
                                        newSpan3.textContent = forecast.condition;

                                        newSpan.appendChild(newSpan1);
                                        newSpan.appendChild(newSpan2);
                                        newSpan.appendChild(newSpan3);

                                        newDiv.appendChild(newSpan);
                                    }

                                    labelElement.appendChild(newDiv);

                                })
                        })
                }
            })
            
    }
}


function getWeatherSymbol(condition) {
    let weatherSymbol = '';
    switch (condition) {
        case 'Sunny':
            weatherSymbol = '&#x2600;'; // ☀
            break;
        case 'Partly sunny':
            weatherSymbol = '&#x26C5;'; // ⛅
            break;
        case 'Overcast':
            weatherSymbol = '&#x2601;'; // ☁
            break;
        case 'Rain':
            weatherSymbol = '&#x2614;'; // ☂
            break;
        default:
            weatherSymbol = '';
    }
    return weatherSymbol;
}

attachEvents();
