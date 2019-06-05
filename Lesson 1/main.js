'use strict';

//Класс контейнера
function Container(id) {
	if (id !== undefined) {
		this.id = id;
	}
}

Container.prototype.remove = function() {
	//function f() {
		document.getElementById(this.id).remove();
	//}
	//f.call(this);
}

//Класс списка
function Menu(id, className, items) {
	Container.call(this, id);

	this.className = className;
	this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {

	var result = '<ul class=' + this.className + ' id=' + this.id + '>';
	for ( var i = 0; i < this.items.length; i++ ) {
		if (this.items[i] instanceof MenuItem) {
			result += this.items[i].render();
		}
	}
	result += '</ul>';
	return result;
}

//Класс элементов меню
function MenuItem(href, title, subItems) {
	this.href = href;
	this.title = title;
	this.subItems = subItems;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function() {
	var result = '<li><a href=' + this.href + '>' + this.title + '</a>'; 
	if (this.subItems) {
		result += '<ul>'
		for ( var i = 0; i < this.subItems.length; i++ ) {
			result += this.subItems[i].render();
		}
		result += '</ul>';
	}
	result += '</li>';
	return result;
}

//Класс элементов подменю
function SubMenuItem(href, title) {
	MenuItem.call(this, href, title);
}

SubMenuItem.prototype = Object.create(MenuItem.prototype);
SubMenuItem.prototype.constructor = SubMenuItem;

SubMenuItem.prototype.render = function() {
	return '<li><a href=' + this.href + '>' + this.title + '</a></li>';
}

var menu = new Menu('list', 'list',
	[
	new MenuItem('#', 'Главная'),
	new MenuItem('#', 'О нас', [
		new SubMenuItem('#', 'Кто мы'),
		new SubMenuItem('#', 'Чем мы занимаемся'),
		new SubMenuItem('#', 'Как давно мы работаем')
	]),
	new MenuItem('#', 'Связаться с нами',
	[
		new SubMenuItem('#', 'Через соц.сети'),
		new SubMenuItem('#', 'По электронной почте'),
		new MenuItem('#', 'Тип связи', [
            new SubMenuItem('#', 'По телефону'),
            new SubMenuItem('#', 'Через skype')
		])
	])
]);


var storage = document.getElementById('container');
var result = menu.render();
storage.innerHTML = result;
console.log(result);

