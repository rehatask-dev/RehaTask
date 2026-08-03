function addTask() {
    const task = prompt("追加するタスクを入力してください");

    if (task) {
        const div = document.createElement("div");
        div.innerHTML = `<label><input type="checkbox"> ${task}</label><br><br>`;

        document.querySelector(".card").appendChild(div);
    }
}
