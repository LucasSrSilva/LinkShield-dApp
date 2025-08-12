'use client'

import { useState } from "react";
import hash from 'object-hash'
import { addLink } from "@/services/web3service";
import Image from "next/image";
export default function CreateLink() {
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
        addLink({ url, linkId, feeInWei: fee }).then(() => {
            setUrl("");
            setFee(0);
            setMessage(`Link adicionado com sucesso! acesse: ${window.location.href}${linkId}`);
        }).catch((error) => {
            setMessage(`Erro ao adicionar link: ${error.message}`);
        }); 3
    }

    return (
        <main className="flex flex-col items-center justify-start px-18 pt-20 gap-20 bg-gray-100 border border-gray-300 shadow">
            <h1 className="text-3xl font-bold text-gray-700">Proteja seus links e lucre com eles</h1>
            <form action="" className="flex flex-col w-full max-w-md">
                <label htmlFor="link">Cole seu link:</label>
                <input value={url} onChange={(e) => setUrl(e.target.value)} className="border bg-white mb-4 text-sm border-gray-300 p-2 rounded" type="text" placeholder="Cole seu link aqui" />
                <label htmlFor="fee">Taxa por clique</label>
                <input value={fee} onChange={(e) => setFee(Number(e.target.value))} className="border bg-white mb-4 text-sm border-gray-300 p-2 rounded text-center" type="number" placeholder="Defina a taxa por clique" />
                <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded flex items-center justify-center relative" type="submit">
                    <p>Proteger Link</p>
                    <Image src={"/metamask.png"} className="absolute right-4" alt="metamask logo" width={24} height={24} />
                </button>
            </form>
            <div className="max-w-full p-10 text-center">
                <p className="block max-w-full wrap-anywhere">{message}</p>
            </div>
        </main>
    );
}
