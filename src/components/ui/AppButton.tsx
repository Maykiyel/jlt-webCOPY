import { UnstyledButton, Loader } from "@mantine/core";
import type { ComponentType } from "react";
import classes from "./AppButton.module.css";
import { ArrowRightAlt } from "@nine-thirty-five/material-symbols-react/outlined";

type AppButtonVariant = "primary" | "secondary";

interface AppButtonProps {
  variant?: AppButtonVariant;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ComponentType<{ width?: number | string; height?: number | string }>;
}

export function AppButton({
  variant = "primary",
  children,
  className,
  loading,
  disabled,
  type = "button",
  onClick,
  icon: BadgeIcon = ArrowRightAlt,
}: AppButtonProps) {
  return (
    <UnstyledButton
      className={`${classes.root} ${classes[variant]} ${className ?? ""}`}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      <span className={classes.label}>{children}</span>

      {variant === "primary" && (
        <span className={classes.arrowBadge}>
          {loading ? (
            <Loader size="1rem" color="#1e2d45" />
          ) : (
            <BadgeIcon width="1.25rem" height="1.25rem" />
          )}
        </span>
      )}
    </UnstyledButton>
  );
}
