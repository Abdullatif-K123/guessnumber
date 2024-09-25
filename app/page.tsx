"use client";
import styles from "./page.module.css";
import Join from "./components/Join/Join";
import GamingBoard from "./components/GamingBoard/GamingBoard";
import Info from "./components/Info/Info";
import GameGraph from "./components/GameGraph/GameGraph";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Ranking from "./components/Ranking/Ranking";
import Chat from "./components/Chat/Chats";
export default function Home() {
  const userName = useSelector((state: RootState) => state.reduxStore.userName);
  return (
    <div className={styles.page}>
      <div className="container">
        <div className="mainContainer">
          <div className="boardSection">
            <Join />
            {userName && <GamingBoard />}
          </div>
          <div className="boardSection">
            <Info />
            <GameGraph />
          </div>
        </div>
        <div className="mainContainer2">
          <Ranking />
          <Chat />
        </div>
      </div>
    </div>
  );
}
