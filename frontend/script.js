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
                const checkResponse = await fetch(`http://localhost:3000/users/select/${id}`);
                if (checkResponse.ok) {
                    const existingUser = await checkResponse.json();
                    if (existingUser) {
                        document.getElementById('message').innerText = '';
                        validationMessage.innerText = 'User with this ID already exists';
                        return;
                    }
                }
            } catch (error) {
                 validationMessage.innerText = ''
                document.getElementById('message').innerText = 'Error: ' + error;
                return;
            }

            // Insert data if no duplicates found
            try {
                const response = await fetch('http://localhost:3000/users/insert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.text();
                 validationMessage.innerText = ''
                 
                document.getElementById('message').innerText = result;
            } catch (error) {
                 validationMessage.innerText = ''
                document.getElementById('message').innerText = 'Error: ' + error;
            }
        });
    }


    
   
    
    //  Delete Form Submission
    // const deleteForm = document.getElementById('deleteForm');
    // if (deleteForm) {
    //     deleteForm.addEventListener('submit', async (event) => {
    //         event.preventDefault();

         
    //         const id = parseInt(document.getElementById('deleteId').value);

    //         try {
    //             const response = await fetch(`http://localhost:3000/users/delete/${id}`, {
    //                 method: 'DELETE'
    //             });
    //             const result = await response.text();
    //             document.getElementById('message').innerText = result;
    //         } catch (error) {
    //             document.getElementById('message').innerText = 'Error: ' + error;
    //         }
    //     });
    // }
});
