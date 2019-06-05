 'use strict';
function ValidMail() {
    var re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
    var myMail = document.getElementById('email').value;
    var valid = re.test(myMail);
    if (valid) output = 'Адрес эл. почты введен правильно!';
    else output = 'Адрес электронной почты введен неправильно!';
    document.getElementById('message').innerHTML = output;
    document.getElementById('email').style.backgroundColor="red";
    return valid;
}
 
function ValidPhone() {
    var re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    var myPhone = document.getElementById('phone').value;
    var valid = re.test(myPhone);
    if (valid) output = 'Номер телефона введен правильно!';
    else output = 'Номер телефона введен неправильно!';
    document.getElementById('message').innerHTML = document.getElementById('message').innerHTML+'<br />'+output;
    document.getElementById('phone').style.backgroundColor="red";
    return valid;
}  
  var  blockFindCity = $( '#find' );
   var arCity = [];

        // получаем список городов с сервера
        $.ajax( {
            url: './list.json',
            dataType: 'json',
            type: 'get',
            success: function ( data ) {
                if ( data.result === 'success' ) {
                    arCity = data.message;
                }
            }
        } );

        // отлеживаем нажатие клавиш в input city
        $( '#city' ).on( 'keyup', function () {
            var cityInputValue = $( this ).val();

            if ( cityInputValue.length < 3 ) {
                blockFindCity.addClass( 'find-hidden' );
                return;
            }

            // получаем массив найденных городов
            var arFindCity = arCity.filter( function ( item ) {
                var regExp = new RegExp( cityInputValue, 'ig' );
                return regExp.test( item );
            } );

            // выводим найденные города
            if ( arFindCity.length > 0 ) {
                blockFindCity.removeClass( 'find-hidden' );
                blockFindCity.find( '.find_list' ).html( '' ); // перед тем как заполнить, удаляем все li

                for ( var i = 0; i < arFindCity.length; i++ ) {
                    blockFindCity.find( '.find_list' )
                        .append( $( '<li class="find-city__item">' + arFindCity[ i ] + '</li>' ) );
                }

                // вешаем событие click на элементы списка найденных городов
                blockFindCity.find( 'li.find-city__item' ).on( 'click', function () {
                    $( '#city' ).val( $( this ).text() );
                    blockFindCity.addClass( 'find-hidden' );
                } );
            } else {
                blockFindCity.addClass( 'find-hidden' );
            }
        } );
  