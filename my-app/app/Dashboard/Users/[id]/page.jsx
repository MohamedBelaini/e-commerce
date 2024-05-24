
import styles from "../../../ui/Dashboard/users/SingleUser/SingleUser.module.css";
import Image from "next/image";
import imageUser from '../../../../public/image/userImage.png'

const SingleUserPage = async ({ params }) => {
  
  
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={imageUser} alt="" fill />
        </div>
        soufiane
      </div>
      <div className={styles.formContainer}>
        <form  className={styles.form}>
          <input type="hidden" name="id" />
          <label>Username</label>
          <input type="text" name="username" placeholder="User name" />
          <label>Email</label>
          <input type="email" name="email" placeholder='Email' />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="User Phone" />
          <label>Address</label>
          <textarea type="text" name="address" placeholder="Address" />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} >Yes</option>
            <option value={false} >No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} >Yes</option>
            <option value={false} >No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;