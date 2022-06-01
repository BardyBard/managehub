var grocery_list = [
    { name: "Banana", category: "produce", price: 5.99 },
    { name: "Chocolate", category: "candy", price: 2.75 },
    { name: "Wheat Bread", category: "grains and breads", price: 2.99 }
]

var wrapper = $('#wrapper'),
    container = $('.container', wrapper).clone();
wrapper.empty();
function addItem(item) {
    var tmpContainer = container.clone();
    $('.item', tmpContainer).text(item.name);
    $('.category', tmpContainer).text(item.category);
    $('.price', tmpContainer).text(item.price);

    wrapper.append(tmpContainer);
}
for (var key in grocery_list) {
    addItem(grocery_list[key]);
}

$('form').on('submit', function () {
    var item = {
        name: this.item.value,
        category: this.category.value,
        price: this.price.value,
    }
    grocery_list.push(item);
    addItem(item);
    return false;
});