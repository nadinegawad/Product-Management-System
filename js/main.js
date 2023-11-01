//dom
let productNameInput = document.querySelector('#productNameInput')
let productPriceInput = document.querySelector('#productPriceInput')
let priceTaxesInput = document.querySelector('#priceTaxesInput')
let priceAdsInput = document.querySelector('#priceAdsInput')
let pricetDiscountInput = document.querySelector('#pricetDiscountInput')
let priceTotal = document.querySelector('#priceTotal')
let productCountInput = document.querySelector('#productCountInput')
let productCategoryInput = document.querySelector('#productCategoryInput')

let addBtn = document.querySelector('#addBtn')
let deleteAll = document.querySelector('#deleteAll');
let searchByTitleBtn = document.querySelector('#searchByTitleBtn');
let searchByCatBtn = document.querySelector('#searchByCatBtn');
let allProducts = [];
let mood = "add";
let searchModd;
let temp;

if (localStorage.getItem('products') != null) {
    allProducts = JSON.parse(localStorage.getItem('products'))

    console.log(allProducts);
    displayProducts(allProducts)
}
//total price
function getTotalPrice() {
    if (productPriceInput.value != '') {
        let result = (+productPriceInput.value + +priceTaxesInput.value
            + +priceAdsInput.value) - +pricetDiscountInput.value;
        priceTotal.innerHTML = result;
        priceTotal.classList.replace('bg-danger','bg-success');
    }else{
        priceTotal.innerHTML = "";
        priceTotal.classList.replace('bg-success','bg-danger');
    }

}

//add 
function addProduct() {
    let product = {
        name: productNameInput.value,
        productPrice: {
            price: productPriceInput.value,
            taxes: priceTaxesInput.value,
            ads: priceAdsInput.value,
            discount: pricetDiscountInput.value,
            priceTotal: priceTotal.innerHTML
        },
        count: productCountInput.value,
        category: productCategoryInput.value
    }
    if(nameValidation()==true&&categoryValidation()==true
    &&priceValidation()==true){
        if (mood == "add") {
            if (product.count > 1) {
                for (let i = 0; product.count > i; i++) {
                    allProducts.push(product);
                }
            } else {
                allProducts.push(product);
    
            }
        } else {
            allProducts.splice(temp, 1, product);
            mood = "add";
            productCountInput.style.display = "block";
            addBtn.innerHTML = "Add Product";
        }
    
        setLocalStorge();
        console.log(allProducts);
        displayProducts(allProducts);
        clearForm();
    }
 
}

//local storge
function setLocalStorge() {
    localStorage.setItem('products', JSON.stringify(allProducts));

}
//clearForm
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    priceTaxesInput.value = "";
    priceAdsInput.value = "";
    pricetDiscountInput.value = "";
    priceTotal.innerHTML = "";
    productCountInput.value = "";
    productCategoryInput.value = "";
}

//dispaly
function displayProducts(productsList) {
    let cartona = "";

    for (let i = 0; i < productsList.length; i++) {
        cartona += `<tr>
            <td>${i + 1}</td>
            <td>${productsList[i].name}</td>
            <td>${productsList[i].productPrice.price}</td>
            <td>${productsList[i].productPrice.taxes}</td>
            <td>${productsList[i].productPrice.ads}</td>
            <td>${productsList[i].productPrice.discount}</td>
            <td>${productsList[i].productPrice.priceTotal}</td>
            <td>${productsList[i].category}</td>
            <td><button class="btn btn-success" onclick="setForm(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteItem(${i})">delete</button></td>
        
          </tr>`
    }
    document.querySelector('#table').innerHTML = cartona;
    if (allProducts.length > 0) {

        deleteAll.classList.remove("d-none");
        deleteAll.innerHTML = `Delete All ${allProducts.length}`
    }
}


//delete
function deleteItem(index) {
    allProducts.splice(index, 1);
    setLocalStorge();
    displayProducts(allProducts);
}
//delete all

function deleteAllProducts() {
    allProducts.splice(0);
    deleteAll.classList.add("d-none");

    setLocalStorge();
    displayProducts(allProducts);
    addBtn.innerHTML = "Add Product";

    
}
//update
function setForm(index) {
    productNameInput.value = allProducts[index].name;
    productPriceInput.value = allProducts[index].productPrice.price;
    priceTaxesInput.value = allProducts[index].productPrice.taxes;
    priceAdsInput.value = allProducts[index].productPrice.ads;
    pricetDiscountInput.value = allProducts[index].productPrice.discount;
    priceTotal.innerHTML = allProducts[index].productPrice.priceTotal;
    productCategoryInput.value = allProducts[index].category;
    productCountInput.style.display = "none";
    addBtn.innerHTML = "update";
    mood = "update";
    temp = index;
    console.log(mood);
    scroll({
        top: 0
    })

}

//search
function getSearchMood(id) {
    let searchInput = document.querySelector('#searchInput');

    if (id == "searchByTitleBtn") {
        mood = "Title"
    } else {
        mood = "Category"
    }
    searchInput.placeholder = `search by ${mood}`;
    searchInput.focus();
    searchInput.value="";
    displayProducts(allProducts)

}

function searchData(value) {
    let searchList = [];
    console.log(value);

    for (let i = 0; i < allProducts.length; i++) {
        if (mood == "Title") {
            if (allProducts[i].name.toLowerCase().includes(value.toLowerCase())) {
                searchList.push(allProducts[i]);
                displayProducts(searchList);
            }
        } else {
            if (allProducts[i].category.toLowerCase().includes(value.toLowerCase())) {
                searchList.push(allProducts[i]);
                displayProducts(searchList);
            }
        }
        
    }
    

}


//events
deleteAll.addEventListener("click", function () {
    deleteAllProducts();
})
addBtn.addEventListener("click", function () {

    addProduct();

})

//valid

function nameValidation(){
    let regex =/^[A-Za-z]{3,10}$/;
    if(regex.test(productNameInput.value)==true){
        console.log();
        document.querySelector('#wrongName').classList.add("d-none")
        productNameInput.style.border =" 1px solid #dee2e6";
        return true;
    }else{
        productNameInput.style.border = "1px solid red";
        document.querySelector('#wrongName').classList.remove("d-none")
        return false;
    }
}

function categoryValidation(){
    let regex =/^[A-Za-z]{2,10}$/;
    if(regex.test(productCategoryInput.value)==true){
        console.log();
        document.querySelector('#wrongCat').classList.add("d-none")
        productCategoryInput.style.border = " 1px solid #dee2e6";
        return true;
    }else{
        productCategoryInput.style.border = "1px solid red";
        document.querySelector('#wrongCat').classList.remove("d-none")
        return false;
    }
}

function priceValidation(){
    
    if(productPriceInput.value!=""){
        console.log();
        document.querySelector('#wrongPrice').classList.add("d-none")
        productPriceInput.style.border = " 1px solid #dee2e6";
        return true;
    }else{
        productPriceInput.style.border = "1px solid red";
        document.querySelector('#wrongPrice').classList.remove("d-none")
        return false;
    }
}
