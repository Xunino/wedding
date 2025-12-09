import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Music, Utensils, Camera, Home, Sparkles } from 'lucide-react';

const groomEvents = [
    { time: '09:00 AM', title: 'Welcome Guests (Groom)', icon: Heart, description: 'Guests arrive at Groom\'s house.' },
    { time: '10:00 AM', title: 'Procession Preparation', icon: Home, description: 'Preparing the procession to Bride\'s house.' },
    { time: '11:00 AM', title: 'The Ceremony', icon: Heart, description: 'Exchange of vows at Bride\'s house.' },
    { time: '12:00 PM', title: 'Lunch Reception', icon: Utensils, description: 'Enjoy a delicious meal together.' },
    { time: '02:00 PM', title: 'Music & Party', icon: Music, description: 'Celebration with friends and family.' },
];

const brideEvents = [
    { time: '08:30 AM', title: 'Welcome Guests (Bride)', icon: Heart, description: 'Guests arrive at Bride\'s house.' },
    { time: '10:30 AM', title: 'Welcome Groom', icon: Home, description: 'Welcoming the Groom\'s family.' },
    { time: '11:00 AM', title: 'The Ceremony', icon: Heart, description: 'Official wedding ceremony.' },
    { time: '12:00 PM', title: 'Lunch Reception', icon: Utensils, description: 'Main reception lunch.' },
    { time: '02:00 PM', title: 'Photo Session', icon: Camera, description: 'Photoshoot with the couple.' },
];

export default function Timeline() {
    const [activeTab, setActiveTab] = useState('groom');
    const events = activeTab === 'groom' ? groomEvents : brideEvents;

    return (
        <section id="timeline" className="py-20 md:py-32 bg-gradient-to-b from-white to-rose-50/30 overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 mix-blend-multiply pointer-events-none" />

                <div className="text-center mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-gray-800 mb-6 tracking-tight">
                            Wedding Schedule
                        </h2>
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <span className="h-px w-12 bg-rose-300"></span>
                            <p className="text-2xl text-rose-500 font-serif italic">January 11, 2026</p>
                            <span className="h-px w-12 bg-rose-300"></span>
                        </div>
                        <p className="text-gray-500 font-light tracking-widest uppercase text-sm">A Day of Love & Celebration</p>
                    </motion.div>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-20 relative z-10">
                    <div className="inline-flex bg-white/50 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-white/60">
                        {['groom', 'bride'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 min-w-[160px] ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-rose-600'
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full shadow-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {tab === 'groom' ? "Groom's Family" : "Bride's Family"}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative min-h-[600px] z-10">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-300 to-transparent opacity-60" />
                    </div>

                    <div className="space-y-16">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-16"
                            >
                                {events.map((event, index) => {
                                    const Icon = event.icon;
                                    const isEven = index % 2 === 0;

                                    return (
                                        <motion.div
                                            key={`${activeTab}-${index}`}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                                            className={`relative flex items-center justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'
                                                }`}
                                        >
                                            {/* Content Card */}
                                            <div className={`w-5/12 ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}>
                                                <div className="group relative">
                                                    <div className={`absolute top-0 ${isEven ? '-right-2' : '-left-2'} w-2 h-full bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors duration-300 rounded${isEven ? '-l' : '-r'}-lg`} />

                                                    <div className={`inline-flex items-center gap-2 text-rose-500 font-semibold mb-2 ${isEven ? 'flex-row-reverse' : 'flex-row'
                                                        }`}>
                                                        <div className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 flex items-center gap-2 shadow-sm">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span className="text-sm tracking-wide">{event.time}</span>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-2xl font-serif text-gray-800 mb-2 group-hover:text-rose-600 transition-colors duration-300">
                                                        {event.title}
                                                    </h3>
                                                    <p className="text-gray-500 font-light leading-relaxed">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Center Icon */}
                                            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                                <div className="relative w-14 h-14 hidden md:flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                                                        className="absolute inset-0 bg-rose-100 rounded-full opacity-50"
                                                    />
                                                    <div className="relative w-12 h-12 bg-white border border-rose-200 rounded-full flex items-center justify-center shadow-lg z-10 group hover:border-rose-400 transition-colors duration-300">
                                                        <Icon className="w-5 h-5 text-rose-500 group-hover:text-rose-600 transition-colors duration-300" />
                                                    </div>
                                                </div>

                                                {/* Mobile Dot */}
                                                <div className="md:hidden w-4 h-4 bg-white border-2 border-rose-400 rounded-full z-10 shadow-md transform -translate-y-1/2"></div>
                                            </div>

                                            {/* Empty Space */}
                                            <div className="w-5/12" />
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
