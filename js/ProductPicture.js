/**
 * Класс картинки товара (для отображения групп товаров с кнопками).
 * 
 * @property {object} item - Обьект товара, содержащий цену, id ...
 * @property {string} catalog - Директория, откуда беруться изображения товара.
 * @property {boolean} necessaryOfButtons - Переменная, определяющая 
 * необходимость добавления кнопок "recikle" и "like" поверх картинки с товаром.
 */
function ProductPicture(item, catalog, necessaryOfButtons) {
    this.item = item;
    this.catalog = catalog;
    this.boolean = necessaryOfButtons;
}

/** Метод отображает картинки с товарами, на страницах, картинки 
 * содержат кнопки "добавить в корзину", "recicle" и "like"
 *
 * @return Тег <figure>, содержащий теги с картинкой и другими тегами
 */
ProductPicture.prototype.getWithButtons = function () {
    let $ftrdFigure = $('<figure />', {
        class: 'fetured_item'
    });

        let $ftrdA = $('<a />', {
            href: 'single-page.html',
            class: 'fetured_product'
        });

            let $img = $('<img />', {
                src: this.catalog + this.item.id_product + '.jpg',
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
            }).append('$' + this.item.price);

            $P = $('<p />').append(this.item.product_name);

        $ftrdA.append($img);
        $ftrdA.append($P);
        $ftrdA.append($prductStrsSpan);
        $ftrdA.append($redP);

    $ftrdFigure.append($ftrdA);

        // кнопка "добавить в корзину" на картинке товара
        let $addBscktA = $('<a />', {
            href: '#',
            class: 'add_basket',
            'good-id': this.item.id_product
        }).append($('<i />', {
            class: 'fa fa-shopping-cart',
            'aria-hidden': 'true'
        })).append('Add to Cart');

    $ftrdFigure.append($addBscktA);

        if (this.boolean) {

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

        // $ftrdFigure.append($addBscktA);
        $ftrdFigure.append($rcicleA);
        $ftrdFigure.append($likeA);
        }

    return $ftrdFigure;
}
