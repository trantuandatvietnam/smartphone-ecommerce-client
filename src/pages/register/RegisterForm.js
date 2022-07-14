import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/InputField';
import { useDispatch } from 'react-redux';
import { authRegister } from '../../redux/slice/authSlice';
import { updateToast } from '../../redux/slice/toastMessageSlice';

const RegisterForm = () => {
    // using dispatch
    const dispatch = useDispatch();
    // Schema validation
    const schema = yup.object({
        email: yup.string().required('Nhìn xem, bạn nhập thiếu email!').email('Email không hợp lệ!').trim(),
        password: yup
            .string()
            .required('Nhìn xem, bạn nhập thiếu password!')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Mật khẩu từ 6-16 kí tự, bao gồm ít nhất một số và một kí tự đặc biệt'
            )
            .trim(),
        retypePassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu của bạn để xác nhận!')
            .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp, vui lòng nhập lại'),
        number_phone: yup
            .string()
            .required('Vui lòng nhập số điện thoại của bạn!')
            .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại của bạn không hợp lệ, vui lòng kiểm tra lại!')
            .trim(),
    });

    // using react hook form
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
            retypePassword: '',
            number_phone: '',
        },
        resolver: yupResolver(schema),
    });

    // submit login form
    const onSubmit = async (registerForm) => {
        const { email, password, number_phone } = registerForm;
        const registerData = { email, password, number_phone };
        const res = await dispatch(authRegister(registerData));
        // register fail
        if (!res.payload.accessToken) {
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
        localStorage.setItem('firstLogin', true);
        window.location.href = '/';
    };
    return (
        <div className="relative decorate-top">
            <div className="max-w-[50rem] mx-auto p-[2rem] pt-[3rem] h-[calc(100vh-14rem)] ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-center gap-4">
                        <h3 className="text-center text-[2rem] font-normal">Đăng ký</h3>
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
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu của bạn..."
                        control={control}
                    />
                    <InputField
                        inputType="password"
                        name="retypePassword"
                        label="Xác nhận mật khẩu"
                        placeholder="Nhập lại mật khẩu của bạn..."
                        control={control}
                    />
                    <InputField
                        inputType="text"
                        name="number_phone"
                        label="Nhập số điện thoại"
                        placeholder="Nhập số điện thoại của bạn..."
                        control={control}
                    />
                    <button type="submit" className="btn mb-[2rem]">
                        Đăng ký
                    </button>
                    <div className="flex gap-4">
                        <p>Bạn đã có tài khoản? Đăng nhập</p>
                        <Link to="/login" className="font-bold">
                            tại đây
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
