
function ShowBasket(countGoods, amount, basketItems) {
    this.countGoods = countGoods;  //Общее кол-во товаров
    this.amount = amount;  //Общая стоимость товаров
    this.basketItems = basketItems;  //Массив для хранения товаров
    this.directoryTinyImg = 'img/tiny-img/';
    this.directorySmallImg = 'img/small-img/';
}

ShowBasket.prototype.onPageIndex = function () {
    let $basket = $('.full_basket');
    $basket.empty();

        for (let item of this.basketItems)
        {
            let $li = $('<li />');

                let $img = $('<img />', {
                    src: this.directoryTinyImg + item.id_product + '.jpg',
                    alt: ''
                });
                    let $p = $('<p />');
                    $p.append(item.product_name);

                    let $stars = $('<span />', {
                        class: 'stars'
                    });

                    for (let j = 0; j < 5; j++) {
                        // let $i = $('<i />', {
                        //     class: 'fa fa-star',
                        //     'aria-hidden': 'true'
                        // });
                        // $stars.append($i);
                        $stars.append($('<i />', {
                            class: 'fa fa-star',
                            'aria-hidden': 'true'
                        }));
                    }

                let $div = $('<div />');
                $div.append($p);
                $div.append($stars);

                    let $span = $('<span />');
                    $span.append(item.quantity + '&nbsp; x &nbsp; $' + item.price);

                $div.append($span);

                // удалить товар из корзины
                let $a = $('<a />', {
                    class: 'miss',
                    href: '#',
                    'good-id': item.id_product
                });
                $a.append($('<i />', {
                    class: 'fa fa-times-circle',
                    'aria-hidden': true
                }));

                    // let $iClose = $('<i />', {
                    //     class: 'fa fa-times-circle',
                    //     'aria-hidden': true
                    // });

            
            $li.append($img);
            $li.append($div);
            $li.append($a);
            $basket.append($li);
        }
            
    let $sumLi = $('<li />');
                let $TtlP = $('<p />');
                $TtlP.append('TOTAL');
                let $summa = $('<p />', {
                    summa: 'miss'
                });
                $summa.append('$' + this.amount);
    $sumLi.append($TtlP);
    $sumLi.append($summa);

    $basket.append($sumLi);

    let $btnsLi = $('<li />');

        let $rdBtnLi = $('<div />', {
            class: 'white_button'
        });

            let $checkout = $('<a />', {
                class: 'checkout',
                href: 'checkout.html'
            });
            $checkout.append('Checkout');
        $rdBtnLi.append($checkout);

        let $blckBtnLi = $('<div />', {
            class: 'black_button'
        });

            let $goToCart = $('<a />', {
                class: 'go_to_cart',
                href: '#'
            });
            $goToCart.append('Go to cart');
        $blckBtnLi.append($goToCart);

    $btnsLi.append($rdBtnLi);
    $btnsLi.append($blckBtnLi);
    $basket.append($btnsLi);

};