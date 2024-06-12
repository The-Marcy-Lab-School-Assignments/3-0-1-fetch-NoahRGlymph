export const setupPageBasics = (parentEl) => {
    parentEl.innerHTML = `
      <h1>Intro To Fetch!</h1>
      <div id='status'></div>
      <div id='users'>
        <h2>Users</h2>
        <ul id='users-list'></ul>
      </div>
      <div id='posts'>
        <h2>Posts</h2>
        <ul id='posts-list'></ul>
      </div>
      <form id='new-user-form' aria-labelledby='new-user-heading'>
        <h2 id='new-user-heading'>Create A New Blog User!</h2>
        <label for='username'>Username:</label>
        <input type='text' id='username' name='username' />
        <label for='email'>Email:</label>
        <input type='email' id='email' name='email' />
        <button>Submit</button>
      </form>
      <div id='new-user'></div>
    `;

    const statusDiv = parentEl.querySelector('#status');
    const usersUl = parentEl.querySelector('#users-list');
    const postsUl = parentEl.querySelector('#posts-list');
    const newUserForm = parentEl.querySelector('#new-user-form');
    const newUserDiv = parentEl.querySelector('#new-user');

    return { statusDiv, usersUl, postsUl, newUserForm, newUserDiv };
};

export const renderStatus = (statusDiv, statusInfoObj) => {
  // Create h2 element
  const heading = document.createElement('h2');
  heading.id = 'status-heading';
  heading.textContent = `Info on - ${statusInfoObj.url}`;
  
  // Create p element
  const paragraph = document.createElement('p');
  paragraph.id = 'status-code';
  paragraph.textContent = `Status code: ${statusInfoObj.status}, ${statusInfoObj.ok ? 'OK' : 'FAIL'}!`;
  
  // Clear any existing content in statusDiv
  statusDiv.innerHTML = '';
  
  // Append new elements to statusDiv
  statusDiv.appendChild(heading);
  statusDiv.appendChild(paragraph);
};

export const renderUsers = (usersUl, users) => {
  // Clear any existing content in usersUl
  usersUl.innerHTML = '';
  
  // Iterate over the users array and create li elements
  users.forEach(user => {
    // Create li element
    const li = document.createElement('li');
    li.className = 'user-card';
    
    // Create button element
    const button = document.createElement('button');
    button.setAttribute('data-user-id', user.id);
    button.textContent = `Load ${user.username}'s posts`;
    
    // Append button to li
    li.appendChild(button);
    
    // Append li to usersUl
    usersUl.appendChild(li);
  });
};

export const renderPosts = (postsUl, posts) => {
  // Clear any existing content in postsUl
  postsUl.innerHTML = '';
  
  // Iterate over the posts array and create li elements
  posts.forEach(post => {
    // Create li element
    const li = document.createElement('li');
    
    // Create h2 element for the post title
    const h2 = document.createElement('h2');
    h2.textContent = post.title;
    
    // Create p element for the post body
    const p = document.createElement('p');
    p.textContent = post.body;
    
    // Append h2 and p to li
    li.appendChild(h2);
    li.appendChild(p);
    
    // Append li to postsUl
    postsUl.appendChild(li);
  });
};

export const renderNewUser = (newUserDiv, newUserInfo) => {
  // Clear any existing content in newUserDiv
  newUserDiv.innerHTML = '';
  
  // Create h2 element for the username
  const h2 = document.createElement('h2');
  h2.textContent = newUserInfo.username;
  
  // Create p element for the email
  const p = document.createElement('p');
  p.textContent = newUserInfo.email;
  
  // Append h2 and p to newUserDiv
  newUserDiv.appendChild(h2);
  newUserDiv.appendChild(p);
};