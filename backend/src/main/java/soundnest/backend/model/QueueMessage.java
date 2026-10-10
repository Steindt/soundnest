package soundnest.backend.model;

public class QueueMessage {
  private String queue;

  public QueueMessage(String queue) {
    this.queue = queue;
  }

  public String getQueue() {
    return queue;
  }

  public void setQueue(String queue) {
    this.queue = queue;
  }
}
