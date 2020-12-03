function openNav() {
    document.getElementsByClassName('overlay')[0].style.width = "100%";
}
function closeNav() {
    document.getElementsByClassName('overlay')[0].style.width = "0%";
}


const removeCartBooks = document.getElementsByClassName('remove');
const quantityInputs = document.getElementsByClassName('cart-quantity-input');
const addToCartButtons = document.getElementsByClassName("addToCartButton");


for (let i = 0; i < removeCartBooks.length; i++) {
    let button = removeCartBooks[i];
    button.addEventListener('click', deleteBookFromCart);
}

for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}

for (let i = 0; i < addToCartButtons.length; i++) {
    let addInCartButton = addToCartButtons[i];
    addInCartButton.addEventListener('click', addToCartClick);
}

// ----------------------------------------------------------------------------------------------------update total

function updateCartTotal() {
    let basket = document.getElementsByClassName('cart-items')[0];
    let booksInBasket = basket.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < booksInBasket.length; i++) {
        let bookInBasket = booksInBasket[i];
        let priceBook = bookInBasket.getElementsByClassName('cart-price')[0];

        let price = parseFloat(priceBook.innerText.replace("€", ""));
        let quantityBook = bookInBasket.getElementsByClassName('cart-quantity-input')[0];
        let quantity = quantityBook.value;
        total = total + (price * quantity);
        total = Math.round(total * 100) / 100;
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

//----------------------------------------------------------------------------------------------------delete from cart

function deleteBookFromCart(event) {
    let buttonClicked = event.target

    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


//---------------------------------------------------------------------------------------------------- quantity change


function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//-------------------------------------------------------------------------------------------------------add item to cart

function addToCartClick(event) {

    let button = event.target;
    let bookShop = button.parentElement;
    let title = bookShop.getElementsByClassName('title')[0].innerText;
    title = title.substr(7, title.length);
    let price = bookShop.getElementsByClassName('price')[0].innerText;
    price = price.substr(7, title.length);
    let imageSrc = bookShop.getElementsByClassName('book_image')[0].src;
    addBookToCartDisplay(title, price, imageSrc);
    updateCartTotal()
}

function addBookToCartDisplay(title, price, imageSrc) {
    document.getElementsByClassName("cart-total-title")[0].innerText = "Total";
    document.getElementsByClassName("btn-purchase")[0].innerText = "Purchase Now";

    let cartRow = document.createElement('div');

    cartRow.classList.add("cart-row");

    let cartItems = document.getElementsByClassName('cart-items')[0];

    let cartItemNames = document.getElementsByClassName('cart-item-title');

    for (let i = 0; i < cartItemNames.length; i++) {
        if (title == cartItemNames[i].innerText) {
            bookAddRow = cartItemNames[i].parentElement.parentElement;
            quantityBook = bookAddRow.getElementsByClassName('cart-quantity')[0];
            quantityBook.getElementsByClassName('cart-quantity-input')[0].value++;
            return;
        }

    }

    let cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="remove">Remove</button>
    </div>  
    `
    cartRow.innerHTML = cartRowContents;

    cartItems = cartItems.insertBefore(cartRow, cartItems.firstChild);

    cartRow.getElementsByClassName("remove")[0].addEventListener('click', deleteBookFromCart);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged);


}
