function loadCommits() {

    // Взимам си данните от HTML и съответно value`тата въведени от потребителя
    let usernameInput = document.getElementById('username');
    let usernameValue = usernameInput.value;
    let repoInput = document.getElementById('repo');
    let repoValue = repoInput.value;

    let currentUlElement = document.getElementById('commits');

    // Взимам си и URL`а
    let url = `https://api.github.com/repos/${usernameValue}/${repoValue}/commits`;

    // Правя заявка към сървъра
    fetch(url)
        .then(response => { // получавам response
            if (response.status !== 200) { // ако е различно от 200 да върне грешка със status`а
                throw new Error(`Error: ${response.status} (Not Found)`);
            }
            return response.json(); // Ако обаче не е да ми върне respons`а в JSON формат.
        })
        .then(result => { // Върнатия response 
            result.forEach(el => { // за всеки елемент от него
                let newLiElement = document.createElement('li'); // създавам ново Li както се иска по условие

                let commitAuthorName = el.commit.author.name; // достъпвам това което се изисква по условие
                let commitMessage = el.commit.message; // -//-//-//
                newLiElement.textContent = `${commitAuthorName}:${commitMessage}`; // Задавам данните на Li`to
                currentUlElement.appendChild(newLiElement); // и го закачам към Ul елемента от HTML`a който ми е даден.
            });
        })
        .catch(error => { // Обработвам евентуална грешка
            let errorMessage = document.createElement('li'); // за целта по условие ми трябва Li така , че го създавам
            errorMessage.textContent = `${error.message}`; // Задавам textContenta да е самата грешка
            currentUlElement.appendChild(errorMessage); // и закачам към Ul от HTML който ми е даден.
        })
}