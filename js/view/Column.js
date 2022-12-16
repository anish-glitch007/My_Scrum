import ScrumAPI from "../api/ScrumAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
    constructor(id, title) {
        const topDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".scrum-column-title");
        this.elements.items = this.elements.root.querySelector(".scrum-column-items");
        this.elements.addItem = this.elements.root.querySelector(".scrum-add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            const newItem = ScrumAPI.insertItem(id, "");

            this.renderItem(newItem);
        });

        ScrumAPI.getItems(id).forEach(item => {
            this.renderItem(item);
        });
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
			<div class="scrum-column">
            
				<div class="scrum-column-title"></div>
                <hr style="height:1px; border-width:0; color:gray; background-color:#4600B1; opacity:0.5">
				<div class="scrum-column-items"></div>
				<button class="scrum-add-item" type="button">+ Add Task</button>
			</div>
		`).children[0];
    }

    renderItem(data) {
        const item = new Item(data.id, data.content);

        this.elements.items.appendChild(item.elements.root);
    }
}
