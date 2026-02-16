# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/Model/ - папка с моделими 
- src/components/View - папка с классами отображения 

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами


## Демо

GitHub Pages: https://nickkoltcov.github.io/web-larek-frontend/

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

## Архитиктура приложения разработана на парагдигме Model-View-Presenter(MVP), она разделяет код на три слоя:

- Слой MOdel - Нужен для хранения данных и их изменения 

- Слой  View -  Нужен для отображения данных на странице 

- Слой  Presenter - Нужен за связь между слоем Model и View 

- В приложении так же будет реализовано событийно-ориентированный подход. 


## Базовые классы 


### Класс Api нужен для работы с запросами к серверу

#### Методы класса Api:

- handleResponse - он обрабатывает ответ от сервера, если ответ успешный, он возвращает данные 

- get - служит для выполнение Get- запроса, затем обрабатывает ответ через handleresponse

- post- служит для выполнения POST- запроса, затем обрабатывается ответ через handleresponse


### Класс EventEmitter реализует систему управления событиями и используется в presenter 

#### Методы класса EventEmitter:

- on: Метод для подписки на событие. Если событие еще не зарегистрировано, оно добавляется в карту, и затем переданный колбек добавляется в набор подписчиков для этого события.

- emit: Метод для генерации события. Он проходит по всем зарегистрированным событиям и вызывает колбеки для тех, которые соответствуют заданному названию события. Если событие соответствует шаблону (например, регулярному выражению), все соответствующие колбеки будут вызваны.


### Класс Component является абстрактным классом, в котором реализованны базовые элементы 

- constructor(container: HTMLElement) - принимает HTML - элемент

#### Метоты:

- toggleClass - Переключить класс

- setText - Установить текстовое содержимое

- setImage - Установить изображение с алтернативным текстом

- render - Возвращает корневой DOM-элемент


### Класс ApiRequest наследуется от класса api, взаимодействует с сервером 

- constructor(cdn: string, baseUrl: string, options?: RequestInit)  принимает базовый URL CDN для добавления к изображениям продуктов,базовый URL API

#### Поля:

cdn: string - хранит URL-адрес

#### Метоты:

-  getProduct(): Promise<IProduct[]> - получает список продуктов с сервера

- orderPost(order: IOrder): Promise<IOrderResult> - отправляет данные заказа на сервер


### Класс CardBase наследуется от базового абстракного класса Component, является базовым классом для карточки, в котором есть общий функцианал для всех наследников 

constructor(container:HTMLElement) - принимает HTML - элемент

#### Поля:

- cardTitle: HTMLElement - названия продукта

- cardPrice: HTMLElement - цена товара

- cardId: string - id карточки 

#### Методы:

- set title(value:string) - устанавливает название карточки

- set price - устанавливаем цену

- set id - устанавливаем id продукта


##  Слой  Model 


### класс DataCardsProduct хранит данные продуктов и работает с ними.

- constructor(event: IEvents) - принимает инстант брокера событий.

#### Поля: 

- productCards: IProduct[] - хранит массив всех продуктов 

- preview: IProduct - выбраный продукт для подробного осмотра 


#### Методы:
 
- setProducts(productCards: IProduct[]) - сохраняет массив продуктов с сервера 

- getproducts(): IProduct[] - возвращает массив продуктов 

- setPreview(item: IProduct) -  устанавливает данные выбраной карточки продукта 


### Класс CartModel работает и хранит  выбранный пользователем товар в корзине продуктов 

#### Поля:

- cartCatalog: IProduct[] ; - массив товаров выбранных пользователем 

- constructor(event: IEvents) - принимает инстант брокера событий.

#### Методы класса CartModel: 

- setProduct(item:IProduct) - сохраняет выбраный продукт в массив  

- getProductsCart(): IProduct[] - получаем массив выбранных продуктов 

- deleteProductCart(item:IProduct) - удаляем выбранный продукт по id
 
- totalPrice(): number - считает  общую цену всех продуктов 

- getItems() - получаем id продуктов в корзине 

- inBasket(item: IProduct): boolean - проверяем находится ли товар в козине 

- clearCart() - очищает корзину 


### Класс FormModel получает данные и проверяет их 

- constructor(event: IEvents ) - принимает инстант брокера событий.

#### Поля:

- order: IOrderForm - объект данных со способ оплаты, адресом доставки, телефоном и емейлом

- formErrors: FormErrors : объект с ошибками форм.

#### Методы класса FormModel:

- setContactField(field: keyof IContactForm, value: string) - устанавливает значение и запускает валидацию 

- validateContact() - проверяет контактные данные на корректность

- setOrderField(field: keyof IPayForm, value: string) - устанавливает значение и запускает валидацию 

- setPaymethod - устанавливает способ оплаты, после обновления отправляет событие 

для уведомления других компонентов об изминении 

- validateOrder() - проверяет данные заказа на корректность

- clearForm() - очищает форму 


## Слой  View 

### Класс Page наследуется от базового абстракного класса Component, отображает каталог товаров на странице и счетчик количество товаров в корзине 

- constructor(container: HTMLElement, evenst:IEvents) - принимает HTML-элемент  и брокер событие

#### Поля:

- productContener: HTMLElement - контейнер для карточек 

- elementbasketCounter: HTMLElement - счетчик товаров в корзине 

- cartButton: HTMLButtonElement - кнопка корзины

- pege: HTMLElement - обертка страницы 

#### Методы:

- set productList(products: HTMLElement[]) - устанавливаем содержания галереи продуктов

