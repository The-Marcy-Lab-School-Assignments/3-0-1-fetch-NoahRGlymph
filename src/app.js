import {
  renderStatus,
  setupPageBasics,
  renderUsers,
  renderPosts,
  renderNewUser,
} from './render-functions.js';
import {
  checkResponseStatus,
  getUserPosts,
  createNewUser,
  getUsers
} from './fetch-functions.js';

export default async function app(appDiv) {
  // Create and append elements to appDiv
  const statusDiv = document.createElement('div');
  const usersUl = document.createElement('ul');
  const postsUl = document.createElement('ul');
  const form = document.createElement('form');
  const newUserDiv = document.createElement('div');

  // Set ids for elements
  statusDiv.id = 'status-div';
  usersUl.id = 'users-ul';
  postsUl.id = 'posts-ul';
  form.id = 'new-user-form';
  newUserDiv.id = 'new-user-div';

  // Create form elements
  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.name = 'username';
  usernameInput.placeholder = 'Username';
  usernameInput.required = true;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = 'Email';
  emailInput.required = true;

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Create User';

  // Append inputs and button to form
  form.appendChild(usernameInput);
  form.appendChild(emailInput);
  form.appendChild(submitButton);

  // Append all elements to appDiv
  appDiv.appendChild(statusDiv);
  appDiv.appendChild(usersUl);
  appDiv.appendChild(postsUl);
  appDiv.appendChild(form);
  appDiv.appendChild(newUserDiv);

  // Render the basic page layout on load
  try {
    const statusInfo = await checkResponseStatus();
    renderStatus(statusDiv, statusInfo);

    const users = await getUsers();
    renderUsers(usersUl, users);
  } catch (error) {
    console.error('Error initializing app:', error);
  }

  // Event delegation for user buttons
  usersUl.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON') {
      const userId = event.target.getAttribute('data-user-id');
      try {
        const posts = await getUserPosts(userId);
        renderPosts(postsUl, posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    }
  });

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const email = formData.get('email');

    if (username && email) {
      try {
        const newUser = await createNewUser({ username, email });
        renderNewUser(newUserDiv, newUser);
        form.reset();
      } catch (error) {
        console.error('Error creating new user:', error);
      }
    }
  });
}