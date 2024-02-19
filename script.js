function submitForm() {
    var login = document.getElementById("login").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!login || !email || !password) {
        console.error('Complete all form fields.');
        return;
    }

    var data = {
        login: login,
        email: email,
        password: password
    };

    fetch('http://localhost:3000/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network or server error');
            }
            return response.json();
        })
        .then(result => {
            console.log('Data saved to the database:', result);
        })
        .catch(error => {
            console.error('Error saving data:', error.message);
        });
}


