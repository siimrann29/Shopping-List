const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filterBtn = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');


let isEditMode = false;
const displayItems = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => onAddItemToDOM(item))
    checkUI();
}
const onAddItemSubmit = (e) => {
    e.preventDefault()

    //validation
     const newItem = itemInput.value;

    if(newItem === ''){
        alert("Add items field should not be empty!")
        return;
    }

    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode')

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode =false;

    }


checkIfItemExists(newItem);
if(!checkIfItemExists(newItem)){
    onAddItemToDOM(newItem);
    addItemToStorage(newItem);
}


    checkUI();

    itemInput.value = '';


}

const onAddItemToDOM = (item) => {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button);
    itemList.appendChild(li)
}

const createButton = (classes) =>{
    const button = document.createElement('button')
    button.className= classes;
    const icon = createIcon('fa-solid fa-mark')
    button.appendChild(icon)
    return button;
}

const createIcon = (classes) => {
    const icon = document.createElement('i')
    icon.className = classes;
    return icon;
}

const addItemToStorage = (item) => {
    const itemsFromStorage = getItemsFromStorage();

itemsFromStorage.push(item);

    localStorage.setItem('items',JSON.stringify(itemsFromStorage));

    console.log(item)
}

const getItemsFromStorage = () => {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

const onClickItem = (e) => {
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    else{
setItemToEdit(e.target)
    }

}


const checkIfItemExists = (item) => {
    const itemsFromStorage = getItemsFromStorage();
    if(itemsFromStorage.includes(item))
    {
        alert("Item already Exists!")
return true;
    }
    return false;
}

function setItemToEdit(item) {
    let setIsEditMode = true;
isEditMode = true;
    itemList.querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>   Update Item'
    formBtn.style.backgroundColor = '#ccf'
    itemInput.value= item.textContent;
}
const removeItem = (item) => {
    if (confirm('Are you Sure?')){
        item.remove();
        removeItemFromStorage(item.textContent);
        checkUI();
    }
}

const removeItemFromStorage = (item) => {
 let itemsFromStorage = getItemsFromStorage();

//filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

const clearItems = (e) => {
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    checkUI();
}
const filterItems = (e) => {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
  if(itemName.indexOf(text)!= -1){
item.style.display = 'flex';
  }
  else{
      item.style.display = 'none';
  }
    })
    console.log(text)
}
const checkUI = () => {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        filterBtn.style.display = 'none';
    }
    else {
        clearBtn.style.display = 'block';
        filterBtn.style.display = 'block';
    }




}

//Initialise App
const init = () => {
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItems)
    filterBtn.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}


init();

