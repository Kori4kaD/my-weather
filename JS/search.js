// Находим форму по ее ID
const form = document.getElementById('searchForm');

// Находим текстовое поле внутри формы по его ID
const textInput = document.getElementById('search');

// Находим изображение кнопки отправки по его ID
const submitButton = document.getElementById('submitButton');
let inputValue='';
// Добавляем обработчик события 'click' на изображение
submitButton.addEventListener('click', function() {
    // Получаем значение текстового поля
   inputValue = textInput.value;

    // Вызываем вашу функцию и передаем значение текстового поля
    loadWeatherCity(inputValue);
});

// Пример функции, которую нужно вызвать при клике на изображение
function myFunction(value) {
    // Используем значение, полученное из текстового поля
    console.log('Значение из текстового поля:', value);
    // Здесь можно добавить любую логику, использующую значение из текстового поля
}

// Добавляем обработчик события 'submit' на форму
searchForm.addEventListener('submit', function(event) {
    // Предотвращаем отправку формы по умолчанию
    event.preventDefault();

    // Получаем значение поля ввода
    const searchValue = textInput.value;

    // Вызываем функцию для обработки значения
    loadWeatherCity(searchValue);
});



