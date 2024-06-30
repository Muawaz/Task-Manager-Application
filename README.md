# Task-Manager-Application
The Task Manager Application is a web-based tool designed to help users manage their tasks efficiently. It allows users to add, edit, delete, search, and sort tasks dynamically. This application interacts with a mock REST API (JSONPlaceholder) for task data management.
(https://muawaz.github.io/Task-Manager-Application/)

### Features
- **Task CRUD Operations:** Add new tasks, edit existing tasks, mark tasks as completed or not completed, and delete tasks.
- **Dynamic Display:** Tasks are displayed dynamically with options to sort and search based on title.
- **User-Friendly Interface:** Clean and responsive interface for seamless task management.

### Technologies Used
- HTML
- CSS
- JavaScript (ES6+)

### Setup Instructions
To run the Task Manager Application locally on your machine, follow these steps:
1. **Clone the Repository:**
```
git clone https://github.com/Muawaz/Task-Manager-Application
cd task-manager-app
```
2. **Open the Project:**
Open the project directory in your preferred code editor.

3. **Run the Application:**
Since this application uses client-side technologies (HTML, CSS, JavaScript), you can run it simply by opening index.html in a web browser. There's no need for a web server setup if you are only testing locally.

4. **Interact with the Application:**
- Add new tasks by filling out the form and clicking "Add Task."
- Edit tasks by clicking the "Edit" button next to each task.
- Delete tasks using the "Delete" button.
- Mark tasks as completed or not completed by toggling the checkboxes.

5. **Testing API Interactions (Optional):**
If you want to test with API interactions (using JSONPlaceholder), please ensure you have an internet connection. The application fetches tasks from https://jsonplaceholder.typicode.com/todos.



### Additional Instructions
- Error Handling: Errors, if any, will be displayed in the error section at the top of the application.
- Task Display Limitation: Currently, the application fetches and displays only the first 10 tasks from the API for simplicity. Modifications to this behavior can be made in script.js.

### Contributing
Feel free to fork this repository, propose changes, or open issues for feature requests or bug fixes.

### License
This project is licensed under the MIT License - see the LICENSE file for details.
