import React from 'react';
import { Heart, Copy } from 'lucide-react';

const BankCard = ({ title, name, bank, number, qrData, color }) => (
    <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border-2 ${color === 'rose' ? 'border-rose-100' : 'border-blue-100'} transform hover:scale-105 transition-all duration-300`}>
        <div className={`py-6 px-6 text-center ${color === 'rose' ? 'bg-gradient-to-r from-rose-400 to-pink-400' : 'bg-gradient-to-r from-blue-400 to-indigo-400'} text-white`}>
            <h3 className="text-2xl font-script mb-1">{title}</h3>
            <p className="text-2xl font-bold">{name}</p>
        </div>

        <div className="p-8">
            <div className="aspect-square rounded-2xl flex items-center justify-center mb-6 bg-gray-50 border border-gray-100 p-4">
                <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${qrData}`}
                    alt={`QR ${name}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                />
            </div>

            <div className={`space-y-3 rounded-xl p-4 ${color === 'rose' ? 'bg-rose-50' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Bank</span>
                    <span className={`font-semibold ${color === 'rose' ? 'text-rose-700' : 'text-blue-700'}`}>{bank}</span>
                </div>
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => navigator.clipboard.writeText(number)}>
                    <span className="text-gray-600 text-sm">Account No.</span>
                    <div className="flex items-center gap-2">
                        <span className={`font-semibold ml-auto ${color === 'rose' ? 'text-rose-700' : 'text-blue-700'}`}>{number}</span>
                        <Copy className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function Gift() {
    return (
        <section id="gift" className="py-20 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Heart className="w-12 h-12 text-rose-500 fill-current mx-auto mb-4 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Wedding Gift</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a cash contribution would be very welcome.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
                    <BankCard
                        title="The Bride"
                        name="Nguyễn Thu Thủy"
                        bank="TPBank"
                        number="0060 6386 001"
                        qrData="0002010102111531397007040052044600000060638600138550010A000000727012500069704230111006063860010208QRIBFTTA5204513753037045802VN5915NGUYEN THU THUY6006Ha Noi8707CLASSIC630483BD"
                        color="rose"
                    />
                    <BankCard
                        title="The Groom"
                        name="Nguyễn Đức Linh"
                        bank="TPBank"
                        number="2842 2031 998"
                        qrData="0002010102111531397007040052044600002842203199838550010A000000727012500069704230111284220319980208QRIBFTTA5204513753037045802VN5915NGUYEN DUC LINH6006Ha Noi8707CLASSIC630457E3"
                        color="blue"
                    />
                </div>
            </div>
        </section>
    );
}
