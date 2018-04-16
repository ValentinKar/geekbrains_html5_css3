
function Goods(pageNumber, idCategory) {
    this.pageNumber = pageNumber;
    this.idCategory = idCategory;
    this.goodsItems = [];
    this.imgCatalog = 'img/products/';
    this.imgProductCatalog = 'img/Product/';
    this.imgSingleCatalog = 'img/SinglePage/';
}


Goods.prototype.getGoods = function () {

    $.ajax({
        type: 'POST',
        url: './responses/catalogData.json',
        dataType: 'json',
        // отправка id пользователя на сервер
        data: { number: this.pageNumber, id: this.idCategory },
        // data: { name: "John", location: "Boston" },
        context: this,
        success: function (data) {
            this.onPageIndex(data);
            this.onPageProduct(data);
            this.onPageSinglePage(data);
        }
    });
};


Goods.prototype.onPageIndex = function (arrayOfGoods) {
    // console.log(arrayOfGoods);

    $ftrdItmsDiv = $('.home .fetured_items');
    // $ftrdItmsDiv = $('.fetured_items');
    // $ftrdItmsDiv.empty();
    if ($ftrdItmsDiv.length > 0) {

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

            let $addBscktA = $('<a />', {
                href: '#',
                class: 'add_basket',
                'good-id': item.id_product
            }).append($('<i />', {
                class: 'fa fa-shopping-cart',
                'aria-hidden': 'true'
            })).append('Add to Cart');

        $ftrdFigure.append($addBscktA);
        $ftrdItmsDiv.append($ftrdFigure);
        }
    }
}


Goods.prototype.onPageProduct = function (arrayOfGoods) {
    let catalogOfImage = this.imgProductCatalog;
    $ftrdItmsDiv = $('.product_content .fetured_items');
    if ($ftrdItmsDiv.length > 0) {
    // $ftrdItmsDiv = $('.fetured_items');
    // $ftrdItmsDiv.empty();

        for (let item of arrayOfGoods) {
            let $ftrdFigure = new ProductPicture(item, catalogOfImage);
            $ftrdItmsDiv.append($ftrdFigure.getWith3Buttons());
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

                    // прокрутка: другие страницы с товарами ...
                    let $prductLstCenterLi = $('<li />');
                    $prductLstCenterLi.append($('<a />', {
                            href: '#'
                        }).append('...'));
                    $prductLstUl.append($prductLstCenterLi);

                        // прокрутка: последняя страница с товарами 20
                        let $prductLstLastLi = $('<li />');
                        $prductLstLastLi.append($('<a />', {
                                href: '#'
                            }).append('20'));
                        $prductLstUl.append($prductLstLastLi);

                    // прокрутка: прокрутка страниц с товарами >
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
}


Goods.prototype.onPageSinglePage = function (arrayOfGoods) {
    let catalogOfImage = this.imgSingleCatalog;
    $ftrdItmsDiv = $('.single .fetured_items');
    if ($ftrdItmsDiv.length > 0) {
    // $ftrdItmsDiv = $('.fetured_items');
    // $ftrdItmsDiv.empty();

        for (let i = 0; i < 4; i++) {
            let $ftrdFigure = new ProductPicture(arrayOfGoods[i], catalogOfImage);
            $ftrdItmsDiv.append($ftrdFigure.getWith3Buttons());
        }
    }
}