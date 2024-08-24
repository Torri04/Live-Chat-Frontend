import { Link, useNavigate } from 'react-router-dom';
import '../styles/scss/SignIn.scss'
import { useState, useContext } from 'react'
import AppContext from '../Components/appcontext'

const SignInPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    function ShowPassword(e) {
        var input = e.previousElementSibling

        if (e.classList.contains("fa-eye-slash")) {
            e.classList.remove("fa-eye-slash")
            e.classList.add("fa-eye")
            input.setAttribute("type", "text")
        }
        else {
            e.classList.remove("fa-eye")
            e.classList.add("fa-eye-slash")
            input.setAttribute("type", "password")
        }
    }
    async function SignIn(e) {
        e.preventDefault()

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserName: userName,
                Password: password
            })
        }

        await fetch('http://localhost:5198/api/account/signin', option)
            .then(response => response)
            .then(async data => {
                if (data.status === 200) {
                    const res = await data.json();
                    setUser(res)
                    navigate("/chat");
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (<section className="signin">
        <form onSubmit={(e) => SignIn(e)} method="POST" className="signin-form">
            <div className="title">Đăng nhập</div>
            <div className="user">
                <input value={userName} onChange={e => setUserName(e.target.value)} id="username" name="username" type="text" placeholder="" autoComplete="username" />
                <label htmlFor="username">Tên đăng nhập</label>
            </div>
            <div className="pass">
                <input value={password} onChange={e => setPassword(e.target.value)} id="password" name="password" type="password" placeholder="" autoComplete="current-password" />
                <i onClick={(e) => ShowPassword(e.target)} className="icon-eye fa-solid fa-eye-slash"></i>
                <label htmlFor="password">Mật khẩu</label>
            </div>
            <div className="remem-forget">
                <div className="remember">
                    <input id="remember" name="remember" type="checkbox" />
                    <label >Ghi nhớ đăng nhập</label>
                </div>
                <div className="forget">Quên mật khẩu</div>
            </div>
            <button type="submit">Đăng nhập</button>
            <div className="last-row">
                <div className="not-signup">Chưa đăng ký tài khoản?</div>
                <Link to="signup" className="signup-last">Đăng ký</Link>
            </div>
        </form>
    </section>)
}
export default SignInPage;