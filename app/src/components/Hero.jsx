import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ weddingDetails }) {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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

    return (
        <section id="hero" className="relative h-screen overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${weddingDetails.heroImage})`,
                    y: y1,
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center"
            >
                <div className="space-y-4 md:space-y-8 w-full max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-4 md:mb-8"
                    >
                        <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto text-rose-400 fill-rose-400/50 animate-pulse drop-shadow-lg" />
                    </motion.div>

                    <div className="space-y-2 md:space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-script drop-shadow-xl"
                        >
                            {weddingDetails.groomName}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="flex items-center justify-center gap-4 md:gap-6 my-2 md:my-4"
                        >
                            <div className="h-px w-10 md:w-32 bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
                            <span className="text-3xl md:text-5xl font-serif italic text-rose-200">&</span>
                            <div className="h-px w-10 md:w-32 bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-script drop-shadow-xl"
                        >
                            {weddingDetails.brideName}
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-base md:text-xl font-light tracking-wide uppercase mt-6 md:mt-8"
                    >
                        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-white/10">
                            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-rose-300" />
                            <span>
                                {weddingDetails.weddingDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-white/10">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-rose-300" />
                            <span>{weddingDetails.location}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="absolute bottom-24 md:bottom-32 w-full px-4"
                >
                    <div className="flex flex-wrap justify-center gap-3 md:gap-8 bg-black/10 backdrop-blur-md py-4 md:py-6 px-4 md:px-10 rounded-2xl border border-white/10 mx-auto max-w-[90%] md:max-w-4xl shadow-2xl">
                        {[
                            { label: 'Days', value: countdown.days },
                            { label: 'Hours', value: countdown.hours },
                            { label: 'Minutes', value: countdown.minutes },
                            { label: 'Seconds', value: countdown.seconds },
                        ].map((item, index) => (
                            <div key={index} className="text-center min-w-[60px] md:min-w-[90px]">
                                <div className="text-2xl md:text-5xl font-bold font-serif mb-1 tabular-nums">
                                    {item.value.toString().padStart(2, '0')}
                                </div>
                                <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] text-rose-200/80">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 backdrop-blur-sm">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
