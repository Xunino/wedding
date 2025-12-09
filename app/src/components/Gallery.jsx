import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = [
    { id: 'all', name: 'All' },
    { id: 'ceremony', name: 'Ceremony' },
    { id: 'couple', name: 'Couple' },
    { id: 'reception', name: 'Reception' },
    { id: 'details', name: 'Details' },
];

export default function Gallery({ photos }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const filteredPhotos = selectedCategory === 'all'
        ? photos
        : photos.filter(p => p.category === selectedCategory);

    const visiblePhotos = isExpanded ? filteredPhotos : filteredPhotos.slice(0, 8);

    const openLightbox = (photo) => {
        setSelectedPhoto(photo);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'auto';
    };

    const navigatePhoto = (direction) => {
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredPhotos.length;
        } else {
            newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        }
        setSelectedPhoto(filteredPhotos[newIndex]);
    };

    return (
        <section id="gallery" className="py-20 md:py-32 bg-rose-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Captured Moments</h2>
                    <p className="text-gray-500 font-light tracking-wide uppercase">Memories to cherish forever</p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setSelectedCategory(category.id);
                                setIsExpanded(false);
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.id
                                ? 'bg-rose-500 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    <AnimatePresence>
                        {visiblePhotos.map((photo) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                key={photo.id}
                                className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl bg-gray-100"
                                onClick={() => openLightbox(photo)}
                            >
                                <img
                                    src={photo.thumb}
                                    alt={photo.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredPhotos.length > 8 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-full text-gray-600 font-medium hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 shadow-sm hover:shadow"
                        >
                            {isExpanded ? (
                                <>
                                    Show Less <ChevronUp className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    View More <ChevronDown className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
                            className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
                            className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        <div className="max-w-5xl max-h-[85vh] relative">
                            <img
                                src={selectedPhoto.full}
                                alt={selectedPhoto.title}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg text-white">
                                <h3 className="text-xl font-serif">{selectedPhoto.title}</h3>
                                <p className="text-sm opacity-80 capitalize">{selectedPhoto.category}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
