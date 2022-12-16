import ScrumAPI from "../api/ScrumAPI.js";

export default class DropZone {
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
			<div class="scrum-dropzone"></div>
		`).children[0];

		dropZone.addEventListener("dragover", e => {
			e.preventDefault();
			dropZone.classList.add("scrum-dropzone-active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("scrum-dropzone-active");
		});

		dropZone.addEventListener("drop", e => {
			e.preventDefault();
			dropZone.classList.remove("scrum-dropzone-active");

			const columnElement = dropZone.closest(".scrum-column");
			const columnId = Number(columnElement.dataset.id);
			const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".scrum-dropzone"));
			const droppedIndex = dropZonesInColumn.indexOf(dropZone);
			const itemId = Number(e.dataTransfer.getData("text/plain"));
			const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
			const insertAfter = dropZone.parentElement.classList.contains("scrum-item") ? dropZone.parentElement : dropZone;

			if (droppedItemElement.contains(dropZone)) {
				return;
			}

			insertAfter.after(droppedItemElement);
			ScrumAPI.updateItem(itemId, {
				columnId,
				position: droppedIndex
			});
		});

		return dropZone;
	}
}
