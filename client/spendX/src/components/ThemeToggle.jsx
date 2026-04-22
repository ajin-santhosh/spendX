import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Settings } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
const triggerIcon = {
  light: <Sun className="h-4 w-4" />,
  dark: <Moon className="h-4 w-4" />,
  system: <Settings className="h-4 w-4" />,
};
function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {triggerIcon[theme]}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-10" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
              <DropdownMenuShortcut>
                <Moon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
              <DropdownMenuShortcut>
                <Sun className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
              <DropdownMenuShortcut>
                <Settings className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ThemeToggle;
