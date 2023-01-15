// Задание 4

// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

// При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.


// function useRequest() {
//     const value = document.querySelector('input').value;
//     const myUrl = 'https://picsum.photos/200/300';
    
//     let xhttp = new XMLHttpRequest();
//     xhttp.open('GET', myUrl, true);

//     xhttp.onload = function() {
//         if (value < 100 && value > 300){
//             console.log('Одно из чисел вне диапазона от 100 до 300')
//         } 
//         else {
//             const onloadBackResponse = JSON.parse(xhttp.response);
//             if (callback) {
//                 callback(onloadBackResponse);
//             }
//         }
//     }
// }


const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
    const width = inputWidth.value;
    const height = inputHeight.value;

    if ((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))) {
        write("Одно из чисел вне диапазона от 100 до 300.");
        return;
    }

    write("Загружаю фото...");

    fetch(`https://picsum.photos/${width}/${height}`)
        .then((response) => response.url)
        .then((result) => {
            loadPhoto(result);
            write("Фото загружено.");
        })
        .catch((reason) => {
            write("Ошибка: " + reason);
        });
}

function write(text) {
    outputSpan.innerHTML = text;
}

function loadPhoto(photoUrl) {
    const cardBlock =   `<img
                          src="${photoUrl}"
                          style="margin-right: 30px"
                        />`;

    photosContainer.innerHTML = cardBlock;
}