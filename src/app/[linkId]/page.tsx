'use client'

import { getLink, payLink } from "@/services/web3service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Link {
    url: string;
    owner: string;
    fee: number;
    createdAt: number;
    buyCounter: number;
}
export default function Home() {

    const [message, setMessage] = useState("")
    const [link, setLink] = useState<Link | null>({ fee: 0, url: "", owner: "", createdAt: 0, buyCounter: 0 });

    const params = useParams();

    useEffect(() => {
        const linkId = typeof params.linkId === "string" ? params.linkId : "";
        getLink(linkId).then((data: Link) => {
            setLink(data);
            console.log(data)
            if (data.url) {
                setMessage(`Link encontrado! Acesse: ${data.url} com uma taxa de ${data.fee} wei`);
            } else {
                setLink(data);
            }
        }).catch((error) => {
            setMessage(`Erro ao buscar link: ${error.message}`);
        });
    }, [params.linkId]);

    const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const fee = formData.get("fee");
        if (typeof fee === "string") {
            try {
                const result = await payLink(String(params.linkId), fee);
                setMessage(`Pagamento bem-sucedido! ${result.linkId}`);
            } catch (error) {
                setMessage(`Erro ao processar pagamento: ${error.message}`);
            }
        }
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
                <h1 className="text-4xl font-bold text-gray-700 font-serif">Link Protegido</h1>
                {link?.url ? (
                    <a href={link.url} className="text-blue-500 underline">{link.url}</a>
                ) : (
                    <>
                        <p className="text-lg font-semibold">
                            Para acessar esse link conecte sua carteira e confirme o pagamento de <strong>{link?.fee || 0} wei</strong>
                        </p>
                        <form action="" className="flex flex-col w-full max-w-md" onSubmit={handlePayment}>
                            <label htmlFor="fee">Pagar para acessar link</label>
                            <input className="border mb-4 text-sm border-gray-300 p-2 rounded text-center" type="number" placeholder="Defina a taxa por clique" name="fee" />
                            <button className="bg-blue-500 text-white p-2 rounded" type="submit">Pagar</button>
                        </form>
                    </>
                )}
                <div role="alert">{message}</div>
            </main>
        </>
    );
}
