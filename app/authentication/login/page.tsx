"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/inventory";

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.elements) {
      console.error("Form elements are undefined");
      return;
    }

    const { username, password } = form.elements;

    if (!username || !password) {
      console.error("Email or password inputs are undefined");
      return;
    }

    const data = {
      username: username.value,
      password: password.value,
    };

    if (data) {
      const username = data.username;
      const password = data.password;
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
      if (result?.ok == true) {
        toast.success("Conexión exitosa");

        router.push(callbackUrl);
      } else {
        toast.error("Ha ocurrido un error al iniciar sesión");
      }

    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-[url('https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center">
      <Card className="mx-auto max-w-sm w-11/12 bg-white shadow-lg rounded-lg ">
        <div className="flex items-center justify-center py-6">
          <Image src="/logo.webp" alt="" width={300} height={100} />
        </div>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold">Iniciar sesión</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label
                className="block font-medium text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Nombre de usuario
              </Label>
              <Input
                className="px-4 py-3"
                id="username"
                placeholder="Escribe tu nombre de usuario"
                required
                name="username"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label
                className="block font-medium text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                Contraseña
              </Label>
              <Input
                className="px-4 py-3"
                id="password"
                placeholder="Escribe tu contraseña"
                required
                name="password"
                type="password"
              />
            </div>

            <Button
              className="w-full bg-[#FF0D58] hover:bg-[#FF0D58]/70 "
              type="submit"
            >
              Iniciar sesión
            </Button>
            <Link href={"/authentication/register"}>
              <Button
                className="w-full"
                style={{ marginTop: "6px" }}
                variant={"outline"}
              >
                Crear nueva cuenta
              </Button>
            </Link>
            <Link href={"/authentication/forgot"}>
              <Button
                className="w-full"
                style={{ marginTop: "6px" }}
                variant={"outline"}
              >
                Has olvidado tu contraseña
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
