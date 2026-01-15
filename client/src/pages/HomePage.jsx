import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

export function HomePage() {
    const { loading } = useAuth();

    
    // Wait for auth to load
    if (loading) {
        return <div>Loading...</div>;
    }


    
    return (
        <div>
           Hi
        </div>
    );
}