function fetchGitHubProfile(username) {
    const apiUrl = `https://api.github.com/users/${username}`;
    fetch(apiUrl)
    .then(response => {
    if (!response.ok) {
    throw new Error('User not found');
    }
    return response.json();
    })
    .then(data => {
    displayProfile(data);
    })
    .catch(error => {
    displayError(error.message);
    });
   }
   function displayProfile(data) {
    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('name').textContent = data.name || data.login;
    document.getElementById('bio').textContent = data.bio ||" No bio available";
    document.getElementById('repos').textContent = data.public_repos;
    document.getElementById('followers').textContent = data.followers;
   
    document.getElementById('profile').style.display = 'block';
    document.getElementById('error').textContent = '';
    
   }

   function displayError(message) {
    document.getElementById('error').textContent = message;
    document.getElementById('profile').style.display = 'none';
   }
   function handleFormSubmit() {
    const username = document.getElementById('username').value.trim();
    if (username === '') {
    displayError('Please enter a GitHub username.');
    return;
    }
    fetchGitHubProfile(username);
   }
   document.getElementById('getProfileBtn').addEventListener('click',
   handleFormSubmit);
   document.getElementById('username').addEventListener('keypress',
   function(event) {
    if (event.key === 'Enter') {
    handleFormSubmit();
    }
   });