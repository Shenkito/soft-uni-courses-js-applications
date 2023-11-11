function lockedProfile() {
    let mainElement = document.getElementById('main');
    let inputElements = document.querySelectorAll('input');
    let profileElement = document.querySelector('.profile');
    let hiddenDivElement = document.querySelector('.user1Username');

    hiddenDivElement.style.display = 'none';
    mainElement.innerHTML = '';

    let url = 'http://localhost:3030/jsonstore/advanced/profiles';

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const [radioLock, radioUnclock, userName, _email, _age] = Array.from(inputElements);
            Object.values(data).forEach(profile => {
                let { _id, age, email, username } = profile;
                userName.value = profile.username;
                _email.value = profile.email;
                _age.value = profile.age;
                radioLock.checked = true;

                const currentDivElement = profileElement.cloneNode(true);
                currentDivElement.addEventListener('click', showMore);
                mainElement.appendChild(currentDivElement);
            });
        })
}

function showMore(e) {
    if (e.target.tagName === 'BUTTON' && !e.target.parentElement.children[2].checked) {
        const hiddentElement = e.target.parentElement.children[9];

        if (hiddentElement.style.display === 'block') {
            hiddentElement.style.display = 'none';
            e.target.innerText = 'Show more';
        } else {
            hiddentElement.style.display = 'block';
            e.target.innerText = 'Hide it';
        }
    }
}

/*
Функция lockedProfile() има следната функционалност:

Взима референции към HTML елементите с определени идентификатори:

mainElement е елементът с идентификатор 'main'
inputElements е списък от всички елементи input в документа
profileElement е първият елемент с клас 'profile'
hiddenDivElement е първият елемент с клас 'user1Username'
Скрива hiddenDivElement, като задава стил display на 'none'. Това означава, че елементът няма да бъде показван в документа.

Изчиства съдържанието на mainElement, като задава празен низ на свойството innerHTML.

Задава стойност на променливата url с URL адреса 'http://localhost:3030/jsonstore/advanced/profiles'.

Използва функцията fetch() за извличане на данни от уебсървъра на посочения URL адрес.

Връща се Promise обект, който се използва за последваща обработка на данните.
Първоначално, отговорът се обработва като JSON.
След това, се извлича обектът data, който представлява данните в JSON формат.
Извлича стойностите на следните променливи от inputElements:

radioLock - първият input елемент (радио бутон) за заключване на профилите
radioUnclock - вторият input елемент (радио бутон) за отключване на профилите
userName - третият input елемент за въвеждане на потребителско име
_email - четвъртият input елемент за въвеждане на имейл
_age - петият input елемент за въвеждане на възраст
Обхожда всички профили в data и за всеки профил извършва следните действия:

Деструктурира profile обекта, за да извлече _id, age, email и username
Задава стойностите на username, email и age на съответните input елементи
Задава радио бутона radioLock да бъде маркиран като избран (checked)
Клонира profileе и създава нов divелемент с клас 'profile', като клонираprofileElement`
Добавя събитие на кликване (click) на клонирания div елемент, което привежда към функцията showMore
Добавя клонирания div елемент към mainElement
Функцията showMore(e) има следната функционалност:

Проверява дали елементът, върху който е кликнато (e.target), е бутон (BUTTON) и дали радио бутона, намиращ се на същия родителски елемент (профил), не е маркиран като отключен (unchecked).

Ако горните условия са изпълнени, се изпълнява следното действие:

Взима референция към скрития елемент (hiddenDivElement), който се намира на 9-то място сред децата на родителския елемент на бутона.
Проверява текущия стил на скрития елемент. Ако стойността на свойството display е 'block' (т.е. елементът е видим), се променя стилът на скрития елемент на 'none' (т.е. елементът става невидим) и текстът на бутона се променя на 'Show more'.
В противен случай, ако стойността на свойството display на скрития елемент е 'none' (т.е. елементът е невидим), стилът на елементът се променя на 'block' (т.е. елементът става видим) и текстът на бутона се променя на 'Hide it'.
*/