'use client';
import Image from 'next/image';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
type CatResponse = { _id: string };
async function getCat() {
    return axios
        .get<CatResponse>('https://cataas.com/cat?json=true')
        .then((res) => {
            console.log(res.data);
            return 'https://cataas.com/cat/' + res.data._id;
        });
}

function TanCatQuery() {
    const {
        data: cat,
        isPending,
        error,
    } = useQuery({
        queryKey: ['cat'],
        queryFn: () => getCat(),
    });
    if (isPending) return <h1>Loading...</h1>;
    if (error) return <h1>Error! {error.message}</h1>;
    return (
        <div className="relative h-full w-96">
            <Image
                src={cat}
                alt="Cat"
                fill
                className="h-full w-full object-contain"
            />
        </div>
    );
}
function Cat() {
    const [cat, setCat] = useState('');
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
        'pending'
    );
    const [error, setError] = useState<Error>();
    useEffect(() => {
        async function fetchCat() {
            setStatus('pending');
            try {
                const cat = await getCat(); //'await' expressions are only allowed within async functions and at the top levels of modules.
                setCat(cat);
                setStatus('success');
            } catch (e) {
                console.log(e);
                setStatus('error');
                setError(e as Error);
            }
        }
        fetchCat();
    }, []);
    if (status === 'pending') return <h1>Loading...</h1>;
    if (status === 'error') return <h1>Error! {error?.message}</h1>;
    return (
        <div className="relative h-full w-96">
            <Image
                src={cat}
                alt="Cat"
                fill
                className="h-full w-full object-contain"
            />
        </div>
    );
}
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="flex h-screen w-full items-center justify-center">
                <TanCatQuery />
            </div>
        </main>
    );
}
