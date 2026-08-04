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
            <input type="checkbox" onchange="saveTasks()">
            ${taskName}
            📅 ${deadline}
        </label>

       <button onclick="this.parentElement.remove(); saveTasks()"> 
            🗑️
        </button>
    `;

    taskList.appendChild(div);

    saveTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("taskDeadline").value = "";

}
function loadTasks() {
  const saved = localStorage.getItem("taskList");

  alert(saved);

  if (saved) {
    document.getElementById("task-list").innerHTML = saved;
  }
}

function loadTasks() {
  const saved = localStorage.getItem("taskList");

  alert(saved);

  if (saved) {
    document.getElementById("task-list").innerHTML = saved;
  }
}
window.onload = loadTasks;
