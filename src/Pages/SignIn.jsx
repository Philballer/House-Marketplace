import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
//we dont need react component for visibility cause its gonna be set as a scource for an immage
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import visibilityOffIcon from '../assets/svg/visibilityOffIcon.svg';

function SignIn() {
  //for the password visibilty icon and function
  const [showPassword, setShowPassword] = useState(false);
  const [visibility, setVisibilty] = useState(false);

  const navigate = useNavigate();

  //for the form data as object. Instead of having different states for different input fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  //destructuring from formData
  const { email, password } = formData;

  //set previous data and dynamically change email and password to respective using ID. We have made onCHange dynamically usable for other fields, we just have to set the ID as the same name we set it up in the formData.
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        toast.success('Sign in Successful');
        navigate('/');
      }
    } catch (error) {
      toast.error('User Credentials not found');
    }
  };

  //handle visibilty icon
  const handleVisibilty = () => {
    setShowPassword(!showPassword);
    setVisibilty(!visibility);
  };

  return (
    <div>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
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

          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}

        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
