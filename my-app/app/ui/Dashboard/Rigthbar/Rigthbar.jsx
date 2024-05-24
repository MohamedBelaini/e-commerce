import styles from './Rigthbar.module.css'
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import Image from 'next/image';
import image from '../../../../public/image/astronaut.png'

export default function Rigthbar() {
  return (
    <div className={styles.container}>
    <div className={styles.item}>
      <div className={styles.bgContainer}>
        <Image className={styles.bg} src={image} alt="" fill />
      </div>
      <div className={styles.text}>
        <span className={styles.notification}>🔥 Disponibile ora</span>
        <h3 className={styles.title}>
        Come utilizzare la nuova versione del dashboard di amministrazione?
        </h3>
        <span className={styles.subtitle}>Ci vogliono 4 minuti per imparare</span>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit eius libero perspiciatis recusandae possimus.
        </p>
        <button className={styles.button}>
          <MdPlayCircleFilled />
          Vedi
        </button>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.text}>
        <span className={styles.notification}>🚀 Prossimamente</span>
        <h3 className={styles.title}>
        Sono disponibili nuove azioni del server, è in arrivo il pre-rendering parzialesu!
        </h3>
        <span className={styles.subtitle}>Aumenta la tua produttività</span>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit eius libero perspiciatis recusandae possimus.
        </p>
        <button className={styles.button}>
          <MdReadMore />
          Scopri
        </button>
      </div>
    </div>
  </div>
  )
}
