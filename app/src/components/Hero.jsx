import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ weddingDetails }) {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    // Parallax Effects
    const yText = useTransform(scrollY, [0, 300], [0, 100]);
    const opacityText = useTransform(scrollY, [0, 200], [1, 0]);
    const blurText = useTransform(scrollY, [0, 200], ["0px", "10px"]);

    const yPills = useTransform(scrollY, [0, 300], [0, 150]);
    const opacityPills = useTransform(scrollY, [0, 300], [1, 0]);

    const yCountdown = useTransform(scrollY, [0, 300], [0, 200]);
    const opacityCountdown = useTransform(scrollY, [0, 400], [1, 0]);

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
        <section id="hero" className="relative h-[100dvh] overflow-hidden bg-black md:bg-black">
            {/* Desktop Background Image with Parallax */}
            <motion.div
                className="hidden md:block absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${weddingDetails.heroImage})`,
                    y: y1,
                    willChange: "transform"
                }}
            />

            {/* Mobile Optimized Background (Full Cover) */}
            <div className="md:hidden absolute inset-0 bg-[#F5F5F7]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
                    style={{ backgroundImage: `url(${weddingDetails.heroImageMobile || weddingDetails.heroImage})` }}
                />
            </div>

            {/* Overlay - Desktop Only */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-30" />

            {/* Content */}
            <motion.div
                className="relative h-full flex flex-col items-center justify-start md:justify-center px-4 text-center pt-15 md:pt-0 pb-0 md:pb-40 lg:pb-48"
            >
                <div className="space-y-4 md:space-y-6 w-full max-w-4xl relative z-40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-4 md:mb-6"
                        style={{ opacity: opacityText, filter: blurText }}
                    >
                        <Heart className="w-10 h-10 md:w-16 md:h-16 mx-auto text-rose-400 fill-rose-400/50 animate-pulse drop-shadow-lg" />
                    </motion.div>

                    <motion.div style={{ y: yText, opacity: opacityText, filter: blurText }} className="flex flex-col md:space-y-3 items-center justify-center">
                        <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-script leading-tight text-rose-900 md:text-white md:drop-shadow-xl"
                            >
                                {weddingDetails.groomName}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="flex items-center justify-center gap-2 md:gap-6 my-0 md:my-5"
                            >
                                <div className="hidden md:block h-px w-8 md:w-32 bg-gradient-to-r from-transparent via-rose-400 md:via-rose-200 to-transparent"></div>
                                <span className="text-xl md:text-5xl font-serif italic text-rose-600 md:text-rose-200 md:drop-shadow-none">&</span>
                                <div className="hidden md:block h-px w-8 md:w-32 bg-gradient-to-r from-transparent via-rose-400 md:via-rose-200 to-transparent"></div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                                className="text-2xl sm:text-4xl md:text-7xl lg:text-8xl font-script leading-tight text-rose-900 md:text-white md:drop-shadow-xl"
                            >
                                {weddingDetails.brideName}
                            </motion.h1>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Info & Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="absolute bottom-16 md:bottom-20 w-full px-4 z-40 flex flex-col items-center gap-4 md:gap-6"
                >
                    {/* Info Pills (Date & Location) - Moved here for mobile layout */}
                    <motion.div style={{ y: yPills, opacity: opacityPills }} className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-[10px] md:text-xl font-medium md:font-light tracking-widest uppercase">
                        <div className="flex items-center gap-2 bg-white/60 md:bg-black/20 backdrop-blur-sm md:backdrop-blur-sm px-3 md:px-6 py-1.5 md:py-2 rounded-full border border-rose-100 md:border-white/10 text-rose-900 md:text-white shadow-sm md:shadow-none">
                            <Calendar className="w-3 md:w-5 h-3 md:h-5 text-rose-500 md:text-rose-300" />
                            <span>
                                {weddingDetails.weddingDate.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 md:bg-black/20 backdrop-blur-sm md:backdrop-blur-sm px-3 md:px-6 py-1.5 md:py-2 rounded-full border border-rose-100 md:border-white/10 text-rose-900 md:text-white shadow-sm md:shadow-none">
                            <MapPin className="w-3 md:w-5 h-3 md:h-5 text-rose-500 md:text-rose-300" />
                            <span>{weddingDetails.location}</span>
                        </div>
                    </motion.div>

                    {/* Countdown Timer */}
                    <motion.div style={{ y: yCountdown, opacity: opacityCountdown }} className="flex justify-center gap-3 md:gap-8 bg-white/60 md:bg-black/10 backdrop-blur-sm md:backdrop-blur-md py-4 md:py-6 px-4 md:px-10 rounded-2xl border border-rose-100 md:border-white/10 mx-auto max-w-[95%] md:max-w-4xl shadow-sm md:shadow-2xl text-rose-900 md:text-white">
                        {[
                            { label: 'Days', value: countdown.days },
                            { label: 'Hours', value: countdown.hours },
                            { label: 'Mins', value: countdown.minutes },
                            { label: 'Secs', value: countdown.seconds },
                        ].map((item, index) => (
                            <div key={index} className="text-center min-w-[50px] md:min-w-[90px]">
                                <div className="text-2xl md:text-5xl font-bold font-serif mb-0.5 md:mb-1 tabular-nums">
                                    {item.value.toString().padStart(2, '0')}
                                </div>
                                <span className="text-[8px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] text-rose-400 md:text-rose-200/80">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
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
        </section >
    );
}
