
import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from './features/todo/todoSlice';
import { w3cwebsocket as W3cwebsocket } from 'websocket';
import { setNotifications } from './features/notification/notificationSlice';
import moment from 'moment';
import {
  reset,
  getUserProfile,
  updateUserProfileImg,
  updateUserProfile,
} from './features/user/userSlice';
import Todos from './components/Todos';
import { login, resetAuth } from './app/authSlice'
function App() {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: '',
    signature: '',
    signature_type: '',
  });
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess } = useSelector(state => state.user);
  useEffect = (() => {
    dispatch(getUserProfile())
  }, [])
  // useEffect = (() => {
  //   setProfile({
  //     first_name: user?.first_name,
  //     last_name: user?.last_name,
  //     email: user?.email,
  //     role: user?.role,
  //     phone_number: user?.phone_number,
  //     department: user?.department,
  //     signature: user?.signature,
  //     signature_type: user?.signature_type,
  //   })
  // }
  // , [user])


  const [todo, setTodo] = useState('')
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLasttName] = useState('')
  const [isNotComming, setIsNotComming] = useState(false);
  // const addAnewTodo = (e) => {
  //   e.preventDefault()
  //   try {

  //     dispatch(addTodo(todo))
  //     setTodo('')
  //   }
  //   catch (e) {
  //     console.log("error", e)
  //   }
  // }
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [theUser, setTheUser] = useState({first_name:"no user",last_name:"no user"});

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    if(token){

      setAuthenticated(true)
    }
    if (!token) {
      // return "no"
      setAuthenticated(false)
      console.log("no")
    }
    else {
      // return "yes"
      console.log("yes")
    }
  }
  const handleSubmit = (e) => {
    const userInfo = { username, password };
    dispatch(login(userInfo));
    checkAuth()
    // e.preventDefault();
  };
  const BASE_URL = "http://localhost:8000/api/users/user-profile/"
  const updateUser = async () => {
    const updatedUser = JSON.stringify({first_name: newFirstName, last_name: newLastName})
    const headers = new Headers();
    headers.set('Content-Type', 'application/json'); // Set any other headers you need
    headers.set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5NTg3MDc4LCJpYXQiOjE2OTk0OTcwNzgsImp0aSI6ImJhYTI2NWM1NzFhOTRiOGU4MGFiOTk0OTY0ZmFmZGQ3IiwidXNlcl9pZCI6MX0.wkL8NkVBMID-ofjnymmv9D3kuwXQA3gT_6sKWtxqUmM`);
    //  dispatch(updateUserProfile({first_name:newFirstName,last_name:newLastName}))
    const response = await fetch(BASE_URL, { method: 'PATCH', headers: headers, body: updatedUser }).then(()=>{
      console.log("submitted")
    }
    );

  }
  const getUser = async() => {
    const user = dispatch(getUserProfile())
    setTheUser(user)
    console.log("the userrrr", user)
  }
  const openSocket = () => {
    let socket;

    socket = new W3cwebsocket(`ws://localhost:8001/ws/notification/?uuid=0000`);

    socket.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      let notifi = JSON.parse(localStorage.getItem("notification")) || [];
      const currentDate = moment()
      const futureDate = currentDate.add(3, 'days').format("YYYY-MM-DDTHH:mm");
      if (notifi.length > 0) {
        notifi = notifi.filter(item => (moment().diff(moment(item?.date).format("YYYY-MM-DDTHH:mm:ss"), "seconds")) < 0);
      }
      // console.log("Socket data",data);

      // Modify the properties of the payload object directly
      if (data?.payload) {
        data.payload.date = futureDate;
        notifi.unshift(data.payload);
        localStorage.setItem("notification", JSON.stringify(notifi));
        dispatch(setNotifications(notifi));
        setIsNotComming(true);
      }
      socket.send(JSON.stringify({ "type": "delete.notifications", "data": {} })); // Send the message
    };


    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };

  }
  // const logOut =()=>{
  //     localStorage.removeItem('accessToken');
  //     dispatch(logout()).then(() => {
  //       window.location.href = 'http://localhost';
  //     });
  // }

  // <div>
  //   <div className='flex justify-center mt-20' >
  //     <Card />
  //   </div >
  //   <div className='flex justify-center items-center mt-10'>
  //     <div className="card lg:card-side bg-base-100 shadow-xl p-4 mt-10">
  //       <form onSubmit={addAnewTodo}>
  //         <div className='w-80'>
  //           <label className="label">
  //             <span className="label-text">Enter task name</span>
  //           </label>
  //           <div className='form-control'>
  //             <input className='input' type="text" placeholder="Todo name" value={todo} onChange={(e) => setTodo(e.target.value)} />
  //             <button type="submit" className="btn btn-primary mt-2">Add</button>
  //           </div>
  //         </div>
  //       </form >
  //     </div>
  //   </div>
  //   {/* <div className='w-90'> */}
  //   <div className='flex justify-center items-stretch mt-10 min-w-200'>
  //     <Todos />
  //   </div>
  //   {/* </div> */}
  // </div >


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold">Login</h2>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      <div className='ml-4 p-8 w-96 space-y-4'>
        {authenticated === true ? <div className="badge badge-primary">Authenticated</div> :<div className="badge badge-secondary">Not authenticated</div>}
        {console.log("the user", profile)}
         <Card fname={user?.first_name||""} lname={user?.last_name||""} />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          onClick={checkAuth}
        >
          checkauth
        </button>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          onClick={getUser}
        >
          Get user
        </button>
      </div>
      {/* <div className="bg-white p-8 shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold">User Data</h2>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="First Name"
          value={user?.first_name || "-"}
        onChange={(e) => setNewFirstName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="last Name"
          value={user?.last_name || "-"}
        onChange={(e) => setNewLasttName(e.target.value)}
        />

      </div> */}
      <div className="bg-white p-8 shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold">User Data update</h2>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="First Name"
          defaultValue={user?.first_name || "-"}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="last Name"
          defaultValue={user?.last_name || "-"}
          onChange={(e) => setNewLasttName(e.target.value)}
        />
        {console.log("ssss", user)}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          onClick={updateUser}
        >
          update
        </button>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          onClick={openSocket}
        >
          Open websocket
        </button>
      </div>
    </div>
  );
}

export default App;
