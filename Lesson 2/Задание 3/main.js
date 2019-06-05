//Функция-конструктор
function Container(id) {
    this.id = id;
    this.className= '';
    this.htmlCode = '';
    this.src = '';
    this.alt = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

function Gallery (myId, myClass, myItems, mySrc, myAlt) {
    Container.call(this);
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
    if (mySrc){
     this.scr = mySrc;   
    }
    if (myAlt){
     this.alt = myAlt;
    }
    

}
//Наследование в ES5
Gallery.prototype = Object.create(Container.prototype);
Gallery.prototype.constructor = Gallery;

Gallery.prototype.render = function () {
    var renderItem = '<div class="' + this.className + '">';
    for (var item in this.items)
    {
        if(this.items[item] instanceof GalleryItem)
        {
            renderItem += this.items[item].render();
        }
    }
    renderItem +='</div>';
    return renderItem;
};

function GalleryItem(myId, myClass, myItems, mySrc, myAlt) {
    Container.call(this);
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
    this.scr = mySrc;
    this.alt = myAlt;
}
//Наследование в ES5
GalleryItem.prototype = Object.create(Container.prototype);
GalleryItem.prototype.constructor = GalleryItem;

GalleryItem.prototype.render = function () {
  return '<a href="' + this.src + '" target="_blank">' + 
  '<img src="' + this.src + '" alt="' + this.alt + '" class="' + this.className + '"></a>';
}; 


window.onload = function () {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './gal.json', true);
    xhr.send();
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.log('Error', xhr.status, xhr.statusText);
            } else { 
                var items = [];
                var myItems = JSON.parse(xhr.responseText);
                
               
                for (var i = 0; i < myItems.length; i++) {
                    items.push(new GalleryItem('galleryItemId', 'gallery__items', 'galleryItemItems', myItems[i].src, myItems[i].alt));
                }

                var gallery1 = new Gallery('galleryId', 'gallery', items, 'gallerySrc', 'galleryAlt');

                document.getElementById('gallery').innerHTML = gallery1.render();
            };
        
    }
}