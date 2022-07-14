import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../components/InputField';
import { authLogin } from '../../redux/slice/authSlice';
import { updateToast } from '../../redux/slice/toastMessageSlice';

const LoginForm = () => {
    // declare dispatch in redux
    const dispatch = useDispatch();
    // Schema validation
    const schema = yup
        .object({
            email: yup.string().required('Nhìn xem, bạn nhập thiếu email').email('Email không hợp lệ!').trim(),
            password: yup
                .string()
                .required('Nhìn xem, bạn nhập thiếu password')
                .matches(
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    'Mật khẩu từ 6-16 kí tự, bao gồm ít nhất một số và một kí tự đặc biệt'
                ),
        })
        .required();

    // using react hook form
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    // submit login form
    const onSubmit = async (loginForm) => {
        const res = await dispatch(authLogin(loginForm));
        if (!res.payload?.accessToken) {
            // login fail
            dispatch(
                updateToast({
                    delay: 5000,
                    isShowToast: true,
                    type: 'error',
                    message: res.payload,
                })
            );
            return;
        }
        // login success
        localStorage.setItem('firstLogin', true);
        window.location.href = '/';
    };
    return (
        <div className="relative decorate-bottom">
            <div className="max-w-[50rem] mx-auto p-[2rem] pt-[3rem] h-[calc(100vh-14rem)] ">
                <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-center gap-4">
                        <h3 className="text-center text-[2rem] font-normal">Đăng Nhập</h3>
                        <i className="bx bx-lock-alt text-[2rem] font-normal"></i>
                    </div>
                    <InputField
                        inputType="text"
                        name="email"
                        label="Email"
                        placeholder="Nhập email của bạn..."
                        control={control}
                    />
                    <InputField
                        inputType="password"
                        name="password"
                        label="Password"
                        placeholder="Nhập mật khẩu của bạn..."
                        control={control}
                    />
                    <button type="submit" className="btn mb-[2rem]">
                        Đăng Nhập
                    </button>
                    <div className="flex gap-4">
                        <p>Bạn chưa có tài khoản? Vui lòng đăng ký</p>
                        <Link to="/register" className="font-bold">
                            tại đây
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
