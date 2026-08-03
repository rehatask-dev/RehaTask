function addTask() {

    const taskName =
        document.getElementById("taskName").value;

    const deadline =
        document.getElementById("taskDeadline").value;

    if (taskName === "") {
        alert("タスク名を入力してください");
        return;
    }

    const taskList =
        document.getElementById("task-list");

    const div =
        document.createElement("div");

    div.className = "task-item";

    div.innerHTML = `
        <label>
            <input type="checkbox">
            ${taskName}
            📅 ${deadline}
        </label>

        <button onclick="this.parentElement.remove()">
            🗑️
        </button>
    `;

    taskList.appendChild(div);

    document.getElementById("taskName").value = "";
    document.getElementById("taskDeadline").value = "";

}
