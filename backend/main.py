from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from .dependencies import get_user_token, check_admin_token
from .routers import search, admin

app = FastAPI()

origins = [
  "http://localhost:5172",
  "https://localhost:5172",
  "127.0.0.1:5172"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

app.include_router(search.router)
app.include_router(admin.router)

class ConnectionManager:
  def __init__(self):
    self.active_connections: list[WebSocket] = []

  async def connect(self, websocket: WebSocket):
    await websocket.accept()
    print(f"{websocket.client} connected to websocket")
    self.active_connections.append(websocket)

  def disconnect(self, websocket: WebSocket):
    if websocket in self.active_connections:
      self.active_connections.remove(websocket)

  async def send_private_message(self, message: str, websocket: WebSocket):
    await websocket.send_text(message)

  async def broadcast(self, message: str):
    for conn in self.active_connections:
      await conn.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
  try:
    await manager.connect(websocket)
    while True:
      data = await websocket.receive_json()
      await manager.send_private_message(data, websocket)
  except WebSocketDisconnect:
    pass
  finally:
    manager.disconnect(websocket)