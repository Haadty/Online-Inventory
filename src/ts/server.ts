import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// arquivos estáticos
app.use(express.static(path.join(__dirname, "../html")));

// rota principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../html/index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});