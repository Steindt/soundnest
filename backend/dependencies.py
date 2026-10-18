from typing import Annotated
from fastapi import Header, HTTPException

async def get_user_token(x_token: Annotated[str, Header()]):
  if x_token != "fake-super-secret-token":
    raise HTTPException(status_code=400, detail="X-Token header invalid")

async def check_admin_token(token: str):
  if token != "user":
    raise HTTPException(status_code=400, detail="No user token provided")