"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import styles from "./info.module.css";
const Info = () => {
  const userName = useSelector((state: RootState) => state.reduxStore.userName);
  const remaning = useSelector((state: RootState) => state.reduxStore.balance);
  return (
    <div className={styles.conatiner}>
      <div className={styles.mainSection}>
        <div className={styles.card}>
          <div className={styles.emoji}>🏆</div>
          <div className={styles.infoData}>
            {userName ? remaning.toLocaleString("en-Us") : ""}
          </div>
        </div>
      </div>
      <div className={styles.mainSection}>
        <div className={styles.card}>
          <div className={styles.emoji}>😎</div>
          <div className={styles.infoData}>{userName}</div>
        </div>
      </div>
      <div className={styles.mainSection}>
        <div className={styles.card}>
          <div className={styles.emoji}>⏱</div>
          <div className={styles.infoData}>{userName ? "20:00" : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
