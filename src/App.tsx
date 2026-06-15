import { useState } from "react";

import Login from "./pages/login/login";
import Produtos from "./pages/produtos/produtos";

function App() {

    const [logado, setLogado] = useState(false);

    if (!logado) {
        return <Login onLogin={() => setLogado(true)} />;
    }

    return <Produtos />;
}

export default App;