
function Goods(pageNumber, idCategory) {
    this.pageNumber = pageNumber;
    this.idCategory = idCategory;
    this.goodsItems = [];
    this.imgCatalog = 'img/products/';
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
    // console.log(arrayOfGoods);

    // $ftrdItmsDiv = $('.container .fetured_items');
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