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
 $.ajax( {
            url: './list.json',
            dataType: 'json',
            type: 'get',
            success: function ( data ) {
                if ( data.result === 'success' ) {
                    var arCity = data.message;
                    for ( var i = 0; i < arCity.length; i++ ) {
                        $( '#city' ).append( $( '<option value="' + i + '">' + arCity[ i ] + '</option>' ) );
                    }

                    if ( $( 'select[id="city"] option' ).length > 0 ) {
                        $( '#city' ).find( ':first' ).attr( 'selected', 'selected' );
                    }
                }
            }
        } );
