// Задание 3

// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».

// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

// Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.

// После получения данных вывести ниже картинки на экран.

//const reUrl = 'https://picsum.photos/v2/list?limit=10';

function useRequest(callback) {
    const value = document.querySelector('input').value;
    //тут ссылка формируется и к конце вставляем значение из инпута, которое выше получили и положили в константу value
    const photoUrl = 'https://picsum.photos/v2/list?limit=10' + value;
    
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', photoUrl, true);
  
    xhttp.onload =  function() {
      if (value > 10 && value < 1){
        console.log('Число вне диапазона от 1 до 10');
      } else {
        const onloadResult = JSON.parse(xhttp.response);
        if (callback) {
          //передаем в нашу колбэк функцию результат запроса. Колбэк фуункция initImg, но названа она была выше callback
          callback(onloadResult);
        }
      }
    }
    xhttp.send();
}
  
  function initImg(apiData) {
    // вот мы в колбэк функции передав в неё данные из запроса и дали им название apiData
    const resultNode = document.querySelector('.result');
    let cards = ''
    // перебираем данные и кладем в переменную cards верстку cardBlock
    apiData.forEach(item => {
      const cardBlock = `
          <div class = 'card'>
            <img src='${item.download_url}' class = 'card-image'/>
            <p>${item.author}</p>
          </div>
        `;
        cards = cards + cardBlock;    
    });
    //всю верстку cards мы кладем в верстку resultNode
    resultNode.innerHTML = cards;
  }
  
  // Ищем кнопку, по нажатии на которую будет запрос
  const request = document.querySelector('.request');
  request.addEventListener('click', () => {
    useRequest(initImg);
  });