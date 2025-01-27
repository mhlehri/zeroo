"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-amber-950 group-[.toaster]:border-amber-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-amber-950 dark:group-[.toaster]:text-amber-50 dark:group-[.toaster]:border-amber-800",
          description:
            "group-[.toast]:text-amber-500 dark:group-[.toast]:text-amber-400",
          actionButton:
            "group-[.toast]:bg-amber-900 group-[.toast]:text-amber-50 dark:group-[.toast]:bg-amber-50 dark:group-[.toast]:text-amber-900",
          cancelButton:
            "group-[.toast]:bg-amber-100 group-[.toast]:text-amber-500 dark:group-[.toast]:bg-amber-800 dark:group-[.toast]:text-amber-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
