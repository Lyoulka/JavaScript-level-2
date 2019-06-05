 'use strict';
var basket = new Basket();
basket.render('#basket_wrapper');

$('.buyme').on('click', function () {
    //console.log(this);
    var idProduct = parseInt($(this).attr('id').split('_')[1]);
    var count = 1;
    var price = parseInt($(this).parent().find('.product-price').text());

    basket.add(idProduct, count, price);
});
$('.deleteme').on('click', function () {
    var idProduct = parseInt($(this).attr('data-product'));
                basket.removeItem(idProduct);
   });
     
