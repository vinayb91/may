document.addEventListener('DOMContentLoaded', () => {

    //  email and phone validations
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    function validatePhoneNumber(phone) {
        const re = /^[0-9]{10}$/; 
        return re.test(phone);
    }

 
    const insertForm = document.getElementById('insertForm');
    if (insertForm) {
        insertForm.addEventListener('submit', async (event) => {
            event.preventDefault();

           
            const id = parseInt(document.getElementById('id').value); 
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value; 

            const validationMessage = document.getElementById('validationMessage');

            if (!validateEmail(email)) {
                validationMessage.innerText = 'Invalid email format';
                return;
            }
            if (!validatePhoneNumber(phone)) {
                validationMessage.innerText = 'Invalid phone number format';
                return;
            }

            const data = {
                id: id,
                name: name,
                email: email,
                phone: phone
            };

            // Check for duplicate entry
            try {
                const checkResponse = await fetch(`http://localhost:1050/users/${id}`);
                if (checkResponse.ok) {
                    const existingUser = await checkResponse.json();
                    if (existingUser) {
                        validationMessage.innerText = 'User with this ID already exists';
                        return;
                    }
                }
            } catch (error) {
                document.getElementById('message').innerText = 'Error: ' + error;
                return;
            }

            // Insert data if no duplicates found
            try {
                const response = await fetch('http://localhost:1050/users', {
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

    // Select Form Submission
    const selectForm = document.getElementById('selectForm');
    if (selectForm) {
        selectForm.addEventListener('submit', async (event) => {
            event.preventDefault();

         
            const id = parseInt(document.getElementById('selectId').value); 
            try {
                const response = await fetch(`http://localhost:1050/users/${id}`);
                const user = await response.json();
                if (user) {
                    
                    document.getElementById('resultId').innerText = user.id;
                    document.getElementById('resultName').innerText = user.name;
                    document.getElementById('resultEmail').innerText = user.email;
                    document.getElementById('resultPhone').innerText = user.phone;

                   
                    document.getElementById('result').style.display = 'block';

                   
                    const updateButton = document.getElementById('updateButton');
                    updateButton.style.display = 'block';
                    updateButton.href = `update.html?id=${user.id}`;
                } else {
                    document.getElementById('result').innerText = 'User not found';
                }
            } catch (error) {
                document.getElementById('result').innerText = 'Error: ' + error;
            }
        });
    }

    //  Delete Form Submission
    const deleteForm = document.getElementById('deleteForm');
    if (deleteForm) {
        deleteForm.addEventListener('submit', async (event) => {
            event.preventDefault();

         
            const id = parseInt(document.getElementById('deleteId').value);

            try {
                const response = await fetch(`http://localhost:1050/users/${id}`, {
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
