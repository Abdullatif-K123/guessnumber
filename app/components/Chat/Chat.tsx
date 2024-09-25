import React from "react";
import styles from "./chat.module.css";
import { Toaster } from "react-hot-toast";
const Chat = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>💬 Chat</div>
      <div className={styles.chatCard}>
        <Toaster />

        <div className={styles.messageBox} id="msg"></div>
        <form className={styles.sendMsg}>
          <input
            type="text"
            className={styles.inputChat}
            name="message"
            placeholder="send message"
          />
          <button className={styles.btn} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
