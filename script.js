const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


const displayItems = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => {
        addItemToDom(item);
    });

    checkUI();
}

const onAddItemSubmit = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;
    //validate input
    if (newItem === '') {
        alert('Please enter an item');
        return;
    }

    // check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove()

        //exit edit mode
        isEditMode = false;
    }

    // create item DOM element
    addItemToDom(newItem);

    //add item to local storage
    addItemToStorage(newItem);

    checkUI();

    //clear input
    itemInput.value = '';
}


const addItemToDom = (item) => {
    //create new list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // add li to DOM
    itemList.appendChild(li);
}

const createButton = (className) => {
    const button = document.createElement('button');
    button.className = className;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

const addItemToStorage = (item) => {
    const itemsFromStorage = getItemsFromStorage();
    //add new item to array
    itemsFromStorage.push(item);
    //convert to JSON string and add to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

const getItemsFromStorage = () => {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

const onClickItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }

}

const setItemToEdit = (item) => {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
    formBtn.style.backgroundColor = 'orange';
    //set the input value to the item text


    itemInput.value = item.textContent;
}

const removeItem = (item) => {
    if (confirm('Are you sure?')) {

        //remove from DOM
        item.remove();

        //remove from local storage
        removeItemFromStorage(item.textContent);
        checkUI();
    }
}

const removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();

    //filter out the item that was removed
    itemsFromStorage = itemsFromStorage.filter((itemFromStorage) => {
        return itemFromStorage !== item;
    });

    //re-save the items to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

const clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // clear items from local storage
    localStorage.removeItem('items');

    checkUI();
}

const filterItems = (e) => {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll('li');
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

const checkUI = () => {

    itemInput.value = '';

    const items = document.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    isEditMode = false;
    formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    formBtn.style.backgroundColor = 'black';
}


//initailize app

const init = () => {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem); //Event Delegation 
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems)
    checkUI();
}

init();