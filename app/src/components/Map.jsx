import React from 'react';
import { MapPin } from 'lucide-react';

import groomMap from '../../images/maps/groom.png';
import brideMap from '../../images/maps/image.png';

export default function Map({ weddingDetails }) {
    const locations = [
        {
            title: "Groom's Family Home",
            address: weddingDetails.groomDetailAddress,
            locationRaw: weddingDetails.groomDetailAddress,
            type: 'Groom',
            image: groomMap
        },
        {
            title: "Bride's Family Home",
            address: weddingDetails.brideDetailAddress,
            locationRaw: weddingDetails.brideDetailAddress,
            type: 'Bride',
            image: brideMap
        }
    ];

    return (
        <section id="map" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">The Venues</h2>
                    <p className="text-gray-500 font-light uppercase tracking-wide">We can't wait to see you there</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {locations.map((loc, index) => (
                        <div key={index} className="space-y-6">
                            {/* Map Image Placeholder */}
                            <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative group">
                                <img
                                    src={loc.image}
                                    alt="Google Maps View of Location"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg transform group-hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-rose-500" />
                                        <span className="font-medium text-gray-800">View on Google Maps</span>
                                    </div>
                                </a>
                            </div>

                            {/* Info */}
                            <div className="text-center space-y-3">
                                <h3 className="text-2xl font-serif text-gray-800">{loc.title}</h3>
                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <MapPin className="w-5 h-5 text-rose-400" />
                                    <p className="text-lg">{loc.address}</p>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-rose-500 hover:text-rose-600 font-medium underline underline-offset-4"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
