"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (product: any) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
}: DataTableRowActionsProps<TData>) {
  const task: any = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onEdit(task)}>Editar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
