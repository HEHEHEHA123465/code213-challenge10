document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const clearCompletedButton = document.getElementById('clearCompletedButton');
    const allTasksButton = document.getElementById('allTasksButton');
    const activeTasksButton = document.getElementById('activeTasksButton');
    const completedTasksButton = document.getElementById('completedTasksButton');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks(filter) {
        taskList.innerHTML = '';
        tasks
            .filter(task => filter === 'all' || task.status === filter)
            .forEach((task, index) => {
                const li = document.createElement('li');
                li.className = task.status;
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="remove" onclick="removeTask(${index})">x</button>
                        <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} onchange="toggleTask(${index})">
                    </div>
                `;
                taskList.appendChild(li);
            });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, status: 'active' });
            taskInput.value = '';
            saveTasks();
            renderTasks('all');
        }
    }

    window.removeTask = function(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks('all');
    };

    window.toggleTask = function(index) {
        tasks[index].status = tasks[index].status === 'active' ? 'completed' : 'active';
        saveTasks();
        renderTasks('all');
    };

    function clearCompleted() {
        tasks = tasks.filter(task => task.status === 'active');
        saveTasks();
        renderTasks('all');
    }

    addTaskButton.addEventListener('click', addTask);
    clearCompletedButton.addEventListener('click', clearCompleted);

    allTasksButton.addEventListener('click', () => {
        allTasksButton.classList.add('active');
        activeTasksButton.classList.remove('active');
        completedTasksButton.classList.remove('active');
        renderTasks('all');
    });

    activeTasksButton.addEventListener('click', () => {
        allTasksButton.classList.remove('active');
        activeTasksButton.classList.add('active');
        completedTasksButton.classList.remove('active');
        renderTasks('active');
    });

    completedTasksButton.addEventListener('click', () => {
        allTasksButton.classList.remove('active');
        activeTasksButton.classList.remove('active');
        completedTasksButton.classList.add('active');
        renderTasks('completed');
    });

    renderTasks('all');
});
