// SingleUserPage.jsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUser, updateUser } from '../../../actions';
import styles from '../../../ui/Dashboard/users/SingleUser/SingleUser.module.css';
import Image from 'next/image';
import imageUser from '../../../../public/image/userImage.png';

const SingleUserPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await fetchUser(id);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phone: e.target.phone.value,
        address: e.target.address.value,
        isAdmin: e.target.isAdmin.value === 'true',
        isActive: e.target.isActive.value === 'true',
      });
      console.log('User updated successfully!');
      router.push('/dashboard/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <div className={styles.infoContainer}>
            <h2>{user.fullName}</h2>
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <input type="hidden" name="id" value={user.id} />
              <label>Username</label>
              <input type="text" name="username" defaultValue={user.fullName} />
              <label>Email</label>
              <input type="email" name="email" defaultValue={user.email} />
              <label>Password</label>
              <input type="password" name="password" defaultValue={user.password}/>
              <label>userId</label>
              <input type="text" name="userId" defaultValue={user.userId} />
            </form>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleUserPage;
