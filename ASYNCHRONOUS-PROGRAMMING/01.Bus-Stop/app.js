function getInfo() {

    let stopId = document.getElementById('stopId');
    let stopIdValue = stopId.value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdValue}`;
    let stopName = document.getElementById('stopName');
    let busInfo = document.getElementById('buses');
    
    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            stopName.textContent = data.name;

            for (let bus of Object.entries(data.buses)) {
                let busId = bus[0];
                let arrivalTime = bus[1];

                let newLiElement = document.createElement('li');
                newLiElement.textContent = `Bus ${busId} arrives in ${arrivalTime} minutes`
                busInfo.appendChild(newLiElement);
            }
        })
        .catch(error => {
            stopName.textContent = "Error";
        })
        busInfo.textContent = "";
        stopId.value = "";
    }