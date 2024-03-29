"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ButtonAccount from '@/components/ButtonAccount';

export default function Dashboard() {
    const { data: session } = useSession();
    const [userDesigns, setUserDesigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDesigns = async () => {
            if (!session) return;

            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/imageUpload`);
                if (!response.ok) {
                    throw new Error('Failed to fetch designs');
                }
                const designs = await response.json();
                const userUploadedDesigns = designs.filter(design => design.userEmail === session.user.email);
                setUserDesigns(userUploadedDesigns);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDesigns();
    }, [session]);

    const handleDelete = async (imageId) => {
        const confirmation = prompt('To confirm deletion, type "delete":');
        if (confirmation !== 'delete') {
            console.log('Deletion canceled.');
            return;
        }
    
        try {
            const response = await fetch('/api/deleteImage', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageId }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete image');
            }
    
            // Remove the deleted image from the userDesigns array
            setUserDesigns(userDesigns.filter(design => design._id !== imageId));
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };
    

    return (
        <main className="bg-white text-black min-h-screen p-8 pb-24">
            <section>
                <ButtonAccount></ButtonAccount>
                <h2 className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Your Uploaded Designs
                </h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : userDesigns.length > 0 ? (
                    <div className="grid">
                        {userDesigns.map((design) => (
                            <div key={design._id} className="image-container">
                                <img src={design.data} alt="Gallery item" />
                                <button onClick={() => handleDelete(design._id)} className="delete-btn">Delete</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven&apos;t uploaded any public designs yet.</p>
                )}
            </section>
            <style jsx>{`
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    justify-content: center;
                }

                .image-container {
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                    position: relative;
                }

                .image-container:hover {
                    transform: scale(1.05);
                }

                .image-container img {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                }

                .delete-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: #ff4d4d;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                    font-size: 14px;
                }

                .delete-btn:hover {
                    background-color: #ff1a1a;
                }

                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                }

                p {
                    text-align: center;
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </main>
    );
}







/*
"use client"
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ButtonAccount from '@/components/ButtonAccount';

export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export default function Dashboard() {
    const { data: session } = useSession();
    const [userDesigns, setUserDesigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDesigns = async () => {
            if (!session) return;

            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/imageUpload`);
                if (!response.ok) {
                    throw new Error('Failed to fetch designs');
                }
                const designs = await response.json();
                const userUploadedDesigns = designs.filter(design => design.userEmail === session.user.email);
                setUserDesigns(userUploadedDesigns);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDesigns();
    }, [session]);

    return (
        <main className="bg-white text-black min-h-screen p-8 pb-24">
            <section>
                <ButtonAccount></ButtonAccount>
                <h2 className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
                    Your Uploaded Designs
                </h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : userDesigns.length > 0 ? (
                    <div className="grid">
                        {userDesigns.map((design) => (
                            <div key={design._id} className="image-container">
                                <img src={design.data} alt="Gallery item" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven&apos;t uploaded any public designs yet.</p>
                )}
            </section>
            <style jsx>{`
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    justify-content: center;
                }

                .image-container {
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                    position: relative;
                }

                .image-container:hover {
                    transform: scale(1.05);
                }

                .image-container img {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                }

                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                }

                p {
                    text-align: center;
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </main>
    );
}
*/