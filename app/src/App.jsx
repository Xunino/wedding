import React, { useState, useEffect } from 'react';
import './styles/fonts.css';
import './styles/animations.css';
import './styles/global.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Map from './components/Map';
import RSVP from './components/RSVP';
import Gift from './components/Gift';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

// Import optimized images
const thumbValues = import.meta.glob('../images/thumbnails/*.JPG', { eager: true, import: 'default' });
const largeValues = import.meta.glob('../images/large/*.JPG', { eager: true, import: 'default' });

// Helper to get image by name
const getImage = (name, type = 'large') => {
    const values = type === 'thumb' ? thumbValues : largeValues;
    const path = Object.keys(values).find(path => path.includes(name));
    return path ? values[path] : null;
};

// Get all images as arrays for fallback
const galleryThumbs = Object.values(thumbValues);
const galleryLarge = Object.values(largeValues);

// Wedding Data
const WEDDING_DETAILS = {
    brideName: 'Thu Thủy',
    brideFatherName: 'Nguyễn Văn Phong',
    brideMotherName: 'Phạm Thị Hà',
    brideDetailAddress: 'Rạp Kim Mâu, Năm Dân',
    brideAddress: 'Kim Sơn, Ninh Bình, Việt Nam',
    brideDescription: "Gentle and warm, she loves the simple little things in life and always believes in the magic of true love.",
    brideImage: getImage('HERO0164.JPG'), // Fallback to first image if specific one not found

    groomName: 'Đức Linh',
    groomFatherName: 'Nguyễn Như Thơ',
    groomMotherName: 'Bùi Thị Phóng',
    groomDetailAddress: 'Số 7 Ngách 6 Ngõ 132 Đường Đinh Điền',
    groomAddress: 'Hoa Lư, Ninh Bình, Việt Nam',
    groomDescription: "Mature and sincere. For him, happiness is simply walking together and sharing every moment with the one he loves.",
    groomImage: getImage('HERO0332.JPG'), // Fallback to first image if specific one not found

    weddingDate: new Date('2026-01-12T09:00:00'),
    venue: 'Hoa Lư & Kim Sơn',
    location: 'Ninh Bình, Việt Nam',
    heroImage: getImage('HERO9942.JPG'), // Fallback to first image if specific one not found
};

const WEDDING_PHOTOS = [
    { id: 1, thumb: galleryThumbs[0 % galleryThumbs.length], full: galleryLarge[0 % galleryLarge.length], category: 'ceremony', title: 'The Ceremony' },
    { id: 2, thumb: galleryThumbs[1 % galleryThumbs.length], full: galleryLarge[1 % galleryLarge.length], category: 'couple', title: 'First Look' },
    { id: 3, thumb: galleryThumbs[2 % galleryThumbs.length], full: galleryLarge[2 % galleryLarge.length], category: 'reception', title: 'Reception Hall' },
    { id: 4, thumb: galleryThumbs[3 % galleryThumbs.length], full: galleryLarge[3 % galleryLarge.length], category: 'couple', title: 'Love Story' },
    { id: 5, thumb: galleryThumbs[4 % galleryThumbs.length], full: galleryLarge[4 % galleryLarge.length], category: 'ceremony', title: 'The Vows' },
    { id: 6, thumb: galleryThumbs[5 % galleryThumbs.length], full: galleryLarge[5 % galleryLarge.length], category: 'reception', title: 'First Dance' },
    { id: 7, thumb: galleryThumbs[6 % galleryThumbs.length], full: galleryLarge[6 % galleryLarge.length], category: 'details', title: 'Wedding Rings' },
    { id: 8, thumb: galleryThumbs[7 % galleryThumbs.length], full: galleryLarge[7 % galleryLarge.length], category: 'couple', title: 'Golden Hour' },
    { id: 9, thumb: galleryThumbs[8 % galleryThumbs.length], full: galleryLarge[8 % galleryLarge.length], category: 'ceremony', title: 'Walking Down Aisle' },
    { id: 10, thumb: galleryThumbs[9 % galleryThumbs.length], full: galleryLarge[9 % galleryLarge.length], category: 'reception', title: 'Celebration' },
    { id: 11, thumb: galleryThumbs[10 % galleryThumbs.length], full: galleryLarge[10 % galleryLarge.length], category: 'details', title: 'Bouquet' },
    { id: 12, thumb: galleryThumbs[11 % galleryThumbs.length], full: galleryLarge[11 % galleryLarge.length], category: 'couple', title: 'Sunset Romance' },
    { id: 13, thumb: galleryThumbs[12 % galleryThumbs.length], full: galleryLarge[12 % galleryLarge.length], category: 'ceremony', title: 'The Kiss' },
    { id: 14, thumb: galleryThumbs[13 % galleryThumbs.length], full: galleryLarge[13 % galleryLarge.length], category: 'reception', title: 'Party Time' },
    { id: 15, thumb: galleryThumbs[14 % galleryThumbs.length], full: galleryLarge[14 % galleryLarge.length], category: 'details', title: 'Table Setting' },
];

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading assets
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-rose-50 flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-rose-500 font-serif text-xl animate-pulse">Loading Love Story...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-rose-200 selection:text-rose-900">
            <Navbar />
            <Hero weddingDetails={WEDDING_DETAILS} />
            <Couple weddingDetails={WEDDING_DETAILS} />
            <Timeline />
            <Gallery photos={WEDDING_PHOTOS} />
            <Map weddingDetails={WEDDING_DETAILS} />
            <RSVP />
            <Gift />
            <Footer weddingDetails={WEDDING_DETAILS} />
            <MusicPlayer />
        </div>
    );
}

export default App;