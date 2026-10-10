package soundnest.backend;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import soundnest.backend.model.PlayerMessage;
import soundnest.backend.model.QueueMessage;

@Controller
public class MessageController {
  @MessageMapping("/queue/change")
  @SendTo("/topic/queue")
  public QueueMessage queueChangeMessage(QueueMessage message) {
    return new QueueMessage("");
  }

  @MessageMapping("/player")
  @SendTo("/topic/player")
  public PlayerMessage playerChangeMessage(PlayerMessage message) {
    return new PlayerMessage("");
  }
}
