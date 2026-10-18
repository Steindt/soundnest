from fastapi import APIRouter, Depends, Query

from ..dependencies import get_user_token
from ..util import source

router = APIRouter(prefix="/search",
                   tags=["search"],
                  #  dependencies=[Depends(get_user_token)],
                   responses={404: {"description": "Not found"}})

@router.get("")
async def search(query: str = Query(..., min_length=1, max_length=255)):
  data = source.search(query)
  return {"query": query, "results": data}