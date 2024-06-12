const userUrl = 'https://jsonplaceholder.typicode.com/users'

export const checkResponseStatus = () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    
    return fetch(url)
      .then(response => ({
        status: response.status,
        ok: response.ok,
        url: response.url
      }))
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to ensure the promise is rejected
      });
  };

export const getUsers = () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
  
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => data)
      .catch(error => {
        console.error('Error fetching users:', error);
        throw error; // Re-throw the error to ensure the promise is rejected
      });
};


export const getUserPosts = (userId, maxNumPosts = 3) => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(posts => posts.slice(0, maxNumPosts))  // Limit the number of posts to maxNumPosts
    .catch(error => {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error; // Re-throw the error to ensure the promise is rejected
    });
};

export const createNewUser = (newUserData) => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUserData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(newUser => newUser)
    .catch(error => {
      console.error('Error creating new user:', error);
      throw error; // Re-throw the error to ensure the promise is rejected
    });
};