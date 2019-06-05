//Функция-конструктор
function Container(id) {
    if(id !== undefined){
        this.id = id;
    }
    this.htmlCode = '';
}
Container.prototype.render = function () {
    return this.htmlCode;
};
function Menu(myId, myClass, myItems) {
    Container.call(this, myId);
    this.className = myClass;
    this.items = myItems;
}
//Наследование в ES5
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function () {
    var result = '<ul class="' + this.className + '" id="' + this.id + '">';
    for (var i = 0; i < this.items.length; i++)
    {
        if(this.items[i] instanceof MenuItem)
        {
            result += this.items[i].render();
        }
    }
    result +='</ul>';
    return result;
};

//Класс MenuItem
function MenuItem(href, title) {
    Container.call(this);
    this.href = href;
    this.title = title;
}
//Наследование в ES5
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
  return '<li><a href="'+this.href+'">' + this.title + '</a></li>';
};


window.onload = function () {
    document.getElementById('btn').onclick = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './items.json', true);
    xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.log('Error', xhr.status, xhr.statusText);
            } else {
                var itemsObj = JSON.parse(xhr.responseText);
                console.log('Полученный массив', itemsObj);
                var items = [];
                for (var i = 0; i < itemsObj.length; i++) {
                    items.push(new MenuItem(itemsObj[i].href, itemsObj[i].title,  ));
                }

                var menu1 = new Menu('menu1', 'menu1', items);

                document.getElementById('menu').innerHTML = menu1.render();
            }
        };
    }
}