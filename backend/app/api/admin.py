from fastapi import APIRouter, Depends
from app.core.dependencies import  require_roles
from app.models.user import User

router = APIRouter(prefix="/api/admin", tags=["Admin Panel"])

@router.get("dashboard")
def get_admin_dashboard(
        current_user: User = Depends(require_roles("admin")),
):
    return {
        "message": f"Welcome to the admin dashboard, {current_user.name}",
    }