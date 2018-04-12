        $(document).ready(function () {

            //Создаем товары
            var $goods = $('#goods');

            // var good1 = new Good(123, 'Клавиатура для ПК', 800);
            // good1.render($goods);

            // var good2 = new Good(124, 'Мышь для ПК1', 700);
            // good2.render($goods);

            //Корзина
            var basket = new Basket('basket');
            basket.render($('#basket_wrapper'));

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
 * @property {string} idBasket - ID который будет добавляться в 
 * идентификаторы тегов.
 */
function Basket(idBasket) {

    this.id = idBasket;

    this.countGoods = 0; //Общее кол-во товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров
    this.getBasket(); //Получаем уже добавленные товары в корзину
}

/**
 * Метод добавляет контейнер для товаров на страницу.
 *
 * @param $root Коллекция jQuery - контейнер для товаров
 * @return Значение типа String (не нужен, так как его нет в методе)
 */
Basket.prototype.render = function ($root) {
  var $basketDiv = $('<div />', {
      id: this.id,
      text: 'Корзина'
  });

  var $basketItemsDiv = $('<div />', {
    id: this.id + '_items'
  });

  $basketItemsDiv.appendTo($basketDiv);
  $basketDiv.appendTo($root);

};

/**
 * Метод запрашивает через ajax файл basket.json и получает 
 * корзину пользователя.
 *
 */
Basket.prototype.getBasket = function () {
    var appendId = '#' + this.id + '_items';

    $.ajax({
        type: 'POST',
        url: './responses/getBasket.json',
        // url: './basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {

            // var $basketData = $('<div />', {
            //     id: 'basket_data'
            // });

            this.countGoods = data.countGoods;
            this.amount = data.amount;

            // $basketData.append('Всего товаров: ' + this.countGoods + '</p>');
            // $basketData.append('Общая стоимость: ' + this.amount + '</p>');

            // $basketData.appendTo(appendId);

            for (var itemKey in data.contents)
            {
                this.basketItems.push(data.contents[itemKey]);
            }
            let showBasket = new ShowBasket(this.countGoods, this.amount, this.basketItems);
            showBasket.onPageIndex();
            showBasket.onPageShoppingCart();
            // console.log(this.basketItems);
        }
    });
};