import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="text-center">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={300}
          height={100}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">
          Bienvenido a la prueba tecnica
        </h1>
        <p className="text-lg mb-4">Manuel Sanchez.</p>
        <p className="text-lg">¡Disfruta tu estancia!</p>
        <Link href={"/login"}>
          <Button>Iniciar sesión</Button>
        </Link>
      </div>
    </main>
  );
}
