from fastapi import APIRouter, Depends

from ..dependencies import check_admin_token

router = APIRouter(prefix="/admin",
                   tags=["admin"],
                   dependencies=[Depends(check_admin_token)],
                   responses={403: {"description": "Forbidden"}})

@router.get("/")
async def admin():
  pass