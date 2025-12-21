import React from 'react';
import { Heart, Copy } from 'lucide-react';

const BankCard = ({ title, name, bank, number, qrData, color }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border ${color === 'rose' ? 'border-rose-200' : 'border-sky-200'} transform hover:scale-[1.02] transition-all duration-300`}>
        <div className={`py-4 px-4 text-center ${color === 'rose' ? 'bg-gradient-to-r from-rose-400 to-rose-500' : 'bg-gradient-to-r from-sky-400 to-sky-500'} text-white`}>
            <h3 className="text-lg font-script mb-0.5">{title}</h3>
            <p className="text-lg font-bold">{name}</p>
        </div>

        <div className="p-4 md:p-5">
            <div className={`aspect-square rounded-xl flex items-center justify-center mb-4 ${color === 'rose' ? 'bg-rose-50/50 border-rose-100' : 'bg-sky-50/50 border-sky-100'} border p-3 max-w-[180px] md:max-w-[200px] mx-auto`}>
                <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`}
                    alt={`QR ${name}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
            </div>

            <div className={`space-y-2 rounded-xl p-3 ${color === 'rose' ? 'bg-rose-50' : 'bg-sky-50'}`}>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">Ngân hàng</span>
                    <span className={`font-semibold text-sm ${color === 'rose' ? 'text-rose-700' : 'text-sky-700'}`}>{bank}</span>
                </div>
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => navigator.clipboard.writeText(number)}>
                    <span className="text-gray-500 text-xs">Số tài khoản</span>
                    <div className="flex items-center gap-1.5">
                        <span className={`font-semibold text-sm ${color === 'rose' ? 'text-rose-700' : 'text-sky-700'}`}>{number}</span>
                        <Copy className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function Gift() {
    return (
        <section id="gift" className="py-12 md:py-24 bg-gradient-to-b from-white to-rose-50/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-12">
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-rose-500 fill-current mx-auto mb-3 animate-pulse" />
                    <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-3">Mừng Cưới</h2>
                    <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
                        Sự hiện diện của quý khách là món quà ý nghĩa nhất. Tuy nhiên nếu quý khách muốn gửi quà mừng, xin vui lòng gửi qua thông tin dưới đây.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
                    <BankCard
                        title="Cô Dâu"
                        name="Nguyễn Thu Thủy"
                        bank="TPBank"
                        number="0060 6386 001"
                        qrData="0002010102111531397007040052044600000060638600138550010A000000727012500069704230111006063860010208QRIBFTTA5204513753037045802VN5915NGUYEN THU THUY6006Ha Noi8707CLASSIC630483BD"
                        color="rose"
                    />
                    <BankCard
                        title="Chú Rể"
                        name="Nguyễn Đức Linh"
                        bank="TPBank"
                        number="2842 2031 998"
                        qrData="0002010102111531397007040052044600002842203199838550010A000000727012500069704230111284220319980208QRIBFTTA5204513753037045802VN5915NGUYEN DUC LINH6006Ha Noi8707CLASSIC630457E3"
                        color="sky"
                    />
                </div>
            </div>
        </section>
    );
}
