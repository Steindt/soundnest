package soundnest.backend.model;

public class QueueChangeMessage {
  private String title;

  public QueueChangeMessage(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
