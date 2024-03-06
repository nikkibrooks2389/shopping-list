const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


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

    // add li to DOM
    itemList.appendChild(li);

    checkUI();

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

const removeItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }

}

const clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

const checkUI = () => {
    const items = document.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem); //Event Delegation 
clearBtn.addEventListener('click', clearItems);

checkUI();
