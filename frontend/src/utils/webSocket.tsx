import { Client, IMessage } from "@stomp/stompjs";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { queueUpdate } from "../components/Queue";
import { playerUpdate } from "../components/PlayerManager";

type WebSocketContext = {
  connected: boolean;
  subscribe: (
    destination: string,
    callback: (message: IMessage) => void,
  ) => () => void;
  publish: (destination: string, body: unknown) => void;
};

const WebSocketContext = createContext<WebSocketContext | null>(null);

const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    console.log("Setting up WebSocket");

    const stompClient = new Client({
      brokerURL: "ws://localhost:5173/ws",
      reconnectDelay: 5000,
      // debug: (message) => {
      //   console.log("[STOMP]", message);
      // },
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);
        // subscribe("/topic/queue", queueUpdate);
        // subscribe("/topic/player", playerUpdate);
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
        setConnected(false);
      },
      onWebSocketClose: (event) => {
        console.log("Closed WebSocket", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });
        setConnected(false);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket error", event);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    setClient(stompClient);
    stompClient.activate();

    return () => {
      console.log("Cleaning up WebSocket");
      setConnected(false);
      void stompClient.deactivate();
    };
  }, []);

  const subscribe = useCallback(
    (destination: string, callback: (message: IMessage) => void) => {
      if (!client || !connected) {
        return () => {};
      }

      const subscription = client.subscribe(destination, callback);

      return () => subscription.unsubscribe();
    },
    [client, connected],
  );

  const publish = useCallback(
    (destination: string, body: unknown) => {
      if (!client || !connected) {
        throw new Error("STOMP client not connected");
      }

      client.publish({
        destination,
        body: JSON.stringify(body),
      });
    },
    [client, connected],
  );

  return (
    <WebSocketContext.Provider value={{ connected, subscribe, publish }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export { WebSocketProvider, useWebSocket };
