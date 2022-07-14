import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import authApis from './apis/authApis';
import Footer from './components/Footer';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';
import ToastMessage from './components/toast/ToastMessage';
import Pages from './pages/Pages';
import { setToken } from './redux/slice/authSlice';

function App() {
    // using dispatch (react redux)
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const themeMode = useSelector((state) => state.darkMode?.theme);
    useEffect(() => {
        (async function refreshToken() {
            try {
                const firstLogin = localStorage.getItem('firstLogin');
                // if user login failed
                if (!firstLogin) return;
                // if user login success
                const res = await authApis.refreshToken();
                dispatch(setToken(res.accessToken));
                // auto refresh token after 15 minutes
                setTimeout(() => {
                    refreshToken();
                }, 15 * 60 * 1000);
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        })();
        // eslint-disable-next-line
    }, []);

    return (
        <Router>
            <div className={`App transition-all ${themeMode === 'dark' && 'dark'}`}>
                {loading && <Loading />}
                <ToastMessage />
                <Header />
                <Pages />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
