import json

from fastapi import APIRouter, Depends, Query

from ..dependencies import get_user_token
from ..util import source
from ..util import database
from ..util.types import Song

router = APIRouter(prefix="/search",
                   tags=["search"],
                  #  dependencies=[Depends(get_user_token)],
                   responses={404: {"description": "Not found"}})

@router.get("", response_model=list[Song])
async def search(src: source.SourceNames = "soundcloud", query: str = Query(..., min_length=1, max_length=255)):
  query = query.lower().strip()
  cached = await database.get_cached_search(src, query)
  if cached is not None:
    return cached
  else:
    data = await source.search(src, query)
    await database.save_search_to_cache(src, query, data)
  return data.entries