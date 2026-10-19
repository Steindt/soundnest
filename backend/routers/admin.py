from fastapi import APIRouter, Depends

from ..dependencies import check_admin_token
from ..util import database

router = APIRouter(prefix="/admin",
                   tags=["admin"],
                  #  dependencies=[Depends(check_admin_token)],
                   responses={403: {"description": "Forbidden"}})

@router.get("/")
async def admin():
  pass

@router.get("/redis")
async def get_redis_stats():
  mem = await database.r.info("memory")
  return {
    "keys": await database.r.dbsize(),
    "used_memory": mem["used_memory_human"],
    "maxmemory": mem.get("maxmemory_human", "unlimited")
  }