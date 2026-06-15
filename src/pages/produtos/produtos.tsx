import "./produtos.css";

function Produtos() {

    return (

        <div className="container">

            <aside className="sidebar">

                <h2>📦 Estoque</h2>

                <button>Produtos</button>

                <button>Usuários</button>

                <button>Administradores</button>

                <button>Entradas</button>

                <button>Saídas</button>

                <button>Histórico</button>

            </aside>

            <main>

                <header>

                    <h1>
                        Produtos
                    </h1>

                    <button className="novo">
                        + Novo Produto
                    </button>

                </header>

                <div className="pesquisa">

                    <input
                        type="text"
                        placeholder="Pesquisar produto..."
                    />

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Número</th>

                            <th>Produto</th>

                            <th>Quantidade</th>

                            <th>Administrador</th>

                            <th>Ações</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>001</td>

                            <td>Parafuso</td>

                            <td>250</td>

                            <td>João Silva</td>

                            <td>

                                <button>Editar</button>

                            </td>

                        </tr>

                        <tr>

                            <td>002</td>

                            <td>Tubo PVC</td>

                            <td>35</td>

                            <td>Maria Souza</td>

                            <td>

                                <button>Editar</button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </main>

        </div>

    );

}

export default Produtos;