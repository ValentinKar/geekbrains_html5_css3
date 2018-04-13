$(document).ready(function () {


    //Корзина
    var basket = new Basket('1');
    // 2. Для того, чтобы кнопки заработали, используйте делегаты.
    //Удаление отзыва
    $(document).on('click', '.miss', function () {
        let idProduct = parseInt($(this).attr('good-id'));
        // var price = parseInt($(this).parent().find('span.product-price').text());
        basket.remove(idProduct);
    });
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


    //Корзина
    var goods = new Goods('1', '1');
    goods.getGoods();

});