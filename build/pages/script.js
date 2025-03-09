let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Add something valid!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // ایجاد دکمه حذف (×)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // ایجاد دکمه ویرایش
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.className = "edit-btn";
        li.appendChild(editButton);

        listContainer.appendChild(li); // اضافه کردن به لیست
    }
    inputBox.value = "";
    saveData();
}

// مدیریت رویدادهای کلیک روی لیست
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // علامت‌گذاری وظیفه به عنوان انجام شده
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        // حذف وظیفه
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit-btn")) {
        // ویرایش وظیفه
        editTask(e.target.parentElement);
    }
}, false);

// تابع ویرایش وظیفه
function editTask(taskItem) {
    let currentText = taskItem.firstChild.textContent; // متن فعلی
    let input = document.createElement("input");
    input.type = "text";
    input.value = currentText;

    // جایگزینی متن با input
    taskItem.replaceChild(input, taskItem.firstChild);

    // ذخیره تغییرات پس از فشار دادن Enter
    input.addEventListener("keyup", function (e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
            taskItem.replaceChild(document.createTextNode(input.value), input);
            saveData();
        }
    });
}

// ذخیره داده‌ها در localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// نمایش داده‌های ذخیره شده از localStorage
function showTask() {
    let savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

showTask(); // نمایش وظایف ذخیره شده هنگام بارگذاری صفحه