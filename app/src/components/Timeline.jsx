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
            { time: '08:15 AM', title: 'Làm Lễ Chính Thức', icon: Heart, description: 'Nhà trai đến nhà gái để chính thức xin dâu.' },
            { time: '08:30 AM', title: 'Dâng Hương Gia Tiên', icon: Home, description: 'Cặp đôi dâng hương lên bàn thờ tổ tiên.' },
            { time: '09:00 AM', title: 'Đãi Tiệc', icon: Utensils, description: 'Hai gia đình cùng dùng bữa cơm thân mật.' },
        ]
    },
    'jan11': {
        title: 'Tiệc Cưới',
        date: '11 Tháng 1, 2026',
        description: 'Tiệc Mừng Hạnh Phúc',
        events: [
            { time: '09:00 AM', title: 'Đón Khách', icon: Users, description: 'Hân hoan chào đón quý quan khách đến chung vui.' },
            { time: '11:00 AM', title: 'Nhập Tiệc', icon: Utensils, description: 'Mời quý khách thưởng thức các món ăn ngon miệng.' },
            { time: '14:00 PM', title: 'Giao Lưu Âm Nhạc', icon: Music, description: 'Các tiết mục văn nghệ và tiệc trà chiều.' },
            { time: '17:00 PM', title: 'Đón Khách Buổi Tối', icon: Camera, description: 'Chụp hình kỷ niệm cùng cô dâu chú rể.' },
            { time: '18:30 PM', title: 'Lễ Cưới', icon: Heart, description: 'Nghi thức cắt bánh, rót rượu và trao nhẫn.' },
            { time: '19:00 PM', title: 'Khai Tiệc', icon: Utensils, description: 'Thưởng thức tiệc chính và nâng ly chúc mừng.' },
            { time: '21:00 PM', title: 'Cảm Ơn', icon: Sparkles, description: 'Cặp đôi gửi lời cảm ơn đến quý quan khách.' },
        ],
        menu: [
            'Thịt Gà',
            'Thịt Dê Hấp',
            'Thịt Lợn Chao',
            'Tôm Chiên',
            'Cá Tầm Chiên',
            'Bò Sốt Tiêu',
            'Xào Bò',
            'Nộm',
            'Rau Củ Luộc',
            'Xôi Đậu',
            'Canh Mọc',
            'Tráng Miệng: Quýt',
        ]
    },
    'jan12': {
        title: 'Lễ Thành Hôn',
        date: '12 Tháng 1, 2026',
        description: 'Lễ Cưới Chính Thức',
        hasSides: true,
        groomEvents: [
            { time: '07:00 AM', title: 'Lên Đường Đón Dâu', icon: Home, description: 'Phái đoàn nhà trai xuất phát đi đón dâu.' },
            { time: '10:00 AM', title: 'Lễ Tại Nhà Gái', icon: Heart, description: 'Làm lễ xin dâu và nghi thức truyền thống.' },
            { time: '11:00 AM', title: 'Rước Dâu Về Nhà Trai', icon: Utensils, description: 'Đưa cô dâu về ra mắt gia tiên nhà chồng.' },
            { time: '13:00 PM', title: 'Lễ Thành Hôn', icon: Sparkles, description: 'Hoàn thành các nghi lễ, cảm ơn quan khách.' },
        ],
        brideEvents: [
            { time: '07:30 AM', title: 'Đón Tiếp Nhà Trai', icon: Users, description: 'Nhà gái hân hoan đón tiếp đoàn nhà trai.' },
            { time: '08:30 AM', title: 'Lễ Vu Quy', icon: Heart, description: 'Làm lễ gia tiên và trao nhẫn tại nhà gái.' },
            { time: '09:30 AM', title: 'Tiệc Trà Chỉ Dẫn', icon: Utensils, description: 'Mời trầu cau và bánh kẹo trước khi đưa dâu.' },
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
    const [weddingSide, setWeddingSide] = useState('groom');

    const currentData = SCHEDULE_DATA[activeTab];
    const events = activeTab === 'jan12'
        ? (weddingSide === 'groom' ? currentData.groomEvents : currentData.brideEvents)
        : currentData.events;

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

                {/* Sub-tabs for Wedding Day */}
                {activeTab === 'jan12' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-8 md:mb-12"
                    >
                        <div className="bg-white/80 p-0.5 rounded-lg shadow-sm border border-rose-100 flex gap-0.5 scale-90 md:scale-100">
                            {['groom', 'bride'].map((side) => (
                                <button
                                    key={side}
                                    onClick={() => setWeddingSide(side)}
                                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${weddingSide === side
                                        ? 'bg-rose-100 text-rose-700 shadow-sm'
                                        : 'text-gray-500 hover:bg-rose-50'
                                        }`}
                                >
                                    {side === 'groom' ? 'Nhà Trai' : 'Nhà Gái'}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Vertical Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200 md:-translate-x-1/2" />

                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeTab}-${weddingSide}`}
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

                {/* Menu Section for Banquet */}
                {activeTab === 'jan11' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-10 md:mt-12 max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-[1.5rem] shadow-lg border border-rose-100 overflow-hidden relative">
                            {/* Decorative header bg */}
                            <div className="h-16 bg-rose-50 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <div className="text-center z-10">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-1.5 shadow-sm">
                                        <Utensils className="w-5 h-5 text-rose-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 text-center">
                                <h3 className="text-3xl font-script text-gray-800 mb-6 border-b border-rose-100 pb-3 inline-block px-8">
                                    Thực Đơn Nhà Trai
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3 text-left">
                                    {currentData.menu.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 py-1.5 border-b border-dashed border-gray-100 last:border-0 md:border-b-0">
                                            <span className="text-rose-400 font-script text-xl w-6 shrink-0">{index + 1}.</span>
                                            <span className="text-gray-700 font-sans text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-rose-50 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-bold">Đồ Uống</span>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-medium border border-rose-100">Rượu quê</span>
                                        <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-xs font-medium border border-sky-100">Nước ngọt</span>
                                        <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100">Nước lọc</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
