import { useHistory } from 'react-router-dom';

// login

// route /login component login
// route component <Protected userType=['Admin,"customer"]><Login/><Protected/>
const Protected = ({ children, userType }) => {
  const userLocalStorageItem = localStorage.getItem('userToken');
  const user = userLocalStorageItem ? JSON.parse(userLocalStorageItem) : undefined;

  const history = useHistory();

  if (!userType) return children;

  if (!userType.includes(user.role) || user === undefined) {
    history.push('/');
  }

  //   if he has access
  return children;
};

export default Protected;
