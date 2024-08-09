myproject/
app/
main.py
models/
__init__.py
user.py
schemas/
__init__.py
user.py
templates/
index.html
static/
script.js
utils/
__init__.py
cache.py
requirements.txt

fetch('/users/')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('users-list');
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} (${user.email})`;
            userList.appendChild(listItem);
        });
    });