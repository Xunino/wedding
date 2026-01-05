import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Music, Utensils, Camera, Home, Sparkles, Gift, Users, Star } from 'lucide-react';

const SCHEDULE_DATA = {
    'jan10': {
        title: 'Lễ Ăn Hỏi',
        date: '10 Tháng 1, 2026',
        description: 'Nghi Thức Truyền Thống',
        events: [
            { time: '07:15 AM', title: 'Chuẩn Bị Sính Lễ', icon: Gift, description: 'Nhà trai chuẩn bị các mâm tráp sính lễ cẩn thận.' },
            { time: '08:15 AM', title: 'Trao - Nhận Tráp', icon: Heart, description: 'Đội bê tráp hai bên trao tráp và lì xỳ lấy may.' },
            { time: '08:30 AM', title: 'Làm Lễ Chính Thức', icon: Home, description: 'Hai họ chào hỏi, mở tráp, cô dâu ra mắt, thắp hương gia tiên và bàn bạc chuyện cưới.' },
            { time: '09:30 AM', title: 'Lại Quả & Kết Thúc', icon: Utensils, description: 'Nhà gái lại quả, hai bên dùng tiệc nhẹ và chụp hình lưu niệm.' },
        ]
    },
    'jan11': {
        title: 'Tiệc Cưới',
        date: '11 Tháng 1, 2026',
        description: 'Tiệc Mừng Hạnh Phúc',
        events: [
            { time: '', title: 'Bữa Cơm Thân Mật', icon: Utensils, description: 'Gia đình hân hoan mời quý khách chung vui, dùng bữa cơm thân mật..' },
        ],

    },
    'jan12': {
        title: 'Lễ Thành Hôn',
        date: '12 Tháng 1, 2026',
        description: 'Lễ Cưới Chính Thức',
        events: [
            { time: '07:00 AM', title: 'Lên Đường Đón Dâu', icon: Home, description: 'Phái đoàn nhà trai xuất phát đi đón dâu.' },
            { time: '08:00 AM', title: 'Lễ Tại Nhà Gái', icon: Heart, description: 'Làm lễ xin dâu và nghi thức truyền thống.' },
            { time: '08:30 AM', title: 'Rước Dâu Về Nhà Trai', icon: Utensils, description: 'Đưa cô dâu về ra mắt gia tiên nhà chồng.' },
            { time: '09:30 AM', title: 'Lễ Thành Hôn', icon: Sparkles, description: 'Hoàn thành các nghi lễ, cảm ơn quan khách.' },
        ]
    }
};

const TimelineItem = ({ event, index, isEven }) => {
    const Icon = event.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center justify-between md:justify-center mb-4 md:mb-8 w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
        >
            {/* Empty space for alternating layout on desktop */}
            <div className="hidden md:block w-5/12" />

            {/* Central Line Icon */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 md:border-4 border-rose-100 shadow-sm flex items-center justify-center z-10">
                    <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-rose-500" />
                </div>
            </div>

            {/* Content Card */}
            <div className={`w-[calc(100%-3rem)] ml-10 md:ml-0 md:w-5/12 ${isEven ? 'md:pr-6 md:text-right' : 'md:pl-6 md:text-left'
                }`}>
                <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-rose-50 hover:shadow-md transition-shadow duration-300 relative group">
                    {/* Time Badge */}
                    <div className={`absolute -top-2.5 ${isEven ? 'md:right-4 left-4 md:left-auto' : 'left-4'
                        }`}>
                        <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-sm shadow-rose-200">
                            {event.time}
                        </span>
                    </div>

                    <div className="mt-1.5">
                        <h3 className="text-base font-serif font-semibold text-gray-800 mb-0.5 group-hover:text-rose-600 transition-colors">
                            {event.title}
                        </h3>
                        <p className="text-gray-600 font-sans text-[11px] md:text-xs leading-relaxed font-light">
                            {event.description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function Timeline() {
    const [activeTab, setActiveTab] = useState('jan12');
    const events = SCHEDULE_DATA[activeTab].events;

    return (
        <section id="timeline" className="py-12 md:py-20 bg-stone-50 overflow-hidden relative">
            {/* Decorative Background - Hidden on mobile for performance */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-100/20 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-rose-500 font-script text-2xl md:text-3xl mb-2 block transform -rotate-2">
                            Hành Trình Tình Yêu
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-6 tracking-tight">Chương Trình Lễ Cưới</h2>

                        {/* Day Tabs */}
                        <div className="inline-flex flex-wrap justify-center gap-1.5 bg-white p-1 rounded-full shadow-md border border-gray-100 scale-90 md:scale-100">
                            {[
                                { id: 'jan10', label: '10/01', sub: 'Lễ Ăn Hỏi' },
                                { id: 'jan11', label: '11/01', sub: 'Tiệc Cưới' },
                                { id: 'jan12', label: '12/01', sub: 'Thành Hôn' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-1.5 md:py-2 rounded-full transition-all duration-300 flex flex-col items-center min-w-[80px] ${activeTab === tab.id
                                        ? 'bg-rose-500 text-white shadow-sm'
                                        : 'hover:bg-rose-50 text-gray-500 hover:text-rose-600'
                                        }`}
                                >
                                    <span className={`text-xs md:text-sm font-serif font-bold leading-none mb-0.5`}>
                                        {tab.label}
                                    </span>
                                    <span className={`text-[9px] uppercase font-medium mt-0.5 ${activeTab === tab.id ? 'opacity-90' : 'opacity-60'}`}>
                                        {tab.sub}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>



                {/* Vertical Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200 md:-translate-x-1/2" />

                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {events.map((event, index) => (
                                    <TimelineItem key={index} event={event} index={index} isEven={index % 2 === 0} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>


            </div>
        </section>
    );
}
