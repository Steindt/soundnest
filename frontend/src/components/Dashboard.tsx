import styles from "../styles/Dashboard.css";
import Overview from "./Overview";
import { Queue } from "./Queue";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className="overview-container">
        <Overview />
      </div>
      <div id="queue-other-container">
        <Queue />
        <div className="other-container"></div>
      </div>
    </div>
  );
};

export default Dashboard;
