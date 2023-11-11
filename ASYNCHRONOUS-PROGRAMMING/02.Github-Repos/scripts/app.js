function loadRepos() {
	// Взимане на елементите от HTML
	let input = document.getElementById("username");
	let ulElement = document.getElementById("repos");

	// Взимане на въведената стойност от потребителя
	let username = input.value;

	// Формиране на URL, като потребителското име се променя динамично
	let url = `https://api.github.com/users/${username}/repos`;

	// Изпращане на заявка към URL и получаване на отговор (т.е response)
	fetch(url)
		.then(response => {
			if (response.status !== 200) { // Ако статуса на заявката е различен от 200
				throw new Error(`${response.status} ${response.statusText}`);
			}
			return response.json(); // ако ли не е то тогава го превърни в json
		})
		.then(result => { // result ми връща масив от обекти
			result.forEach(element => { // За всеки елемент в резултата
				let name = element.full_name; // си взимам каквото ми трябва по условие (т.е в случая full_name)
				let htmlUrl = element.html_url; // и html_url

				// Създаване на елементите както се изисква по условие
				let newLiElement = document.createElement("li");
				let newAElement = document.createElement("a");

				// Настройване на текста и връзката на хипервръзката
				newAElement.textContent = name; // на А хиперлинка закачам текст контент който е полученото име на репоситорито
				newAElement.href = htmlUrl; // на А хиперлинка закачам дестинация към която хипер-линка ще ни отведе при натискане върху него (т.е към самото репоситори)

				// Добавяне на хипервръзката към списъка
				newLiElement.appendChild(newAElement); // закачам хипер-линка към Li елемента
				ulElement.appendChild(newLiElement); // след това закачам Li елемента към Ul елемнта който взех най-горе в кода
			});
		})
		.catch(error => {
			// Обработка на грешка при заявката
			let errorMessage = document.createElement("li"); // създава ново Li
			errorMessage.textContent = `${error.message}`; 	// текст контента е самата грешка в случая 404
			ulElement.appendChild(errorMessage); //и към елемента който си взех най отгоре закачам грешката.
		});
}

