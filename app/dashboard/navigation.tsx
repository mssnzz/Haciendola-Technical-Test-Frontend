// components/navigation.tsx
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Package,
  Bot,
  Code2,
  Book,
  Settings2,
  LifeBuoy,
  SquareUser,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = ({ currentPage }: { currentPage: string }) => {
  const navItems = [
    { icon: LayoutGrid, label: "Dashboard", page: "dashboard" },

    { icon: Package, label: "Inventario", page: "inventory" },
  ];

  return (
    <nav className="grid gap-1 p-2">
      {navItems.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${
                currentPage === item.page ? "bg-muted" : ""
              }`}
              aria-label={item.label}
            >
              <item.icon className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            {item.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
};

export default Navigation;
