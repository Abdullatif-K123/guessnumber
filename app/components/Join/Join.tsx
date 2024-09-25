"use client";
import React, { useEffect, useState } from "react";
import styles from "./join.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserName } from "@/app/store/gameSlice";
import { RootState } from "@/app/store/store";
const Join = () => {
  const dispatch = useDispatch();
  const [userName, setUserN] = useState<string>("");
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>();
  //Button enable or disable based on user name length and it has be more than 3 letter
  useEffect(() => {
    setButtonDisabled(userName.length <= 3);
  }, [userName]);

  const insertedUser = useSelector((state: RootState) => {
    return state.reduxStore.userName;
  });

  //Implementing button handler
  const handleClick = () => {
    dispatch(setUserName(userName));
    setUserN("");
  };
  return (
    <div
      className={styles.joinMain}
      style={{ display: insertedUser.length ? "none" : "" }}
    >
      <div className={styles.title}>Welcome</div>

      <form className={styles.formInput}>
        <div className={styles.lableInput}>Please enter your name !!</div>
        <input
          type="text"
          onChange={(e) => setUserN(e.target.value)}
          value={userName}
        />
        <button
          className={`${styles.btn} ${
            isButtonDisabled ? styles.btnDisabled : null
          }`}
          onClick={handleClick}
          type="button"
          disabled={isButtonDisabled}
        >
          Accept
        </button>
      </form>
    </div>
  );
};

export default Join;
