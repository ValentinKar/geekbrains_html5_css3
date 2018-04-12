/**
 * Класс отображения корзины на страницах магазина.
 * 
 * @property countGoods - Колличество товаров на странице.
 * @property amount - Сумма стоимостей товаров в магазине.
 * @property basketItems - Массив с товарами в корзине.
 */
function ShowBasket(countGoods, amount, basketItems) {
    this.countGoods = countGoods;  //Общее кол-во товаров
    this.amount = amount;  //Общая стоимость товаров
    this.basketItems = basketItems;  //Массив для хранения товаров
    this.directoryTinyImg = 'img/tiny-img/';
    this.directorySmallImg = 'img/small-img/';
}

/**
 * Метод отображает корзину с товарами на странице index.html.
 *
 */
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

/**
 * Метод отображает корзину с товарами на странице shopping-cart.html.
 *
 */
ShowBasket.prototype.onPageShoppingCart = function () {
    let $shopping = $('.shopping .table-shopping'); //.container 
    $shopping.empty();

    let $tblRwHd = $('<div />', {
        class: 'table-row table-row__head',
    });

    $tblRwHd.append($('<div />').append('Product Details'));
    $tblRwHd.append($('<div />').append('unite Price'));
    $tblRwHd.append($('<div />').append('Quantity'));
    $tblRwHd.append($('<div />').append('shipping'));
    $tblRwHd.append($('<div />').append('Subtotal'));
    $tblRwHd.append($('<div />').append('ACTION'));
    $shopping.append($tblRwHd);

    for (let item of this.basketItems)
    {
        let $tblRwDiv = $('<div />', {
            class: 'table-row'
        });
            let $fgre = $('<figure />', {
                class: 'table-details'
            });

                let $imgA = $('<a />', {
                    href: '#'
                });
                    let $img = $('<img />', {
                        src: this.directorySmallImg + item.id_product + '.jpg',
                        alt: item.product_name
                    });
                $imgA.append($img);

                let $fgcptn = $('<figcaption />');
                    $nmP = $('<p />', {
                        class: 'name'
                    });
                    $nmP.append(item.product_name);
                    $clurP = $('<p />');
                    $clurP.append('Color:</span>');
                    $clurP.append('&nbsp; Red');
                    $szP = $('<p />');
                    $szP.append('Size:</span>');
                    $szP.append('&nbsp; Xll');
                $fgcptn.append($nmP);
                $fgcptn.append($clurP);
                $fgcptn.append($szP);

            $fgre.append($imgA);
            $fgre.append($fgcptn);

        $tblRwDiv.append($fgre);
        $tblRwDiv.append($('<div />').append('$' + item.price));
            $qunttyDiv = $('<input />', {
                type: 'number',
                value: item.quantity,
                min: 1,
                max: 10000
            });
        $tblRwDiv.append($('<div />').append($qunttyDiv));
        $tblRwDiv.append($('<div />').append('FREE'));
        $tblRwDiv.append($('<div />').append('$' + (item.price * item.quantity)));

            // удалить товар из корзины
            let $mssA = $('<a />', {
                class: 'miss',
                href: '#',
                'good-id': item.id_product
            });
            $mssA.append($('<i />', {
                class: 'fa fa-times-circle',
                'aria-hidden': true
            }));

        $tblRwDiv.append($('<div />').append($mssA));
        $shopping.append($tblRwDiv);
    }
    let $tblRwBttom = $('<div />', {
        class: 'table-shopping__bottom',
    });
        let $clrShppngDiv = $('<div />', {
            class: 'black_button',
        });
            let $clrShppngA = $('<a />', {
                href: '#'
            });
            $clrShppngA.append('cLEAR SHOPPING CART');
        $clrShppngDiv.append($clrShppngA);
    $tblRwBttom.append($clrShppngDiv);

        let $cntnueShppngDiv = $('<div />', {
            class: 'black_button',
        });
            let $cntnueShppngA = $('<a />', {
                href: '#'
            });
            $cntnueShppngA.append('cONTINUE sHOPPING');
        $cntnueShppngDiv.append($cntnueShppngA);
    $tblRwBttom.append($cntnueShppngDiv);

    $shopping.append($tblRwBttom);

    let shoppingFormClasses = '.shopping-form .shopping-total ';
    $(shoppingFormClasses + 'p:eq(0)').empty().append('Sub total &nbsp;&nbsp;&nbsp; $' + this.amount); 
    $(shoppingFormClasses + '.grand span').empty().append('$' + this.amount); 
};