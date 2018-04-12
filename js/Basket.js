        $(document).ready(function () {


            //Корзина
            var basket = new Basket('1');
            // basket.render($('#basket_wrapper'));

            // //Добавление товара в корзину
            // $('.good-buy').on('click', function () {
            //     var idProduct = parseInt($(this).attr('data-id'));
            //     var price = parseInt($(this).parent().find('span.product-price').text());
            //     basket.add(idProduct, price);
            // });

            // //Удаление товара из корзины
            // $('.good-delete').on('click', function () {
            //     var idProduct = parseInt($(this).attr('data-id'));
            //     var price = parseInt($(this).parent().find('span.product-price').text());
            //     basket.remove(idProduct, price);
            // });

            // 2. Для того, чтобы кнопки заработали, используйте делегаты.
            //Удаление отзыва
            $(document).on('click', '.miss', function () {
                let idProduct = parseInt($(this).attr('good-id'));
                // var price = parseInt($(this).parent().find('span.product-price').text());
                basket.remove(idProduct);
            });

        });


/**
 * Класс корзины.
 * 
 * @property {string} idUser - ID пользователя. 
 */
function Basket(idUser) {

    this.id = idUser;

    this.countGoods = 0; //Общее кол-во товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров
    this.getBasket(); //Получаем уже добавленные товары в корзину
}

/**
 * Метод отображает корзину пользователя на страницах
 *
 * @param $root 
 * @return Значение типа String (не нужен, так как его нет в методе)
 */
Basket.prototype.render = function () {
    // отображение товаров на странице
    let showBasket = new ShowBasket(this.countGoods, this.amount, this.basketItems);
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
        url: './responses/getBasket.json',
        dataType: 'json',
        // отправка id пользователя на сервер
        data: { id: this.id },
        // data: { name: "John", location: "Boston" },
        context: this,
        success: function (data) {

            this.countGoods = data.countGoods;
            this.amount = data.amount;

            for (var itemKey in data.contents)
            {
                this.basketItems.push(data.contents[itemKey]);
            }

            // отображение товаров на странице
            let showBasket = new ShowBasket(this.countGoods, this.amount, this.basketItems);
            // отображение на странице index.html
            showBasket.onPageIndex();
            // отображение на странице shopping-cart.html
            showBasket.onPageShoppingCart();
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
        url: './responses/deleteFromBasket.json',
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
                    this.basketItems.splice(goodNumber, 1);
                    // получение кол-ва оставшихся товаров и их сумма
                    let result = this.summa(idProduct);
                    // суммарная стоимость товаров в корзине
                    this.amount = result[1];
                    // кол-во товаров в корзине
                    this.countGoods = result[0];
                  }
                this.render(); //Перерисовка корзины
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
 * Метод получает из корзины с товарами их кол-во и  
 * суммарную стоимость.
 *
 * @return Массив, где первый элемент - счетчик, а 
 * второй - суммарная стоимость.
 */
Basket.prototype.summa = function () {
  let goodCount = 0;
  let goodSumma = 0;

    this.basketItems.forEach(function(element) {
      ++goodCount;
      goodSumma += element.price;
    });
  return [goodCount, goodSumma];
};