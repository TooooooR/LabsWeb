export function createTreeCard(tree) {
    return `
        <div class="card_of_tree">
            <img src="img/crismas-Tree.jpg" alt="crismasTree" class="place_for_img">
            <h4>Виробник ${tree.manufacturer_name}</h4>
            <p>Height: ${tree.height_cm} cm</p>
            <p>Price: ${tree.price} UAH</p>
            <p>Material: ${tree.material}</p>
            <div class="tree_edit_delete">
                <button class="edit_button" data-id="${tree.id}">Edit</button>
                <button class="delete_button" data-id="${tree.id}">Delete</button>
            </div>
        </div>
    `;
}