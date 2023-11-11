function loadRepos() {

   // gettin the url
   let url = 'https://api.github.com/users/testnakov/repos';

   // creating an istance of XMLHttpRequest
   let httpRequest = new XMLHttpRequest();

   // събитието "readystatechange" се изпълнява всеки път , когато състоянието на заявката се промени.
   httpRequest.addEventListener('readystatechange', function () {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) { // Ако състоянието е 4 (заявката е завършена) и статуса е 200 (заявкате е успещна)
         document.getElementById('res').textContent = httpRequest.responseText // Се взима отговорът на заявката т.е съдържанието на репозиториите и се закача на елемента с ID 'res' в HTML документа.
      }
   });

   httpRequest.open("GET", url); // Отваря се заявката като ползваме метода "GET" и се подава URL адресът.
   httpRequest.send(); // След като заявката е готова, тя се изпраща към сървара с метода "send()"
   console.log(httpRequest.responseText); // Извежда се отговорът на заявката в конзолата , като се използва свойството "responseText" на обекта httpRequest.
}