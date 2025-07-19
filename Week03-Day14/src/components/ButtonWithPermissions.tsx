import { Button } from "@/components/Button";
import { hasPermissions } from "@/utils/auth.util";

interface ButtonWithPermissionsProps {
  permissions?: string[];
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}

/**
 * Component Button với kiểm tra quyền
 * Chỉ hiển thị nút khi user có quyền phù hợp
 */
const ButtonWithPermissions: React.FC<ButtonWithPermissionsProps> = ({
  permissions = ['Administrator'],
  children,
  onClick,
  className = '',
  ...props
}) => {

  if (!hasPermissions(permissions)) {
    return null;
  }

  return (
    <Button
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonWithPermissions;
