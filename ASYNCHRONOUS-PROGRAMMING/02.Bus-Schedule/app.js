function solve() {

    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');
    let infoBox = document.querySelector('.info');

    let stop = {
        next: 'depot',
    };

    function depart() {

        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        fetch(url) 
            .then(response => {
                if (response.status !== 200) {
                    throw new Error();
                }
                return response.json();
            })
            .then(data => {
                stop = data;
                infoBox.textContent = `Next stop ${data.name}`;
                departButton.disabled = true;
                arriveButton.disabled = false;
            })
            .catch(error => {
                infoBox.textContent = error;
                departButton.disabled = true;
                arriveButton.disabled = true;
            })
    }

    function arrive() {

        arriveButton.disabled = true;
        departButton.disabled = false;
        infoBox.textContent = `Arriving at ${stop.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();