const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const addItem = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;
    //validate input
    if (newItem === '') {
        alert('Please enter an item');
        return;
    }
    //create new list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    //clear input
    itemInput.value = '';
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

//Event Listeners
itemForm.addEventListener('submit', addItem);   