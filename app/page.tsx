"use client";
import styles from "./page.module.css";
import Join from "./components/Join/Join";
import GamingBoard from "./components/GamingBoard/GamingBoard";
import Info from "./components/Info/Info";
import GameGraph from "./components/GameGraph/GameGraph";
export default function Home() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className="mainContainer">
          <div className="boardSection">
            <Join />
            <GamingBoard />
          </div>
          <div className="boardSection">
            <Info />
            <GameGraph />
          </div>
        </div>
      </div>
    </div>
  );
}
