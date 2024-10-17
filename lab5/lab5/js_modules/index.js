import { createTreeCard } from "./createModules.js";
import { getAllTrees, postTree, deleteTree, updateTree, getTotalPrice, searchTrees, getSortTrees} from "./api.js";
import { showModal } from "./modalWindow.js";

const treesContainer = document.getElementById('tree_container');
let artificialTrees = [];
let currentTrees = [];
let isFind = false;

// Оновлення даних
let isEditing = false;
let editingTreeId = null;
const createEditP = document.getElementById('create_edit');

// Сортування та пошук
const findInput = document.getElementById('find_input');
const findButton = document.getElementById('find_button');
const resetButton = document.getElementById('reset_button');
const sortDecrease = document.getElementById('sort_by_decrease_of_price');
const sortIncrease = document.getElementById('sort_by_increase_of_price');

// Вставка/створення/видалення/оновлення
const submitBtn = document.getElementById('submit_btn');
const manufacturerInput = document.getElementById('manufacturer_desc_input');
const heightInput = document.getElementById('height_desc_input');
const priceInput = document.getElementById('price_desc_input');
const materialInput = document.getElementById('material_desc_input');


// Запит на сервер
const refetchAllTrees = async () => {
    const allTrees = await getAllTrees();

    if (allTrees) {
        artificialTrees = allTrees;
        currentTrees = allTrees;
        displayTrees(artificialTrees);
    }


    if (currentTrees.length === 0) {
        treesContainer.innerHTML = '<p class="warnMessage">Дерев поки немає</p>'; 
        return;
    }
};

refetchAllTrees();


// Функції для оновлення даних
function editTree() {
    const updatedTree = {
        manufacturer_name: manufacturerInput.value,
        height_cm: parseInt(heightInput.value),
        price: parseFloat(priceInput.value),
        material: materialInput.value
    };

    updateTree(editingTreeId, updatedTree)
        .then(() => {
            isEditing = false;
            editingTreeId = null;
            submitBtn.textContent = "Submit";
            updateTotalPrice();
            refetchAllTrees();
            resetInputs();
        })
        .catch(error => console.error('Error updating tree:', error));
}

function resetInputs() {
    manufacturerInput.value = '';
    heightInput.value = '';
    priceInput.value = '';
    materialInput.value = '';

    submitBtn.textContent = "Submit";
    createEditP.textContent = "Create a Christmas tree";
    isEditing = false;
    editingTreeId = null;
}

function editTreeInputs(tree) {
    manufacturerInput.value = tree.manufacturer_name;
    heightInput.value = tree.height_cm;
    priceInput.value = tree.price;
    materialInput.value = tree.material;

    submitBtn.textContent = "Apply";
    createEditP.textContent = "Edit a Christmas tree";
    isEditing = true;
    editingTreeId = tree.id;
}


// Відмальовка списку trees
function displayTrees(trees) {
    currentTrees = trees;
    treesContainer.innerHTML = '';

    if (trees.length === 0) {
        treesContainer.innerHTML = '<p class="warnMessage">На жаль, такого виробника немає.</p>';
        return;
    }

    trees.forEach(tree => {
        treesContainer.innerHTML += createTreeCard(tree);
    });
}


// Витяг ввідних даних та передання на сервер
function getInputValues() {
    let newTree = {
        manufacturer_name: manufacturerInput.value,
        height_cm: parseInt(heightInput.value),
        price: parseFloat(priceInput.value),
        material: materialInput.value
    };

    postTree(newTree)
        .then(() => {
            updateTotalPrice();
            refetchAllTrees();
            resetInputs();
        })
        .catch(error => console.error('Error adding tree:', error));
}


// Обрахування ціни
function calculateTotalPrice(trees) {
    // Calculate the total price from the trees array
    const totalPrice = trees.reduce((totalValue, tree) => totalValue + parseFloat(tree.price), 0);
    
    // Update the total price element in the DOM
    const totalPriceElement = document.getElementById("priceCount");
    totalPriceElement.textContent = `Total value of Christmas trees on page: ${totalPrice} UAH`;
    
    return totalPrice;
}


// Блок з кнопками та eventlistener для них
findButton.addEventListener('click', async () => {
    const searchTerm = findInput.value.trim().toLowerCase();

    if (searchTerm) {
        isFind = true;
        try {
            // Виклик функції для пошуку ялинок на бекенді
            const foundTrees = await searchTrees(searchTerm);
            currentTrees = foundTrees
            console.log(currentTrees)
            displayTrees(foundTrees);
            calculateTotalPrice(foundTrees);// Відображення знайдених ялинок на сторінці
        } catch (error) {
            console.error("Error fetching trees by search:", error);
        }
    } else {
        // Якщо введене поле пошуку пусте, просто вивести всі ялинки
        const allTrees = await getAllTrees();
        displayTrees(allTrees);
    }
});

resetButton.addEventListener('click', () => {
    findInput.value = '';
    const sortedTree = artificialTrees.sort((a, b) => a.id - b.id);
    displayTrees(sortedTree);
    calculateTotalPrice(sortedTree);
});


// sortDecrease.addEventListener('click', () => {
//     const sortedTree = currentTrees.sort((a, b) => b.price - a.price);
//     displayTrees(sortedTree);
// });

// sortIncrease.addEventListener('click', () => {
//     const sortedTree = currentTrees.sort((a, b) => a.price - b.price);
//     displayTrees(sortedTree);
// });

sortDecrease.addEventListener('click', async () => {
    const searchTerm = findInput.value.trim().toLowerCase();
    const sortedTrees = await getSortTrees("price_desc", searchTerm);
    // const currentTreesIds = currentTrees.map(tree => tree.id);
    // const filteredSortedTrees = sortedTrees.filter(tree => currentTreesIds.includes(tree.id));
    displayTrees(sortedTrees);
});

sortIncrease.addEventListener('click', async () => {
    const searchTerm = findInput.value.trim().toLowerCase();
    const sortedTrees = await getSortTrees("price_asc", searchTerm);
    // const currentTreesIds = currentTrees.map(tree => tree.id);
    // const filteredSortedTrees = sortedTrees.filter(tree => currentTreesIds.includes(tree.id));
    displayTrees(sortedTrees);
});



treesContainer.addEventListener('click', async (e) => {
    const target = e.target;
    const treeId = target.dataset.id;

    if (target.classList.contains('delete_button')) {
        await deleteTree(treeId);
        updateTotalPrice();
        await refetchAllTrees();
    }

    if (target.classList.contains('edit_button')) {
        const treeToEdit = currentTrees.find(tree => tree.id == treeId);
        editTreeInputs(treeToEdit);
    }
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!manufacturerInput.value.trim() || !heightInput.value.trim() || !priceInput.value.trim() || !materialInput.value.trim()) {
        showModal("All fields must be filled out!");
    } else if (priceInput.value < 0 || heightInput.value < 0) {
        if (priceInput.value < 0 && heightInput.value < 0) {
            showModal("Height and price must be positive numbers!");
        } else if (priceInput.value < 0) {
            showModal("Price must be a positive number!");
        } else if (heightInput.value < 0) {
            showModal("Height must be a positive number!");
        }
    } else {
        if (isEditing) {
            editTree();
        } else {
            getInputValues();
        }
    }
});


// Обрахування ціни
const updateTotalPrice = async (search = "") => {
    try {
      const totalPriceData = await getTotalPrice(search);
      const totalPriceElement = document.getElementById("priceCount");
      totalPriceElement.textContent = `Total value of Christmas trees on page: ${totalPriceData.total_price} UAH`;
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };
  
updateTotalPrice();
