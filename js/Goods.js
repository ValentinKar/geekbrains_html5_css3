
function Goods(pageNumber, idCategory) {
    this.pageNumber = pageNumber;
    this.idCategory = idCategory;
    this.goodsItems = [];
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
        }
    });
};

Goods.prototype.onPageIndex = function (arrayOfGoods) {
    console.log(arrayOfGoods);

    $ftrdItmsDiv = $('.fetured_items');
    // $ftrdItmsDiv.empty();

    let $ftrdFigure = $('<figure />', {
        class: 'fetured_item'
    });

        let $ftrdA = $('<a />', {
            href: 'single-page.html',
            class: 'fetured_product'
        });

            let $img = $('<img />', {
                src: 'img/product-1.jpg',
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
            }).append('$52.00');

            $P = $('<p />').append('Mango  People  T-shirt');

        $ftrdA.append($img);
        $ftrdA.append($P);
        $ftrdA.append($prductStrsSpan);
        $ftrdA.append($redP);

    $ftrdFigure.append($ftrdA);

        let $addBscktA = $('<a />', {
            href: '#',
            class: 'add_basket'
        }).append($('<i />', {
            class: 'fa fa-shopping-cart',
            'aria-hidden': 'true'
        })).append('Add to Cart');

    $ftrdFigure.append($addBscktA);
    $ftrdItmsDiv.append($ftrdFigure);

}

Goods.prototype.onPageProduct = function (arrayOfGoods) {
    // console.log(arrayOfGoods);
}