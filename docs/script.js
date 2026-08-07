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
  updateTodayTasks();
  updateWeekTasks();
  updateMonthTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
  updateTodayTask();
  updateWeekTasks();
  updateMonthTasks();
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
  updateWeekTasks();
  updateMonthTasks();
};
function updateTodayTasks() {

  const todayList = document.getElementById("today-list");

  if (!todayList) return;

  todayList.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  const taskItems = document.querySelectorAll("#task-list .task-item");

  let count = 0;

  taskItems.forEach(task => {

    const text = task.textContent;

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
function updateWeekTasks() {

 const weekList = document.getElementById("week-list");

 if (!weekList) return;

 weekList.innerHTML = "";

 const today = new Date();

 const taskItems = document.querySelectorAll("#task-list .task-item");

 let count = 0;

 taskItems.forEach(task => {

  const text = task.textContent;

  const match = text.match(/\d{4}-\d{2}-\d{2}/);

  if (!match) return;

  const deadline = new Date(match[0]);

  const diff =
    (deadline - today) / (1000 * 60 * 60 * 24);

  if (diff >= 0 && diff <= 7) {

   const clone = task.cloneNode(true);

   weekList.appendChild(clone);

   count++;

  }

 });

 if (count === 0) {

  weekList.innerHTML =
   "<p>今週のタスクはありません</p>";

 }

}
function updateMonthTasks() {

 const monthList = document.getElementById("month-list");

 if (!monthList) return;

 monthList.innerHTML = "";

 const today = new Date();

 const taskItems = document.querySelectorAll("#task-list .task-item");

 let count = 0;

 taskItems.forEach(task => {

  const text = task.textContent;

  const match = text.match(/\d{4}-\d{2}-\d{2}/);

  if (!match) return;

  const deadline = new Date(match[0]);

  const diff =
    (deadline - today) / (1000 * 60 * 60 * 24);

  if (diff >= 0 && diff <= 30) {

   const clone = task.cloneNode(true);

   monthList.appendChild(clone);

   count++;

  }

 });

 if (count === 0) {

  monthList.innerHTML =
   "<p>今月のタスクはありません</p>";

 }

}
