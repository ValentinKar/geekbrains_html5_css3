
function GoodsForProductPage(pageNumber, idCategory) {
    this.pageNumber = pageNumber;
    this.idCategory = idCategory;
    this.goodsItems = [];
    this.imgCatalog = 'img/products/';
}

GoodsForProductPage.prototype.getGoods = function () {

    $.ajax({
        type: 'POST',
        url: './responses/catalogData.json',
        dataType: 'json',
        // отправка id пользователя на сервер
        data: { number: this.pageNumber, id: this.idCategory },
        // data: { name: "John", location: "Boston" },
        context: this,
        success: function (data) {
            this.onPageProduct(data);
        }
    });
};

GoodsForProductPage.prototype.onPageProduct = function (arrayOfGoods) {
    // console.log(arrayOfGoods);
    // $ftrdItmsDiv = $('.product_content .fetured_items');
    $ftrdItmsDiv = $('.fetured_items');
    // $ftrdItmsDiv.empty();

    for (let item of arrayOfGoods) {

    let $ftrdFigure = $('<figure />', {
        class: 'fetured_item'
    });

        let $ftrdA = $('<a />', {
            href: 'single-page.html',
            class: 'fetured_product'
        });

            let $img = $('<img />', {
                src: this.imgCatalog + item.id_product + '.jpg',
                alt: ''
            });

                let $prductStrsSpan = $('<span />', {
                    class: 'product_stars'
                });
                    let $imgSpan = $('<span />', {
                        class: 'img'
                    });
                    for (let j = 0; j < 4; j++) {
                        $imgSpan.append($('<i />', {
                            class: 'fa fa-star',
                            'aria-hidden': 'true'
                        }));
                    }
                    $imgSpan.append($('<i />', {
                        class: 'fa fa-star-half-o',
                        'aria-hidden': 'true'
                    }));
                $prductStrsSpan.append($imgSpan);

            $redP = $('<p />', {
                class: 'red'
            }).append('$' + item.price);

            $P = $('<p />').append(item.product_name);

        $ftrdA.append($img);
        $ftrdA.append($P);
        $ftrdA.append($prductStrsSpan);
        $ftrdA.append($redP);

    $ftrdFigure.append($ftrdA);

        // кнопка "добавить в корзину" на картинке товара
        let $addBscktA = $('<a />', {
            href: '#',
            class: 'add_basket'
        }).append($('<i />', {
            class: 'fa fa-shopping-cart',
            'aria-hidden': 'true'
        })).append('Add to Cart');

            // кнопка "обновить" на картинке товара
            let $rcicleA = $('<a />', {
                href: '#',
                class: 'recicle'
            }).append($('<i />', {
                class: 'fa fa-retweet',
                'aria-hidden': 'true'
            }));

                // кнопка "like" на картинке товара
                let $likeA = $('<a />', {
                    href: '#',
                    class: 'like'
                }).append($('<i />', {
                    class: 'fa fa-heart-o',
                    'aria-hidden': 'true'
                }));

    $ftrdFigure.append($addBscktA);
    $ftrdFigure.append($rcicleA);
    $ftrdFigure.append($likeA);
    $ftrdItmsDiv.append($ftrdFigure);

    }

        let $prductFtredDiv = $('<div />', {
            class: 'product_fetured'
        });
            let $prductLstUl = $('<ul />', {
                class: 'product_list'
            });

                // прокрутка страниц с товарами <
                let $prductLeftLstLi = $('<li />');
                $prductLeftLstLi.append($('<a />', {
                        href: '#'
                    }).append('&lt;'));
                $prductLstUl.append($prductLeftLstLi);
                for (let i = 1; i <= 6; i++) {
                    let $prductLstLi = $('<li />');
                        let $prductLstA = $('<a />', {
                            href: '#'
                        }).append(i);
                    $prductLstLi.append($prductLstA);
                    $prductLstUl.append($prductLstLi);
                }

                // другие страницы с товарами ...
                let $prductLstCenterLi = $('<li />');
                $prductLstCenterLi.append($('<a />', {
                        href: '#'
                    }).append('...'));
                $prductLstUl.append($prductLstCenterLi);

                    // последняя страница с товарами 20
                    let $prductLstLastLi = $('<li />');
                    $prductLstLastLi.append($('<a />', {
                            href: '#'
                        }).append('20'));
                    $prductLstUl.append($prductLstLastLi);

                // прокрутка страниц с товарами >
                let $prductLstRightLi = $('<li />');
                $prductLstRightLi.append($('<a />', {
                        href: '#'
                    }).append('&gt;'));
                $prductLstUl.append($prductLstRightLi);

            $prductFtredDiv.append($prductLstUl);


            let $whteBttnDiv = $('<div />', {
                class: 'white_button'
            });
                let $vewAllA = $('<a />', {
                    class: 'view_all',
                    href: '#'
                }).append('View All');
            $whteBttnDiv.append($vewAllA);
        $prductFtredDiv.append($whteBttnDiv);

    $ftrdItmsDiv.append($prductFtredDiv);
}