import React from "react";
import styles from "./Cardlist.module.css";
import Card from "../card/Card";

const CardList = ({ userData, isLoading }) => {
  return (
    <div className={styles.container}>
      {userData.length !== 0 && !isLoading ? (
        userData.map((user, index) => {
          return <Card key={index} user={user} />;
        })
      ) : (
        <div>No data present !!!</div>
      )}
    </div>
  );
};

export default CardList;
