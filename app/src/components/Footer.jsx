import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ weddingDetails }) {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <Heart className="w-8 h-8 text-rose-500 mx-auto mb-6 fill-current" />
                <h2 className="text-3xl font-script mb-4">{weddingDetails.groomName} & {weddingDetails.brideName}</h2>
                <p className="text-gray-400 text-sm tracking-wide uppercase mb-8">Thank you for celebrating with us</p>
                <p className="text-gray-600 text-xs">
                    © {weddingDetails.weddingDate.getFullYear()} Wedding App. Made with love.
                </p>
            </div>
        </footer>
    );
}
