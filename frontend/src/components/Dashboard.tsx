import { queueItems } from "../utils/mock";
import QueueItem from "./QueueItem";
import styles from "../styles/Dashboard.css";
import Overview from "./Overview";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className="overview-container">
        <Overview />
      </div>
      <div id="queue-other-container">
        <div className="queue-container">
          <span className="container-header">Queue:</span>
          {queueItems.map((queueItem) => (
            <QueueItem data={queueItem} />
          ))}
        </div>
        <div className="other-container"></div>
      </div>
    </div>
  );
};

export default Dashboard;
