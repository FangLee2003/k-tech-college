import { useAuthStore } from "@/store/useAuthStore";

/**
 * Kiểm tra quyền của user hiện tại
 * @param requiredPermissions Mảng các quyền cần kiểm tra
 * @returns boolean
 */
export const hasPermissions = (requiredPermissions: string[]): boolean => {
  const { loggedInUser } = useAuthStore.getState();
  
  if (!loggedInUser || !loggedInUser.roles) return false;

  return loggedInUser.roles.some(role => 
    requiredPermissions.includes(role.name)
  );
};
