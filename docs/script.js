function addTask() {

  const taskName = document.getElementById("taskName").value;
  const deadline = document.getElementById("taskDeadline").value;

  if (taskName.trim() === "") {
    alert("タスク名を入力してください");
    return;
  }

  const taskList = document.getElementById("task-list");

  const div = document.createElement("div");
  div.className = "task-item";

  div.innerHTML = `
    <label>
      <input type="checkbox" onchange="saveTasks()">
      ${taskName}　📅 ${deadline}
    </label>

    <button onclick="deleteTask(this)">
      🗑️
    </button>
  `;

  taskList.appendChild(div);

  saveTasks();

  document.getElementById("taskName").value = "";
  document.getElementById("taskDeadline").value = "";
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem(
    "taskList",
    document.getElementById("task-list").innerHTML
  );
}

function loadTasks() {
  const saved = localStorage.getItem("taskList");

  if (saved) {
    document.getElementById("task-list").innerHTML = saved;
  }
}

function saveDate() {
  const date = document.getElementById("taskDate").value;

  document.getElementById("selectedDate").textContent =
    "選択した日付：" + date;
}

window.onload = function () {
  loadTasks();
};
