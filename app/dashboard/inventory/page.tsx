"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { profile } from "@/app/services/authentication";
import {
  addProduct,
  updateProduct,
  deleteProducts,
  getMyProducts,
  getProducts,
} from "@/app/services/products";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { BarLoader } from "react-spinners";

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null); 

  const [nombreProducto, setNombreProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [sku, setSku] = useState("");
  const [grams, setGrams] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [precioComparado, setPrecioComparado] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [stock, setStock] = useState("");
  const [handler, setHandler] = useState("");

  const handleOpenModal = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setNombreProducto(product.title);
    setDescripcionProducto(product.description);
    setSku(product.sku);
    setGrams(product.grams);
    setPrecioProducto(product.price);
    setPrecioComparado(product.comparePrice);
    setCodigoBarras(product.barcode);
    setStock(product.stock);
    setHandler(product.handle); 
    setIsOpen(true);
  };

  const { data: session, status } = useSession();

  async function getData() {
    setLoading(true);
    try {
      const prof = await profile(session?.user?.accessToken);
      const response = await getProducts();
      const myProducts = await getMyProducts(prof?.data?.id);
      const myProd = myProducts.data;
      const data = response.data;
      setMyProducts(myProd);
      setData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newProduct = {
      title: nombreProducto,
      description: descripcionProducto,
      sku: sku,
      grams: parseInt(grams), 
      stock: parseInt(stock), 
      price: parseFloat(precioProducto), 
      comparePrice: parseFloat(precioComparado),
      barcode: codigoBarras,
      handle: handler,
      userId: 1,
    };

    let response;
    if (editingProduct) {
      response = await updateProduct(editingProduct.id, newProduct);
    } else {
      console.log(newProduct);
      response = await addProduct(newProduct);
    }

    if (response && !response.error) {
      toast.success(
        editingProduct ? "Producto editado con éxito" : "Producto agregado con éxito"
      );
      setIsOpen(false);
      getData();
    } else {
      toast.error(response.message || "Error al agregar/editar el producto");
    }
  }

  const resetForm = () => {
    setNombreProducto("");
    setDescripcionProducto("");
    setSku("");
    setGrams("");
    setPrecioProducto("");
    setPrecioComparado("");
    setCodigoBarras("");
    setStock("");
    setHandler("");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-full mt-auto bg-gray-50">
          <p>Cargando...</p>
          <BarLoader color="#FF0D58" className="my-4" />
        </CardContent>
      </Card>
    );
  }

  const handleDeleteSelected = async (selectedIds: number[]) => {
    const result = await deleteProducts(selectedIds);
    console.log(result);
    if (!result.error) {
      toast.success("Producto(s) eliminado(s) con éxito");
      getData();
    } else {
      toast.error("Error eliminando producto(s)");
    }
  };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="me">Agregados por mi</TabsTrigger>
          <TabsTrigger value="all">Lista de productos</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            className="h-7 gap-1 bg-[#FF0D58] text-white"
            onClick={handleOpenModal}
          >
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Nuevo producto
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="me">
        <br />
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Mis productos</CardTitle>
            <CardDescription>Visualiza aquí tus productos.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns({ onEdit: handleEdit })}
              data={myProducts}
              onDeleteSelected={handleDeleteSelected}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="all">
        <br />
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Productos</CardTitle>
            <CardDescription>
              Visualiza aquí todos tus productos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns({ onEdit: handleEdit })}
              data={data}
              onDeleteSelected={handleDeleteSelected}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              {editingProduct ? "Editar producto" : "Agregar nuevo producto"}
            </SheetTitle>
            <SheetDescription>
              {editingProduct
                ? "Modifica los campos para editar el producto."
                : "Por favor rellena los campos para agregar un nuevo producto."}
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-6" />
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3">
              <Label htmlFor="name">Nombre del producto</Label>
              <Input
                id="name"
                type="text"
                className="w-full h-12"
                placeholder="Ingrese el nombre del producto"
                name="nombreProducto"
                value={nombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3 mt-4">
              <Label htmlFor="description">Descripción del producto</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Ingrese la descripción del producto"
                name="descripcionProducto"
                value={descripcionProducto}
                onChange={(e) => setDescripcionProducto(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="sku">Sku</Label>
                <Input
                  id="sku"
                  className="w-full h-12"
                  placeholder="Ingrese el sku del producto"
                  name="sku"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="grams">Grams</Label>
                <Input
                  id="grams"
                  placeholder="Ingrese el grams del producto"
                  className="w-full h-12"
                  name="grams"
                  required
                  value={grams}
                  onChange={(e) => setGrams(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-3 pt-4">
              <Label htmlFor="price">Precio del producto</Label>
              <Input
                id="price"
                type="text"
                className="w-full h-12"
                placeholder="Ingrese el precio del producto"
                name="precioProducto"
                required
                value={precioProducto}
                onChange={(e) => setPrecioProducto(e.target.value)}
              />
            </div>
            <div className="grid gap-3 pt-4">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="text"
                className="w-full h-12"
                placeholder="Ingrese el stock del producto"
                name="stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="grid gap-3 pt-4">
              <Label htmlFor="comparedPrice">Precio comparado</Label>
              <Input
                id="comparedPrice"
                type="text"
                className="w-full h-12"
                placeholder="Ingrese el precio comparado del producto"
                name="precioComparado"
                required
                value={precioComparado}
                onChange={(e) => setPrecioComparado(e.target.value)}
              />
            </div>
            <div className="grid gap-3 pt-4">
              <Label htmlFor="barcode">Código de barras</Label>
              <Input
                id="barcode"
                type="text"
                className="w-full h-12"
                placeholder="Ingrese el código de barras del producto"
                name="codigoBarras"
                required
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
              />
            </div>
            <div className="grid gap-3 pt-4">
              <Label htmlFor="handler">Handler</Label>
              <Input
                id="handler"
                type="text"
                className="w-full h-12"
                placeholder="Ingrese el handler del producto"
                name="handler"
                required
                value={handler}
                onChange={(e) => setHandler(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-2 mb-4 bg-[#FF0D58] text-white py-2"
            >
              {editingProduct ? "Guardar cambios" : "Agregar Producto"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </Tabs>
  );
}
