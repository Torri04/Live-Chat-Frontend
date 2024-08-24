import { Link, useNavigate } from 'react-router-dom';
import '../styles/scss/SignUp.scss'
import { useState } from 'react'

const SignUpPage = () => {
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repass, setRepass] = useState("")
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
    async function SignUp(e) {
        e.preventDefault()

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FullName: name,
                Email: email,
                UserName: userName,
                Password: password
            })
        }

        await fetch('http://localhost:5198/api/account/signup', option)
            .then(response => response)
            .then(data => {
                console.log(data);
                if (data.status === 200)
                    navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <section onSubmit={e => SignUp(e)} className="signup">
            <form method="POST" className="signup-form">
                <div className="title">Đăng ký</div>
                <div className="username ipt">
                    <input value={userName} onChange={e => setUserName(e.target.value)} id="username" name="username" type="text" placeholder="" autoComplete="username" />
                    <label htmlFor="username">Tên đăng nhập</label>
                </div>
                <div className="name ipt">
                    <input value={name} onChange={e => setName(e.target.value)} id="name" name="name" type="text" placeholder="" autoComplete="name" />
                    <label htmlFor="name">Họ và tên</label>
                </div>
                <div className="email ipt">
                    <input value={email} onChange={e => setEmail(e.target.value)} id="email" name="email" type="text" placeholder="" autoComplete="email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="pass ipt">
                    <input value={password} onChange={e => setPassword(e.target.value)} id="password" name="password" type="password" placeholder="" autoComplete="new-password" />
                    <i className="icon-eye fa-solid fa-eye-slash" onClick={(e) => ShowPassword(e.target)}></i>
                    <label htmlFor="password">Mật khẩu</label>
                </div>
                <div className="re-pass ipt">
                    <input value={repass} onChange={e => setRepass(e.target.value)} id="repass" name="repass" type="password" placeholder="" autoComplete="new-password" />
                    <i className="icon-eye fa-solid fa-eye-slash" onClick={(e) => ShowPassword(e.target)}></i>
                    <label htmlFor="repass">Nhập lại mật khẩu</label>
                </div>
                <div className="privacy ipt">
                    <input id="privacy" name="privacy" type="checkbox" />
                    <label htmlFor="privacy">Tôi cam kết tuân theo <i>Chính sách bảo mật</i> và <i>Điều khoản sử
                        dụng</i> của
                        ...</label>
                </div>
                <button type="submit">Đăng ký</button>
                <div className="last-row">
                    <div className="have-signin">Đã đăng ký tài khoản?</div>
                    <Link to="/" className="signin-last">Đăng nhập</Link>
                </div>
            </form>
        </section>
    )
}

export default SignUpPage;