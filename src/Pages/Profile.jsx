import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { async } from '@firebase/util';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  //Change details in the form
  const [changeDetails, setChangeDetails] = useState(false);

  //filling in the formData with the data from Firestore/auth
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate('/sign-in');
    toast.info('Logged out successfully');
  };

  //Submit changes to firebase store
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName === name) {
        toast.info('Name was not edited');
      } else {
        //update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        toast.success('Name successfuly changed');

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Could not Update profile details');
    }
  };

  const onChangeNameForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              //to change the name of the profile
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChangeNameForm}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChangeNameForm}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
