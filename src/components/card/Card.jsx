import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ user }) => {
  return (
    <Link className={styles.none} to={`/profile/${user.id}`}>
      <div className={styles.container}>
        <img className={styles.image} src={user.image} alt="" />
        <div className={styles.nameContainer}>{user.name}</div>
      </div>
    </Link>
  );
};

export default Card;
