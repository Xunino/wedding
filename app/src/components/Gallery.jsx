import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = [
    { id: 'all', name: 'Tất cả' },
    { id: 'ceremony', name: 'Lễ Cưới' },
    { id: 'couple', name: 'Cặp Đôi' },
    { id: 'reception', name: 'Tiệc Cưới' },
    { id: 'details', name: 'Chi Tiết' },
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
        <section id="gallery" className="py-16 md:py-32 bg-rose-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-2 md:mb-4">Khoảnh Khắc Đáng Nhớ</h2>
                    <p className="text-gray-500 font-light tracking-wide uppercase text-xs md:text-sm">Kỷ niệm lưu giữ mãi mãi</p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setSelectedCategory(category.id);
                                setIsExpanded(false);
                            }}
                            className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 relative overflow-hidden group ${selectedCategory === category.id
                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                                : 'bg-white text-gray-600 hover:text-rose-600 border border-gray-200'
                                }`}
                        >
                            <span className="relative z-10">{category.name}</span>
                            {selectedCategory !== category.id && (
                                <div className="absolute inset-0 bg-rose-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                >
                    <AnimatePresence mode='popLayout'>
                        {visiblePhotos.map((photo) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={photo.id}
                                className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg md:rounded-xl bg-gray-100 shadow-sm md:shadow-md hover:shadow-xl transition-shadow duration-300"
                                onClick={() => openLightbox(photo)}
                            >
                                <img
                                    src={photo.thumb}
                                    alt={photo.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 text-center px-2">
                                        <Camera className="w-6 md:w-8 h-6 md:h-8 text-white mx-auto mb-1 md:mb-2" />
                                        <span className="text-white font-serif text-sm md:text-lg block line-clamp-1">{photo.title}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredPhotos.length > 8 && (
                    <div className="mt-8 md:mt-12 text-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-white border border-gray-200 rounded-full text-xs md:text-sm text-gray-600 font-medium hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                        >
                            {isExpanded ? (
                                <>
                                    Thu gọn <ChevronUp className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    Xem thêm <ChevronDown className="w-4 h-4" />
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
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 md:backdrop-blur-md p-2 md:p-4"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20 z-[110]"
                        >
                            <X className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
                            className="absolute left-1 md:left-4 p-2 md:p-4 text-white/50 hover:text-white transition-colors hover:scale-110 z-[110]"
                        >
                            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
                            className="absolute right-1 md:right-4 p-2 md:p-4 text-white/50 hover:text-white transition-colors hover:scale-110 z-[110]"
                        >
                            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-full md:max-w-6xl max-h-[80vh] md:max-h-[90vh] relative mt-[-20px] md:mt-0"
                        >
                            <img
                                src={selectedPhoto.full}
                                alt={selectedPhoto.title}
                                className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-sm shadow-2xl"
                            />
                            <div className="absolute -bottom-8 md:-bottom-10 left-0 right-0 text-center text-white px-4">
                                <h3 className="text-lg md:text-2xl font-serif tracking-wide truncate">{selectedPhoto.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
