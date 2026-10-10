package soundnest.backend;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import soundnest.backend.model.message.PlayerMessage;
import soundnest.backend.model.message.QueueMessage;

@Controller
public class MessageController {
  @MessageMapping("/queue/change")
  @SendTo("/topic/queue")
  public QueueMessage queueMessage(QueueMessage message) {
    return new QueueMessage("");
  }

  @MessageMapping("/player")
  @SendTo("/topic/player")
  public PlayerMessage queueMessage(PlayerMessage message) {
    return new PlayerMessage("");
  }
}
