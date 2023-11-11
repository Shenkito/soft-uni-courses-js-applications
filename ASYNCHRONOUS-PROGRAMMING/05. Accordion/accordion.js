function solution() {

    let titlesUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    let mainElement = document.getElementById('main');
    let id = undefined;

    fetch(titlesUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(title => {

                id = title._id;

                let buttonElement = document.createElement('button');
                buttonElement.className = 'button';
                buttonElement.id = title._id;
                buttonElement.textContent = 'More';

                let divAccordion = document.createElement('div');
                divAccordion.className = 'accordion';

                let divHead = document.createElement('div');
                divHead.className = 'head';

                let spanElement = document.createElement('span');
                spanElement.textContent = title.title;

                let divElement = document.createElement('div');
                divElement.className = 'extra';

                let pElement = document.createElement('p');

                divElement.appendChild(pElement);
                divHead.appendChild(buttonElement);
                divHead.appendChild(spanElement);
                divAccordion.appendChild(divHead);
                divAccordion.appendChild(divElement);
                mainElement.appendChild(divAccordion);

                buttonElement.addEventListener('click', (e) => {
                    let button = e.currentTarget;
                    let id = button.id;

                    let contentUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

                    fetch(contentUrl)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {

                            if (button.textContent === 'More') {

                                pElement.textContent = data.content;
                                divElement.style.display = 'block';
                                button.textContent = 'Less';
                            } else if (button.textContent === 'Less') {
                                divElement.style.display = 'none';
                                button.textContent = 'More';
                            }
                        })
                });
            })

        })
}

solution()


