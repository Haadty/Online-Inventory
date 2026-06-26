export async function getProducts() {
    const res = await fetch("http://localhost:3001/products");
    return res.json();
}