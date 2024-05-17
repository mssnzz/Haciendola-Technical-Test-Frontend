"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
  labels
} from "@/app/dashboard/inventory/data/data";
import { Badge } from "./ui/badge";
import { DataTableRowActions } from "./data-table-row-actions";
import { ScrollArea } from "./ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ColumnsProps {
  onEdit: (product: any) => void;
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<any>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true, // Permite ordenar esta columna
    enableHiding: false, // Deshabilita la capacidad de ocultar esta columna
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titulo" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableResizing: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
    cell: ({ row }) => (
      <Popover>
        <div className="w-[120px]">
          <PopoverTrigger className="border p-2 rounded-sm">
            Ver detalles
          </PopoverTrigger>
          <PopoverContent className="w-[450px] h-[200px]">
            <ScrollArea className="w-[425px] h-[175px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: row.getValue("description"),
                }}
              />
            </ScrollArea>
          </PopoverContent>
        </div>
      </Popover>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sku" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("sku")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "grams",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grams" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("grams")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("price")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "comparePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio comparado" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("comparePrice")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "barcode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Barcode" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("barcode")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} />,
  },
];
