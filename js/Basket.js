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
 * Метод 
 *
 * @param $root 
 * @return Значение типа String (не нужен, так как его нет в методе)
 */
Basket.prototype.render = function ($root) {

};

/**
 * Метод запрашивает через ajax файл getBasket.json, получает 
 * корзину пользователя и отображает ее на страницах.
 *
 */
Basket.prototype.getBasket = function () {
    var appendId = '#' + this.id + '_items';

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