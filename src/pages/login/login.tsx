import "./login.css";

type Props = {
    onLogin: () => void;
};

function Login({ onLogin }: Props) {

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>Prefeitura Municipal</h1>

                <h2>Sistema de Estoque</h2>

                <input
                    type="text"
                    placeholder="Usuário"
                />

                <input
                    type="password"
                    placeholder="Senha"
                />

                <button onClick={onLogin}>
                    Entrar
                </button>

            </div>

        </div>

    );

}

export default Login;