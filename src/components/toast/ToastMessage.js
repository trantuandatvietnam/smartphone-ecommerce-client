import React, { useRef, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateToast } from '../../redux/slice/toastMessageSlice';

const ToastMessage = () => {
    // state
    const toastRef = useRef(null);
    const timeoutRef = useRef();
    const timeoutLaterRef = useRef();
    // data from store
    const toastData = useSelector((state) => state.toast);
    const { type, delay, message, isShowToast } = toastData;
    const dispatch = useDispatch();

    const handleCloseToast = () => {
        dispatch(updateToast({ ...toastData, isShowToast: false }));
    };

    useEffect(() => {
        if (isShowToast) {
            // clear timeout before auto hide toast
            toastRef.current.classList.remove('toast_hide');
            if (timeoutRef.current || timeoutLaterRef.current) {
                clearTimeout(timeoutRef.current);
                clearTimeout(timeoutLaterRef.current);
            }
            // auto hide toast
            timeoutRef.current = setTimeout(() => {
                dispatch(updateToast({ ...toastData, isShowToast: false }));
            }, delay);
            timeoutLaterRef.current = setTimeout(() => {
                toastRef.current.classList.add('toast_hide');
            }, delay + delay / 2);
        } else {
            // if toast is not shown => clear timeout(because user can close toast before it auto hide)
            clearTimeout(timeoutRef.current);
            clearTimeout(timeoutLaterRef.current);
            timeoutLaterRef.current = setTimeout(() => {
                toastRef.current.classList.add('toast_hide');
            }, 1000);
        }
        // if user mousemove on toast => it does not auto hide
        toastRef.current?.addEventListener('mousemove', () => {
            clearTimeout(timeoutRef.current);
            clearTimeout(timeoutLaterRef.current);
        });
        // if user mouse out toast => it auto hide after time declare
        toastRef.current?.addEventListener('mouseout', () => {
            timeoutRef.current = setTimeout(() => {
                dispatch(updateToast({ ...toastData, isShowToast: false }));
            }, delay);
            timeoutLaterRef.current = setTimeout(() => {
                toastRef.current.classList.add('toast_hide');
            }, delay + delay / 2);
        });
    }, [isShowToast, delay, toastData, dispatch]);

    return (
        <div
            ref={toastRef}
            className={`toast ${isShowToast ? 'toast_active' : ''} ${
                type === 'success'
                    ? 'bg-success'
                    : type === 'warning'
                    ? 'bg-warning'
                    : 'bg-error'
            }`}
        >
            <i className="bx bx-info-circle"></i>
            <p className="text-[1.4rem] font-medium">{message}</p>
            <i
                onClick={handleCloseToast}
                className="bx bx-x p-2 cursor-pointer active:opacity-0 text-[2rem]"
            ></i>
        </div>
    );
};

export default memo(ToastMessage);
