import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatPrice from '../../ultis/formatPrice';

const UserOrder = () => {
    const { orders } = useSelector((state) => state.orders);
    const columns = ['STT', 'Mặt hàng', 'Thanh toán', 'Thời gian đặt hàng', 'Trạng thái đơn hàng'];
    return (
        <div className="min-h-[calc(100vh-14rem)] py-[5rem] px-8 dark:text-white">
            <div className="wrapper">
                {orders.length ? (
                    <table className="w-full">
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="text-left dark:text-white p-4 font-bold text-[1.6rem] border-b-2"
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="dark:text-white">
                            {orders.map((order, index) => (
                                <tr className="" key={index}>
                                    <td className="border-b-2 p-4">
                                        <span className="block w-[3rem] h-[3rem] rounded-full bg-primary text-center leading-[3rem] font-bold text-[1.6rem] text-white">
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="border-b-2 p-4 flex flex-col gap-y-12">
                                        {order.productOrder.productSelect.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-x-4 items-center gap-y-4 font-bold capitalize"
                                            >
                                                <img
                                                    src={item.product.thumbnail.url}
                                                    className="w-[3rem] h-[3rem]"
                                                    alt=""
                                                />
                                                <span className="text-success">
                                                    {item.product.productName} (SL: {item.userChoose.quantity})
                                                </span>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border-b-2 p-4 font-bold text-red-primary">
                                        {formatPrice(order.productOrder.total)}
                                    </td>
                                    <td className="border-b-2 p-4 font-bold">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td
                                        className={`border-b-2 p-4 ${
                                            order.status === 'pending' ? 'text-warning' : 'text-success'
                                        }`}
                                    >
                                        {order.status === 'pending' ? 'Đang xử lí ...' : 'Người bán đã gửi hàng!'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center text-[1.8rem] dark:text-white">
                        <span className="block">Bạn chưa mua mặt hàng nào!</span>
                        <div className="inline-flex gap-x-2">
                            <span>Hãy thêm sản phẩm vào giỏ và mua hàng</span>
                            <Link className="text-blue-link" to="/cart">
                                Tại đây
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(UserOrder);
