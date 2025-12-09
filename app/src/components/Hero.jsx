import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ weddingDetails }) {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date().getTime();
            const distance = weddingDetails.weddingDate.getTime() - now;

            if (distance > 0) {
                setCountdown({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        };

        calculateCountdown();
        const timer = setInterval(calculateCountdown, 1000);
        return () => clearInterval(timer);
    }, [weddingDetails.weddingDate]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="hero" className="relative h-screen overflow-hidden">
            {/* Background Image with Parallax */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${weddingDetails.heroImage})`,
                    transform: `translateY(${scrollY * 0.5}px)`,
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                >
                    <Heart className="w-16 h-16 mx-auto text-rose-400 fill-rose-400/50 animate-pulse" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-script mb-2 drop-shadow-lg">
                        {weddingDetails.groomName}
                    </h1>
                    <div className="flex items-center justify-center gap-6 my-4">
                        <div className="h-px w-12 md:w-24 bg-rose-200/80"></div>
                        <span className="text-3xl md:text-5xl font-serif italic text-rose-200">&</span>
                        <div className="h-px w-12 md:w-24 bg-rose-200/80"></div>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-script mb-8 drop-shadow-lg">
                        {weddingDetails.brideName}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-4 mb-12"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg md:text-xl font-light tracking-wide">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-rose-300" />
                            <span>
                                {weddingDetails.weddingDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-rose-300" />
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-rose-300" />
                            <span>{weddingDetails.venue}, {weddingDetails.location}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-8"
                >
                    {[
                        { label: 'Days', value: countdown.days },
                        { label: 'Hours', value: countdown.hours },
                        { label: 'Minutes', value: countdown.minutes },
                        { label: 'Seconds', value: countdown.seconds },
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 md:p-4 min-w-[80px] md:min-w-[100px]">
                                <span className="text-3xl md:text-4xl font-bold font-serif">{item.value.toString().padStart(2, '0')}</span>
                            </div>
                            <span className="text-xs md:text-sm uppercase tracking-widest mt-2 block text-rose-200">{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
