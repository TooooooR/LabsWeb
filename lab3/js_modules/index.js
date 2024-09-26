import {
    createTreeCard,
    createPriceCount,
} from "./createModules.js";

const treesContainer = document.getElementById('tree_container');
const findButton = document.getElementById('find_button')
const findnput = document.getElementById('find_input')
const sortDecrease = document.getElementById('sort_by_decrease_of_price')
const resetButton = document.getElementById('reset_button')
const sortIncrease = document.getElementById('sort_by_increase_of_price')
const priceCountElement = document.getElementById('priceCount')


let artificialTrees = [];
let artificialTreesCopy = []; 
let currentTrees = [];


fetch('ArtificialTree.json')
    .then(response => response.json())
    .then(data => {
        artificialTrees = data;
        artificialTreesCopy = data;
        currentTrees = data;
        displayTrees(artificialTrees);
    })
    .catch(error => console.error('Problem with JSON:', error));


function calculateTotalPrice(trees) {
    return trees.reduce((totalValue, tree) => totalValue + tree.price, 0);
}

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
}


findButton.addEventListener('click', () => {
    const foundTree = artificialTrees.filter(tree => tree.manufacturer_name.toLowerCase().search(findnput.value.trim().toLowerCase()) !== -1);
    // const foundTree = artificialTrees.filter(tree => tree.height_cm === Number(findnput.value));
    displayTrees(foundTree);
});


resetButton.addEventListener('click', () =>{
    treesContainer.innerHTML = ''
    findnput.value = ''
    artificialTrees = [...artificialTreesCopy];
    displayTrees(artificialTrees);
});


sortDecrease.addEventListener('click', () =>{
    const sortedTree = currentTrees.sort((a, b) => b.price - a.price);
    displayTrees(sortedTree);
});


sortIncrease.addEventListener('click', () =>{
    const sortedTree = currentTrees.sort((a, b) => a.price - b.price);
    displayTrees(sortedTree);
});
