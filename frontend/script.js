document.addEventListener('DOMContentLoaded', () => {
    const insertForm = document.getElementById('insertForm');
    if (insertForm) {
        insertForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(insertForm);
            const data = {
                id: formData.get('id'),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone')
            };
            try {
                const response = await fetch('/users/insert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.text();
                document.getElementById('message').innerText = result;
            } catch (error) {
                document.getElementById('message').innerText = 'Error: ' + error;
            }
        });
    }

    const selectForm = document.getElementById('selectForm');
    if (selectForm) {
        selectForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(selectForm);
            const id = formData.get('id');
            try {
                const response = await fetch(`/users/select/${id}`);
                const user = await response.json();
                if (user) {
                    document.getElementById('result').innerText = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`;
                } else {
                    document.getElementById('result').innerText = 'User not found';
                }
            } catch (error) {
                document.getElementById('result').innerText = 'Error: ' + error;
            }
        });
    }

    const updateForm = document.getElementById('updateForm');
    if (updateForm) {
        updateForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(updateForm);
            const data = {
                id: formData.get('id'),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone')
            };
            try {
                const response = await fetch('/users/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.text();
                document.getElementById('message').innerText = result;
            } catch (error) {
                document.getElementById('message').innerText = 'Error: ' + error;
            }
        });
    }

    const deleteForm = document.getElementById('deleteForm');
    if (deleteForm) {
        deleteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(deleteForm);
            const id = formData.get('id');
            try {
                const response = await fetch(`/users/delete/${id}`, {
                    method: 'DELETE'
                });
                const result = await response.text();
                document.getElementById('message').innerText = result;
            } catch (error) {
                document.getElementById('message').innerText = 'Error: ' + error;
            }
        });
    }
});
