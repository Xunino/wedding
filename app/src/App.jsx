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
import GrainOverlay from './components/GrainOverlay';


// Import optimized images
const thumbValues = import.meta.glob('./assets/images/thumbnails/*.jpg', { eager: true, import: 'default' });
const largeValues = import.meta.glob('./assets/images/large/*.jpg', { eager: true, import: 'default' });

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
    brideDescription: "Một tâm hồn tìm thấy phép màu từ những điều bình dị nhất, cô mang theo nụ cười rạng rỡ thắp sáng mọi ngày. Với Thủy, hạnh phúc không phải là đích đến, mà là niềm vui bình yên khi sẻ chia những khoảnh khắc ý nghĩa nhất của cuộc đời cùng người mình yêu.",
    brideImage: getImage('HERO0164'), // Fallback to first image if specific one not found

    groomName: 'Đức Linh',
    groomFatherName: 'Nguyễn Như Thơ',
    groomMotherName: 'Bùi Thị Phóng',
    groomDetailAddress: 'Số 7 Ngách 6 Ngõ 132 Đường Đinh Điền',
    groomAddress: 'Hoa Lư, Ninh Bình, Việt Nam',
    groomDescription: "Chân thành, ấm áp và luôn là chỗ dựa vững chắc của sự lạc quan. Với Linh, cuộc sống là một cuộc phiêu lưu tươi đẹp, và món quà lớn nhất là tìm được người bạn đời hoàn hảo để cùng viết nên chương mới tràn ngập tiếng cười, sự trưởng thành và tình yêu bất tận.",
    groomImage: getImage('HERO0332'), // Fallback to first image if specific one not found

    weddingDate: new Date('2026-01-12T09:00:00'),
    venue: 'Hoa Lư & Kim Sơn',
    location: 'Ninh Bình, Việt Nam',
    heroImage: getImage('HERO9942'), // Fallback to first image if specific one not found
    heroImageMobile: getImage('HERO0512'),
};

const WEDDING_PHOTOS = Object.entries(largeValues).map(([path, full], index) => {
    const fileName = path.split('/').pop();
    const thumbPath = Object.keys(thumbValues).find(p => p.endsWith(fileName));

    // Assign categories in rotation for variety
    const categories = ['couple', 'ceremony', 'reception', 'details'];
    const category = categories[index % categories.length];

    return {
        id: index + 1,
        thumb: thumbValues[thumbPath] || galleryThumbs[index % galleryThumbs.length],
        full: full,
        category: category,
        title: `Khoảnh Khắc Cưới ${index + 1}`
    };
});

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
                    <p className="text-rose-500 font-serif text-xl animate-pulse">Đang tải Câu Chuyện Tình Yêu...</p>
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
            <GrainOverlay />
        </div>
    );
}

export default App;