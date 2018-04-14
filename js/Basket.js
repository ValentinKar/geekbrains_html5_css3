/**
 * Класс корзины.
 * 
 * @property {string} idUser - ID пользователя. 
 */
function Basket(idUser) {

    this.id = idUser;

    // this.countGoods = 0; //Общее кол-во товаров
    // this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров
    this.basketJsonAddr = './responses/getBasket.json';
    this.deleteFromBasketAddr = './responses/deleteFromBasket.json';
    this.addToBasket = './responses/addToBasket.json';
    this.catalogData = './responses/catalogData.json';
    this.getBasket(); //Получаем уже добавленные товары в корзину
}

/** Метод отображает корзину пользователя на страницах
 *
 * @param $root 
 * @return Значение типа String (не нужен, так как его нет в методе)
 */
Basket.prototype.render = function () {
    // отображение товаров на странице
    let showBasket = new ShowBasket(this.basketItems);
    // отображение на странице index.html
    showBasket.onPageIndex();
    // отображение на странице shopping-cart.html
    showBasket.onPageShoppingCart();
};

/**
 * Метод запрашивает через ajax файл getBasket.json, получает 
 * корзину пользователя и отображает ее на страницах.
 *
 */
Basket.prototype.getBasket = function () {
    // var appendId = '#' + this.id + '_items';

    $.ajax({
        type: 'POST',
        url: this.basketJsonAddr,
        dataType: 'json',
        // отправка id пользователя на сервер
        data: { id: this.id },
        // data: { name: "John", location: "Boston" },
        context: this,
        success: function (data) {
            for (var itemKey in data.contents)
            {
                this.basketItems.push(data.contents[itemKey]);
            }
            // Перерисовка корзины
            this.render();
        }
    });
};

/**
 * Метод удаляет товар из корзины, изменяет на странице кол-во товаров, 
 * общую стоимость.
 *
 * @param idProduct Идентификатор удаляемого товара
 */
Basket.prototype.remove = function (idProduct) {
    $.ajax({
        type: 'POST',
        url: this.deleteFromBasketAddr,
        dataType: 'json',
        // отправка id пользователя на сервер
        data: { idUser: this.id, idGood: idProduct },
        context: this,
        success: function (data) {
            if (data.result == 1) {
                // поиск товара в корзине
                let goodNumber = this.find(idProduct);
                
                    // усли товар в корзине найден
                    if(goodNumber !== false) {
                        // удаление товара из массива с товарами
                        if (this.basketItems[goodNumber].quantity > 1) {
                            this.basketItems[goodNumber].quantity--;
                        } else if (this.basketItems[goodNumber].quantity === 1) {
                            this.basketItems.splice(goodNumber, 1);
                        }
                    }
                // Перерисовка корзины
                this.render(); 
            }
        }
    });

};

/**
 * Метод ищет товар в корзине и возврашает его номер в массиве, 
 * если нашел или false, если не нашел.
 *
 * @param id Идентификатор удаляемого товара
 * @return Значение типа Number или типа Boolean(false)
 */
Basket.prototype.find = function (id) {
  let number = false;

    this.basketItems.forEach(function(product, index) {
      if(product.id_product === id) {
        number = index;
      }
    });
  return number;
};

/**
 * Метод добавляет товар в корзину, изменяет на странице кол-во товаров, 
 * общую стоимость, также метод создает массив обьектов basketItem в который 
 * вноситься идентификаторы товаров и их цены.
 *
 * @param idProduct Идентификатор товара
 */
Basket.prototype.add = function (idProduct) {

    $.ajax({
        type: 'POST',
        url: this.addToBasket,
        dataType: 'json',
        // отправка id пользователя на сервер
        data: { id_product: idProduct, quantity: 1 },
        context: this,
        success: function (data) {
            this.extractFromCatalog(idProduct);
        }
    });
};


/**
 * Метод добавляет товар в корзину, изменяет на странице кол-во товаров, 
 * общую стоимость, также метод создает массив обьектов basketItem в который 
 * вноситься идентификаторы товаров и их цены.
 *
 * @param idProduct Идентификатор товара
 */
Basket.prototype.extractFromCatalog = function (id) {

    $.ajax({
        type: 'POST',
        url: this.catalogData,
        dataType: 'json',
        data: { id_product: id },
        context: this,
        success: function (data) {
            for (let product of data) { 
                if(product.id_product === id) {
                    this.addBasket(product);
                }
            }
        }
    });
};

Basket.prototype.addBasket = function (product) {
    let addProduct = product;
    addProduct.quantity = 1;
    let i = 0;
    for (let item of this.basketItems) { 
        if(item.id_product === product.id_product) {
            this.basketItems[i].quantity++;
            addProduct = null;
        }
        i++;
    }
    if (addProduct !== null) {
        this.basketItems.push(product);
    }
    // Перерисовка корзины
    this.render();
};