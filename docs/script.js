function addTask() {
    const task = prompt("追加するタスクを入力してください");

    if (task) {
        const list = document.getElementById("task-list");

        const item = document.createElement("div");
        item.className = "task-item";

        item.innerHTML = `
            <label>
                <input type="checkbox">
                ${task}
            </label>
            <button onclick="this.parentElement.remove()">🗑️</button>
        `;

        list.appendChild(item);
    }
}
