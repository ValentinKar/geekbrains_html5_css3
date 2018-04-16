
function Goods(pageNumber, idCategory) {
    this.pageNumber = pageNumber;
    this.idCategory = idCategory;
    this.goodsItems = [];
    this.goodId = 123;
    this.imgCatalog = 'img/products/';
    this.imgProductCatalog = 'img/Product/';
    this.imgSingleCatalog = 'img/SinglePage/';
    this.singleImageCatal = 'img/single-img/';
    this.catalogData = './responses/catalogData.json';
    this.getGoodById = './responses/getGoodById.json';
    this.dataType = 'json';
}


Goods.prototype.getGoods = function () {

    $.ajax({
        type: 'POST',
        url: this.catalogData,
        dataType: this.dataType,
        // отправка id пользователя на сервер
        data: { number: this.pageNumber, id: this.idCategory },
        context: this,
        success: function (data) {
            this.onPageIndex(data);
            this.onPageProduct(data);
            this.onPageSinglePage(data, this.goodId);
        }
    });
};


Goods.prototype.onPageIndex = function (arrayOfGoods) {
    let catalogOfImage = this.imgCatalog;
    $ftrdItmsDiv = $('.home .fetured_items');
    if ($ftrdItmsDiv.length > 0) {
    // $ftrdItmsDiv = $('.fetured_items');
    // $ftrdItmsDiv.empty();

        for (let i = 0; i < 8; i++) {
            let $ftrdFigure = new ProductPicture(arrayOfGoods[i], catalogOfImage, false);
            $ftrdItmsDiv.append($ftrdFigure.getWithButtons());
        }
    }
}


Goods.prototype.onPageProduct = function (arrayOfGoods) {
    let catalogOfImage = this.imgProductCatalog;
    $ftrdItmsDiv = $('.product_content .fetured_items');
    if ($ftrdItmsDiv.length > 0) {
    // $ftrdItmsDiv = $('.fetured_items');
    // $ftrdItmsDiv.empty();

        for (let i = 0; i < 9; i++) {
        // for (let item of arrayOfGoods) {
            let $ftrdFigure = new ProductPicture(arrayOfGoods[i], catalogOfImage, true);
            $ftrdItmsDiv.append($ftrdFigure.getWithButtons());
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


Goods.prototype.onPageSinglePage = function (arrayOfGoods, id) {

    $.ajax({
        type: 'POST',
        url: this.getGoodById,
        dataType: this.dataType,
        // отправка id товара на сервер
        data: { idOfGood: id },
        context: this,
        success: function (data) {
            if (data.result == 1) {
                this.onGoodById(data, id);
            }
        }
    });

    let catalogOfImage = this.imgSingleCatalog;
    $ftrdItmsDiv = $('.single .fetured_items');
    if ($ftrdItmsDiv.length > 0) {
        for (let i = 0; i < 4; i++) {
            let $ftrdFigure = new ProductPicture(arrayOfGoods[i], catalogOfImage, true);
            $ftrdItmsDiv.append($ftrdFigure.getWithButtons());
        }
    }
}


Goods.prototype.onGoodById = function (good, id) {

    let singleImageCatal = this.singleImageCatal;
    $singleImageDiv = $('.single-img');
    if ($singleImageDiv.length > 0) {
        $singleImageDiv.append($('<img />', {
            src: singleImageCatal + id + '.jpg',
            alt: ''
        }));
    }

    let $singleDataForm = $('.single-data');
    if ($singleDataForm.length > 0) {
        $singleDataH3 = $('.single-data h3');
        $singleDataH3.append(good.product_name);

        $singleDataDescriptionP = $('.single-data .container-form');
        $singleDataDescriptionP.append(good.product_description);

        $singleDataPriceP = $('.single-data .price');
        $singleDataPriceP.append('$' + good.product_price);

        // кнопка "ADD TO CART" под картинкой товара
        $singleButton = $('.single-data .white_button');
            let $addBscktA = $('<a />', {
                href: '#',
                class: 'add_basket',
                'good-id': id
            }).append($('<i />', {
                class: 'fa fa-shopping-cart',
                'aria-hidden': 'true'
            })).append(' &nbsp; Add to Cart');
        $singleButton.append($addBscktA);
    }
}