- set basketCounter - устанавливаем содержания галереи продуктов 

- set locked - управляем блокировкой страницы при открытом модальном окне 

### Класс Card наследуется от базового класса CardBase, отображает карточку товара на странице 

- constructor(container:HTMLElement, actions?: Actions) - принимает Темплейт элемент и устанавливает обработчик события на контейнеры 

#### Поля:

- cardCategory: HTMLElement - категория продукта 

- cardImg: HTMLElement - картинка продукта 
 


#### Методы:

- set category(value:string) - устанавливает категорию карточки 

- set image(value:string) - устанавливаем картинку 



### Класс CardPreview наследует класс Card и выполняет отображения подробного описания карточки, и позволяет добавлять товар в корзину 

- constructor(container: HTMLElement,actions?: Actions) - принимает Темплейт элемент и устанавливает обработчик события на кнопки 

#### Поля: 

- cardDescription: HTMLElement - подробное описания карточки 

- cardButton: HTMLButtonElement - кнопка добавления товара в корзину 

#### Методы: 

- set description(value: string) - // устанавливаем подробное описания продукта

- updateButtonState(productBasket: boolean, price: number): void - // обновления состояния кнопки и ее текста 


### Класс CartProduct наследуется от базового класса CardBase и выполняет отображения товара в корзине 

- constructor(container:HTMLElement, actions?: Actions) - принимает Темплейт элемент и устанавливает обработчик события на кнопки 

#### Поля:

- cartIndex: HTMLElement - порядковый номер продукта в корзине 

- deleteButton: HTMLButtonElement; - кнопка удаления 

#### Методы: 

- set index(value:string) - устанавливаем порядковый номер в корзине


### Класс Modal  наследуется от базового абстракного класса Component  отображает модальное окно, его можно закрывать и открывать с заданныи содержимым 

- constructor(container: HTMLElement, protected events:IEvents) - принимает HTML-элемент и брокер событие

#### Поля: 

- closeButton: HTMLButtonElement - кнопка закрытия модального окна 

- contentElement: HTMLElement - контейнер в которое будет устанавливаться содержимое  

#### Методы: 

- set content (value: HTMLElement) - устанавливаем содержания модального окна 

- open() - открытие модального окна 

- close() - закрытия модального окна 

- render(data: IModal): HTMLElement - для рендера модального окна 


### Класс CartView  наследуется от базового абстракного класса Component отображает список товара в корзине и общую цену продуктов 

- constructor(container:HTMLElement, protected events:IEvents) - принимает Темплейт элемент и брокер событие

#### Поля: 

- cartList:HTMLElement; - список товаров в корзине  

- totalPrice:HTMLElement; - общая цена продуктов  

- designButton: HTMLButtonElement; - кнопка для оформления заказа  

#### Методы:

- set cartProducts(cartProducts: HTMLElement[]) -  устанавливаем товар в лист корзины или если она пустая устанавливаем текст что корзина пуста и блокируем кнопку если цена корзины = 0 

- set total (value:number) - устанавливаем общую цену 


### Класс Form наследуется от  базового абстракного класса Component, управляет формами,облегчает обработку ввода данных,управление состоянием формы, отображает ошибки валидации 


- constructor(protected container: HTMLFormElement, protected events: IEvents) принимает HTMLFormElement и брокер событие


#### Поля: 

- _submit: HTMLButtonElement : кнопка отправки формы

- _errors: HTMLElement : Элемент для отображения ошибок формы

#### Методы:

- onInputChange(field: keyof T, value: string): void - обрабатывает изменения ввода и генерирует событие с именем поля и его значением

- set valid(value: boolean) - устанавливает состояние валидности формы

- set errors(value: string) - устанавливает сообщение об ошибке

- render(state: Partial<T> & IFormState) - Отображает форму с заданным состоянием. Состояние может включать валидный статус, сообщения об ошибках и значения полей ввода.

### Класс FormOrder - наследуется от класса Form, отображает форму заказа с выбором способа оплаты и указанием адресса 

- constructor(container: HTMLFormElement, events:IEvents) - принимает Темплейт элемент и брокер событие

#### Поля: 

- payCard: HTMLButtonElement - кнопка оплата картой 

- payCash: HTMLButtonElement - кнопка оплата наличкой 


#### Методы:

- set paymentMethod(value:string) - отвечает за обновление классов кнопок в зависимости от выбранного метода оплаты 

- set address(value: string) - устанавливает значение в поля ввода для адреса 


### Класс FormContacts наследуется от класса Form, отображает форму заказа для указания пользователем его контактных данных 

- constructor(container: HTMLFormElement, events: IEvents) - принимает Темплат элемент и брокер событие


#### Методы:

- set phone(value: string) - устанавливает значение в поля ввода для номера телефона 

- set email(value: string) - устанавливает значение в поля ввода для емеила 

### Класс Success отображает сообщение об успешном оформлении заказа 

- constructor(container:HTMLElement, actions: ISuccessActions) - принимает Темплейт элемент и устанавливает обработчик события

#### Поля: 

- closeButton: HTMLButtonElement - кнопка закрытия 

- total:HTMLElement - сколько списано синапсов 

#### Методы:

- set totalprice(value: string) - устанавливает сколько было списанно синапсов 


## Слой Presenter 


#### Взаимоействие компонентов
Код, описывающий взаимодействие представления и данных между собойнаходится в файле index.ts, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в index.ts.\
В index.ts сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.\
