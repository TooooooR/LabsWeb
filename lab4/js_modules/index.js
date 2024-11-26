import { createTreeCard, createPriceCount } from "./createModules.js";


const treesContainer = document.getElementById('tree_container');
let artificialTrees = [];
let artificialTreesCopy = []; 
let currentTrees = [];


const findnput = document.getElementById('find_input')
const findButton = document.getElementById('find_button')
const resetButton = document.getElementById('reset_button')


const sortDecrease = document.getElementById('sort_by_decrease_of_price')
const sortIncrease = document.getElementById('sort_by_increase_of_price')


const priceCountElement = document.getElementById('priceCount')


//Create input const
const submitBtn = document.getElementById('submit_btn')
const manufacturerInput = document.getElementById('manufacturer_desc_input')
const heightInput = document.getElementById('height_desc_input')
const priceInput = document.getElementById('price_desc_input')
const materialInput = document.getElementById('material_desc_input')


// Modal message const
const modal = document.getElementById("errorModal");
const closeModalBtn = document.querySelector(".close");
const modalMessage = document.getElementById("modalMessage")


fetch('ArtificialTree.json')
    .then(response => response.json())
    .then(data => {
        artificialTrees = data;
        artificialTreesCopy = data;
        currentTrees = data;
        displayTrees(artificialTrees, treesContainer, priceCountElement);
    })
    .catch(error => console.error('Problem with JSON:', error));


function displayTrees(trees) {
    currentTrees = trees;
    treesContainer.innerHTML = '';
    
    if (trees.length === 0) {
        treesContainer.innerHTML = '<p class="warnMessage">На жаль, дерева з такою висотою немає.</p>'; 
        const totalPrice = 0
        priceCountElement.innerHTML = createPriceCount(totalPrice);
        return;
    }

    trees.forEach(tree => {
        treesContainer.innerHTML += createTreeCard(tree);
    });

    const totalPrice = calculateTotalPrice(trees);
    priceCountElement.innerHTML = createPriceCount(totalPrice);
};


function calculateTotalPrice(trees) {
    return trees.reduce((totalValue, tree) => totalValue + parseFloat(tree.price), 0);
}


function getInputValues() {
    let lastId = artificialTrees.length;
    lastId++

    let newTree = {
        id: lastId,
        manufacturer_name: manufacturerInput.value,
        height_cm: heightInput.value,
        price: parseFloat(priceInput.value),
        material: materialInput.value
    };

    artificialTrees.push(newTree);
}


function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}


findButton.addEventListener('click', () => {
    const foundTree = artificialTrees.filter(tree => tree.manufacturer_name.toLowerCase().search(findnput.value.trim().toLowerCase()) !== -1);
    displayTrees(foundTree, treesContainer, priceCountElement);
});


resetButton.addEventListener('click', () => {
    treesContainer.innerHTML = '';
    findnput.value = '';
    const resetTrees = artificialTrees.sort((a, b) => a.id - b.id);
    displayTrees(resetTrees, treesContainer, priceCountElement);
});


sortDecrease.addEventListener('click', () =>{
    const sortedTree = currentTrees.sort((a, b) => b.price - a.price);
    displayTrees(sortedTree, treesContainer, priceCountElement);
});


sortIncrease.addEventListener('click', () =>{
    const sortedTree = currentTrees.sort((a, b) => a.price - b.price);
    displayTrees(sortedTree, treesContainer, priceCountElement);
});


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!manufacturerInput.value.trim() || !heightInput.value.trim() || !priceInput.value.trim() || !materialInput.value.trim()) {
        showModal("All fields must be filled out!");
    } else if (isNaN(heightInput.value) || isNaN(priceInput.value)) {
        showModal("Height and Price must be valid numbers!");
    } else {
        getInputValues();
        displayTrees(artificialTrees);
        manufacturerInput.value = '';
        heightInput.value = '';
        priceInput.value = '';
        materialInput.value = '';
    }
});


closeModalBtn.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
