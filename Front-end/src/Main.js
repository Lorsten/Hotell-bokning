
//File for handling the users

// Get the localstorage
export const user = () =>{
  return localStorage.getItem('user') || null;
}

export const RemoveUser = () =>{
  localStorage.removeItem('user');
}

export const SetLocalStorage = (user) =>{
  localStorage.setItem('user', user);
}