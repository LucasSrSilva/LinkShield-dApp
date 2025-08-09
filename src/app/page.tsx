'use client'

import { useState } from "react";
import hash from 'object-hash'
import { addLink, connectContract } from "@/services/web3service";

export default function Home() {
  const [url, setUrl] = useState("");
  const [fee, setFee] = useState(0);
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || fee <= 0) {
      setMessage("Por favor, preencha todos os campos corretamente.");
      return;
    }
    const linkId = hash(url).slice(0, 6);
    setMessage(`Link protegido com sucesso! Taxa por clique: ${fee} wei link id: ${linkId}`);
    addLink({ url, linkId, feeInWei: fee }).then(() => {
      setUrl("");
      setFee(0);
      setMessage(`Link adicionado com sucesso! acesse: http://localhost:3000/${linkId}`);
    }).catch((error) => {
      setMessage(`Erro ao adicionar link: ${error.message}`);
    });
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
        <h1 className="text-4xl font-bold text-gray-700 font-serif">LinkShield</h1>
        <p className="text-lg font-semibold">Proteja seus links e lucre com eles!</p>
        <form action="" className="flex flex-col w-full max-w-md">
          <label htmlFor="link">Cole seu link:</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="border mb-4 text-sm border-gray-300 p-2 rounded text-center" type="text" placeholder="Cole seu link aqui" />
          <label htmlFor="fee">Taxa por clique</label>
          <input value={fee} onChange={(e) => setFee(Number(e.target.value))} className="border mb-4 text-sm border-gray-300 p-2 rounded text-center" type="number" placeholder="Defina a taxa por clique" />
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded" type="submit">Proteger Link</button>
        </form>
        <div role="alert">{message}</div>
      </main>
    </>
  );
}
