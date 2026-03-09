"use client";

import { useTheme } from "next-themes";
import { IconButton } from "@radix-ui/themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <IconButton
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
        >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </IconButton>
    );
}