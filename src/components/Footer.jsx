import React from 'react';

const footerData = [
    {
        id: 1,
        content: ['Điều khoản', 'Dịch vụ', 'Liên hệ', 'Hợp tác'],
    },
    {
        id: 2,
        content: ['Giới thiệu công ty', 'Tuyển dụng', 'Góp ý', 'Khiếu nại'],
    },
    {
        id: 3,
        content: ['Điều khoản', 'Dịch vụ', 'Liên hệ', 'Hợp tác'],
    },
    {
        id: 4,
        content: ['Tổng đài hỗ trợ (Miến phí)', '0941017049', '03523412', '092439999'],
    },
];

const Footer = () => {
    return (
        <div className="px-[8rem] dark:bg-black dark:text-white pb-[4rem] pt-[10rem] border-t-2 shadow-2xl bg-white">
            <div className="wrapper">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 border-b-2">
                    {footerData.map((item) => (
                        <ul key={item.id}>
                            {item.content.map((i, index) => (
                                <li
                                    className="hover:translate-x-2 mb-4 font-normal transition-transform cursor-pointer"
                                    key={index}
                                >
                                    {i}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="text-center pt-12 text-gray-500">
                    <span className="block">Trần Tuấn Đạt - Học Viện Kĩ Thuật Mật Mã</span>
                    <span className="block">Liên hệ: 0941017029, email: dat130902@gmail.com</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
