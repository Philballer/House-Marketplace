import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import visibilityOffIcon from '../assets/svg/visibilityOffIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [visibility, setVisibilty] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //USER AUTH
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //Initializing our Auth object
      const auth = getAuth();
      //creating user(registering by also passing auth) and storing it in a consntant
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //getting user from userCredentials (firebase thing)
      const user = userCredential.user;
      //upateprofile eg displayname when logged in
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      //making a copy of form to database without the password
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.info('New User has been created successfully', {
        autoClose: 5000,
      });
      //navigate to homepage after logging in
      navigate('/profile');
    } catch (error) {
      toast.error('Error occured! Please retry.');
    }
  };

  const handleVisibilty = () => {
    setShowPassword(!showPassword);
    setVisibilty(!visibility);
  };

  return (
    <div>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Sign Up!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Name'
            className='nameInput'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            placeholder='Email'
            className='emailInput'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            <img
              src={visibility ? visibilityOffIcon : visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={handleVisibilty}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}

        <Link to='/sign-in' className='signLink'>
          Sign In Instead
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
