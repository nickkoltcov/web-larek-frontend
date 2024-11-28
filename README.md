# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Базовые классы 


### Класс Api  
Api нужен для работы с запросами к серверу

#### Методы класса Api:

- handleResponse - он обрабатывает ответ от сервера, если ответ успешный, он возвращает данные 

- get - служит для выполнение Get- запроса, затем обрабатывает ответ через handleresponse

- post- служит для выполнения POST- запроса, затем обрабатывается ответ через handleresponse


### Класс EventEmitter 
EventEmitter реализует систему управления событиями

#### Методы класса EventEmitter:

- on: Метод для подписки на событие. Если событие еще не зарегистрировано, оно добавляется в карту, и затем переданный колбек добавляется в набор подписчиков для этого события.

- off: Метод для отмены подписки на событие. Удаляет указанный колбек из набора подписчиков для данного события. Если набор подписчиков становится пустым, событие удаляется из карты.

- emit: Метод для генерации события. Он проходит по всем зарегистрированным событиям и вызывает колбеки для тех, которые соответствуют заданному названию события. Если событие соответствует шаблону (например, регулярному выражению), все соответствующие колбеки будут вызваны.

- onAll: Метод для подписки на все события. Позволяет слушать все события, используя специальное название "*".

- offAll: Метод для сброса всех обработчиков событий. Он очищает карту _events, удаляя все подписки.

- trigger: Метод, который создает колбек, генерирующий событие при вызове. Этот колбек объединяет переданные данные с контекстом и вызывает метод emit.


##  Model классы 


### Класс ApiRequest 
Наследует класс api и нужен для получения и передачи данных на сервер 

#### Методы класса ApiRequest:

- getproduct - нужен для получения массива товаров с сервера 

- postOrder - нужен для отправки данных о выполненным заказом 


### Класс Cart
Cart работает с данными от пользователя в корзине

#### Методы класса Cart: 

- getNumberbItem - получаем количество продуктов в корзине 
 
- totalSum - считает и выводит общую цену всех продуктов 

- addProductCart - добавления продукт в корзину 

- deleteProductCart - удаляет продукт из корзины 

### Класс Form
Form  работает с данными от пользователя в заполнение формы данных

#### Методы класса Form:

- getPaymentMethod - получает способ оплаты 

- getDataUser - получает адрес пользователя, номер телефона и электронную почту

- validForm - проверяет что поля заполнены, если поля не заполнены, кнопка(далее/отправить) будет не активна  


##  View классы

### Класс CardView
CardView выполняет отображения карточек на странице 

#### Методы класса CardView:

- renderСardList - отобразит карточки продуктов 


### Класс СardPrevieView
CardPreviewView выполняет детальное  отображения выбранного продукта 

#### Методы класса СardPrevieView:

- setCategory - отображает  категорию продукта 

- setdescription -отображает названия продукта и подробное описание 

- setImg - отображает  картину продукта

- setPrice - отображает цену продукта 


### Класс CartView 
CartView отображает корзину с товарами и конечную цену за все товары 

#### Мктоды класса CartView:

- productView - отображает добавленые товары в корзине и их цену 

- totalView - отображает итогувую сумму к оплате 


### Класс FormView
FormView отображает поля заполненые пользователем 

#### Методы FormView:

- userinfo - отображает способ оплаты, адрес доставки, номер телефона, электронная почта


### Класс PopupView
PopupView  отвечает за отображения модальных окон 

#### Методы  PopupView:

- open - модальное окно открыто

- close - модальное окно закрывает 

- render - отображает модальное окно 


## UML - схема 

![UML - схема](/src/images/UML.png)
