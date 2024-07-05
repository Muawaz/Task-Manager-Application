document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://jsonplaceholder.typicode.com/todos';
    const tasksContainer = document.getElementById('tasks-list');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const taskForm = document.getElementById('task-form');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');

    let tasks = [];

    const fetchTasks = async () => {
        loadingDiv.style.display = 'block';
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch tasks');
            tasks = await response.json();
            tasks = tasks.slice(0, 10); // Display only the first 10 tasks for simplicity
            displayTasks(tasks);
        } catch (error) {
            showError(error.message);
        } finally {
            loadingDiv.style.display = 'none';
        }
    };

    const displayTasks = (tasksToDisplay) => {
        tasksContainer.innerHTML = '';
        tasksToDisplay.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description || ''}</p>
                <label>
                    <span class="task-status">${task.completed ? 'Completed' : 'Not Completed'}</span>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="updateTaskStatus(${task.id}, this.checked)">
                </label>
                <div class="task-actions">
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            tasksContainer.appendChild(taskItem);
        });
    };

    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    };

    const validateForm = () => {
        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-description').value.trim();
        if (!title || !description) {
            showError('Title and description are required.');
            return false;
        }
        errorDiv.style.display = 'none';
        return true;
    };

    const addTask = async (title, description) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    completed: false,
                    userId: 1 // Using a fixed userId for simplicity
                })
            });
            if (!response.ok) throw new Error('Failed to add task');
            const newTask = await response.json();
            tasks.push(newTask);
            displayTasks(tasks);
        } catch (error) {
            showError(error.message);
        }
    };

    window.updateTaskStatus = async (id, completed) => {
        try {
            const task = tasks.find(t => t.id === id);
            if (!task) throw new Error('Task not found');
    
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed
                })
            });
    
            if (!response.ok) throw new Error('Failed to update task status');
    
            const updatedTask = await response.json();
            const updatedTaskWithOldProps = { ...task, completed: updatedTask.completed };
    
            const index = tasks.findIndex(t => t.id === id);
            tasks[index] = updatedTaskWithOldProps;
            displayTasks(tasks);
        } catch (error) {
            showError(error.message);
        }
    };

    window.editTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            const updatedTitle = prompt('Enter new title', task.title);
            const updatedDescription = prompt('Enter new description', task.description);
            if (updatedTitle !== null && updatedDescription !== null) {
                try {
                    // Attempt to update task locally
                    const updatedTask = { ...task, title: updatedTitle, description: updatedDescription };
                    const index = tasks.findIndex(t => t.id === id);
                    tasks[index] = updatedTask;
                    displayTasks(tasks);
                } catch (error) {
                    showError(error.message); // Handle error as needed
                }
            }
        }
    };

    window.deleteTask = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');
            tasks = tasks.filter(task => task.id !== id);
            displayTasks(tasks);
        } catch (error) {
            showError(error.message);
        }
    };

    const sortTasks = (tasksToSort, criteria) => {
        let sortedTasks;
        if (criteria === 'completed') {
            sortedTasks = tasksToSort.filter(task => task.completed).sort((a, b) => a.completed - b.completed);
        } else if (criteria === 'notCompleted') {
            sortedTasks = tasksToSort.filter(task => !task.completed).sort((a, b) => b.completed - a.completed);
        } else {
            sortedTasks = tasksToSort;
        }
        return sortedTasks;
    };

    const searchTasks = (query) => {
        return tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
    };

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;
            addTask(title, description);
            taskForm.reset();
        }
    });

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        const filteredTasks = searchTasks(query);
        displayTasks(filteredTasks);
    });

    sortSelect.addEventListener('change', (event) => {
        const criteria = event.target.value;
        const sortedTasks = sortTasks(tasks, criteria);
        displayTasks(sortedTasks);
    });

    fetchTasks();
});
