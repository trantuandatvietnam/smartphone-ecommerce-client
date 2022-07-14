import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import confirmImg from '../../assets/imgs/confirm.gif';
import { updateConfirm } from '../../redux/slice/confirmSlice';

const Confirm = ({ children }) => {
    // data from store
    const isShow = useSelector((state) => state.confirm.isShow);
    // using hook
    const dispatch = useDispatch();

    // function
    const handleClickYes = () => {
        dispatch(updateConfirm({ isShow: false, status: true }));
    };

    const handleClickNo = () => {
        dispatch(updateConfirm({ isShow: false, status: false }));
    };

    return (
        <div>
            <div
                className={`fixed duration-300 h-screen w-screen top-0 z-5 bg-rgba-black scale-0 transition-transform ${
                    isShow ? 'scale-100' : ''
                }`}
            ></div>
            <div
                className={`inline-block fixed top-[50%] right-[50%] translate-y-[-50%] ${
                    isShow ? '' : 'scale-0'
                }`}
            >
                <div
                    className={`max-w-[16rem]  duration-500 opacity-0 transition-all ${
                        isShow ? 'opacity-100' : 'scale-0'
                    }`}
                >
                    <img src={confirmImg} alt="" />
                </div>
                <div
                    className={`absolute opacity-0 duration-500 flex items-center justify-center  bg-white shadow-2xl w-[28rem] top-[-5rem] right-[-22rem] py-8 px-12 rounded-full transition-all ${
                        isShow ? 'opacity-100' : 'scale-0'
                    }`}
                >
                    <div>
                        <span className="text-center block mb-4">
                            {children}
                        </span>
                        <div className="flex gap-4 items-center justify-center">
                            <button
                                onClick={handleClickYes}
                                className="btn h-[2.4rem] text-[1.2rem] font-bold"
                            >
                                Có
                            </button>
                            <button
                                onClick={handleClickNo}
                                className="btn h-[2.4rem] text-[1.2rem] font-bold"
                            >
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
