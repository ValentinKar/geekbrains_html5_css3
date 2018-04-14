$(document).ready(function () {


    // Корзина
    var basket = new Basket('1');
    // 2. Для того, чтобы кнопки заработали, используйте делегаты.
    //Удаление товара
    $(document).on('click', '.miss', function () {
        let idProduct = parseInt($(this).attr('good-id'));
        basket.remove(idProduct);
    });
    $(document).on('click', '.add_basket', function () {
        let idProduct = parseInt($(this).attr('good-id'));
        basket.add(idProduct);
    });
    // изменение кол-ва товара на странице shopping-cart.html в 
    // в теге <input type = "number" ... >
    $(document).on('change', '.quantity-of-good', function () {
        let idProduct = parseInt($(this).attr('good-id'));
        let quantity = parseInt($(this).val());
        basket.changeQuantity(idProduct, quantity);
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


    // Товары на странице
    var goods = new Goods('1', '1');
    goods.getGoods();

});