import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
        <h1 className="text-4xl font-bold text-gray-700 font-serif">LinkShield</h1>
        <p className="text-lg font-semibold">Proteja seus links e lucre com eles!</p>
        <form action="" className="flex flex-col w-full max-w-md">
          <label htmlFor="link">Cole seu link:</label>
          <input className="border mb-4 text-sm border-gray-300 p-2 rounded text-center" type="text" placeholder="Cole seu link aqui" />
          <label htmlFor="fee">Taxa por clique</label>
          <input className="border mb-4 text-sm border-gray-300 p-2 rounded text-center" type="number" placeholder="Defina a taxa por clique" />
          <button className="bg-blue-500 text-white p-2 rounded" type="submit">Proteger Link</button>
        </form>
      </main>
    </>
  );
}
