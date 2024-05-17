"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  onDeleteSelected: () => void;
}

export function DataTableViewOptions<TData>({
  table,
  onDeleteSelected,
}: DataTableViewOptionsProps<TData>) {
  const selectedRowIds = table.getSelectedRowModel().flatRows.map((row: any) => row.original.id);

  return (
    <>
      {selectedRowIds.length > 0 && (
        <Button
          variant="destructive"
          size="sm"
          className="h-8 mr-2"
          onClick={onDeleteSelected}
        >
          Eliminar elementos
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            disabled
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            Modificar vista
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
