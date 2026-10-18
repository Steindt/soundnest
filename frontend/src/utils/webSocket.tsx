import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { queueUpdate } from "../components/Queue";
import { playerUpdate } from "../components/PlayerManager";

type Handler<T = unknown> = (body: T) => void;

type WebSocketContext = {
  connected: boolean;
  subscribe: (topic: string, callback: Handler<unknown>) => () => void;
  publish: (topic: string, body?: unknown) => void;
};

const WebSocketContext = createContext<WebSocketContext | null>(null);

const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const [connected, setConnected] = useState(false);
  const client = useRef<WebSocket | null>(null);
  const retry = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cancelled = useRef(false);
  const handlersRef = useRef(new Map<string, Set<Handler>>());

  useEffect(() => {
    console.log("Setting up WebSocket");

    const connect = () => {
      client.current = new WebSocket("ws://localhost:5173/ws");
      if (client !== null) {
        client.current.onopen = () => {
          setConnected(true);
          console.log("Connected to websocket");
        };

        client.current.onclose = (e) => {
          console.log("Disconnected from websocket", e.code, e.wasClean);
          setConnected(false);
          retry.current = setTimeout(connect, 5000);
        };

        client.current.onmessage = (e) => {
          try {
            const { topic, body } = JSON.parse(e.data.toString());
            handlersRef.current
              .get(topic)
              ?.forEach((callback) => callback(body));
          } catch (err) {
            console.error("Received back websocket message", err);
          }
        };

        client.current.onerror = (e) => {
          console.error("Error encountered on websocket", e);
        };
      } else {
        console.error("Failed to create websocket");
      }
    };

    connect();

    return () => {
      cancelled.current = true;
      console.log("Cleaning up webSocket");
      setConnected(false);
      clearTimeout(retry.current);
      client.current?.close();
      client.current = null;
    };
  }, []);

  const subscribe = useCallback((topic: string, callback: Handler<unknown>) => {
    if (!handlersRef.current.has(topic))
      handlersRef.current.set(topic, new Set());

    handlersRef.current.get(topic)!.add(callback);

    return () => handlersRef.current.get(topic)?.delete(callback);
  }, []);

  const publish = useCallback((topic: string, body: unknown) => {
    if (
      client.current === null ||
      client.current.readyState !== WebSocket.OPEN
    ) {
      console.error("Not connected to websocket, dropping message", topic);
    }
    client.current!.send(JSON.stringify({ topic, body }));
  }, []);

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
