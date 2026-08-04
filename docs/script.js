function toggleCustomCategory() {
  const category = document.getElementById("taskCategory").value;
  const custom = document.getElementById("customCategory");

  if (category === "other") {
    custom.style.display = "block";
  } else {
    custom.style.display = "none";
    custom.value = "";
  }
}

function addTask() {

  let category = document.getElementById("taskCategory").value;

  if (category === "other") {
    category = document.getElementById("customCategory").value.trim();

    if (category === "") {
      alert("カテゴリー名を入力してください");
      return;
    }
  }

  const taskName = document.getElementById("taskName").value.trim();
  const deadline = document.getElementById("taskDeadline").value;

  if (taskName === "") {
    alert("タスク名を入力してください");
    return;
  }

  const taskList = document.getElementById("task-list");

  const div = document.createElement("div");
  div.className = "task-item";

  div.innerHTML = `
    <label>
      <input type="checkbox" onchange="saveTasks()">
      <strong>${category}</strong><br>
      ${taskName}<br>
      📅 ${deadline}
    </label>

    <button onclick="deleteTask(this)">
      🗑️
    </button>
  `;

  taskList.appendChild(div);

  saveTasks();

  document.getElementById("taskName").value = "";
  document.getElementById("taskDeadline").value = "";
  document.getElementById("customCategory").value = "";
  document.getElementById("taskCategory").selectedIndex = 0;

  toggleCustomCategory();
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
  toggleCustomCategory();
  updateTodayTasks();
};
function updateTodayTasks() {

  const todayList = document.getElementById("today-list");

  if (!todayList) return;

  todayList.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  const taskItems = document.querySelectorAll("#task-list .task-item");

  let count = 0;

  taskItems.forEach(task => {

    const text = task.innerText;

    if (text.includes(today)) {

      const clone = task.cloneNode(true);

      todayList.appendChild(clone);

      count++;

    }

  });

  if (count === 0) {

    todayList.innerHTML = "<p>今日のタスクはありません</p>";

  }

}
