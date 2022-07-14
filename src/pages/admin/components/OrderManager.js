import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import orderApis from '../../../apis/orderApis';
import Title from '../../../components/title/Title';
import formatPrice from '../../../ultis/formatPrice';
import Loading from '../../../components/loading/Loading';
import Spinner from '../../../components/spinner/Spinner';

const columns = ['STT', 'Sản phẩm', 'Giá', 'Thời gian', 'Thông tin khách hàng', 'Trạng thái'];

const OrderManager = () => {
    const token = useSelector((state) => state.auth.token);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const handleChangeStatusOrder = async (order) => {
        try {
            setUpdatingStatus(true);
            await orderApis.updateOrder(token, order._id, {
                status: order.status === 'pending' ? 'fullfilled' : 'pending',
            });
            setUpdatingStatus(false);
            const orderIndex = orders.findIndex((item) => item._id === order._id);
            const newOrders = [...orders];
            newOrders[orderIndex] = { ...order, status: order.status === 'pending' ? 'fullfilled' : 'pending' };
            setOrders(newOrders);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    useEffect(() => {
        try {
            (async () => {
                setLoading(true);
                const res = await orderApis.getOrders(token);
                setLoading(false);
                setOrders(res.orders);
            })();
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }, [token]);
    return (
        <div className="dark:text-white">
            {loading && <Loading />}
            <Title>Danh sách đơn đặt hàng</Title>
            <div>
                <table className="w-full">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="text-left p-4 font-bold text-[1.6rem] border-b-2">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr className="" key={index}>
                                <td className="border-b-2 p-4">
                                    <span className="block w-[3rem] h-[3rem] rounded-full bg-primary text-center leading-[3rem] font-bold text-[1.6rem] text-white">
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="border-b-2 w-[24rem] p-4 flex flex-col gap-y-12">
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
                                <td className="border-b-2 w-[12rem] p-4 font-bold text-red-primary">
                                    {formatPrice(order.productOrder.total)}
                                </td>
                                <td className="border-b-2 w-[12rem] p-4 font-bold">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className={`border-b-2 p-4`}>
                                    {(order.productOrder.cartFormOptions.customerGender === 'male'
                                        ? 'Anh: '
                                        : 'Chị: ') +
                                        order.productOrder.cartFormOptions.receiver +
                                        ', ĐC: ' +
                                        order.productOrder.cartFormOptions.address}
                                </td>
                                <td
                                    title="Click để thay đổi trạng thái đơn hàng"
                                    onClick={() => handleChangeStatusOrder(order)}
                                    className={`border-b-2 cursor-pointer w-[12rem] p-4 ${
                                        order.status === 'pending' ? 'text-warning' : 'text-success'
                                    }`}
                                >
                                    {updatingStatus ? (
                                        <Spinner />
                                    ) : order.status === 'pending' ? (
                                        'Chưa xử lí ...'
                                    ) : (
                                        'Đã gửi hàng!'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManager;
