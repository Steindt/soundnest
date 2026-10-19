import redis.asyncio as redis
from pydantic import TypeAdapter
import logging

from ..util.types import Song, SearchResult

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def RedisKey(src, q): 
  return f"{src}/{q}"

# ~12k cached searches = 1GB
async def save_search_to_cache(source: str, query: str, searchResult: SearchResult):
  body = "[" + ",".join(t.model_dump_json() for t in searchResult.entries) + "]"
  await r.set(RedisKey(source, query), body, 604800) # Expire = 1 week

async def get_cached_search(source: str, query: str):
  cached = await r.get(RedisKey(source, query))
  if cached is None:
    return None
  return TypeAdapter(list[Song]).validate_json(cached)
