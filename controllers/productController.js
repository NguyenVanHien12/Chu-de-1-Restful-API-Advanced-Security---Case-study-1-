//Danh sach san pham mau
const products = 
[
    {id: 1, name: 'Laptop', price: 100},
    {id: 2, name: 'Phone', price: 200}
]

//Ham lay tat ca san pham
exports.getAllProduct = (req, res) => {
    res.json(products);
}

//Ham lay san pham theo id
exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);

    // Thêm bước validate
    if (isNaN(id)) {
        return res.status(400).json({ message: "Product ID must be a number" });
    }

    const product = products.find(p => p.id === id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({message: "Product not found"})
    }
}

//Ham tao san pham
exports.createProduct = (req, res) => {
    const {name, price} = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }
    
    if(!name || typeof name !== 'string') {
        return res.status(400).json({message: 'Name is required and must be a string'});
    }

    if(!price || typeof price !== 'number') {
        return res.status(400).json({message: 'Price must be a positive number'});
    }

    const newId = products.length > 0 ? products[products.length - 1].id + 1: 1;

    const newProduct = {id: newId, name, price};
    products.push(newProduct);

    res.status(201).json(newProduct);
}

//Ham cap nhat san pham theo id
exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, price} = req.body;

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    if (name) {
        if(typeof name !== 'string') {
            return res.status(400).json({message: 'Name must be a string'});
        }
        product.name = name;
    }
    if (price) {
        if(typeof price !== 'number' || price <= 0) {
            return res.status(400).json({message: 'Price must be a positive number'});
        }
        product.price = price;
    }

    res.json(product);
}

//Ham xoa san pham theo id
exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if(index === -1) {
        return res.status(404).json({message: 'Product not found'});
    }

    products.splice(index,1);

    res.json({message: 'Product deleted successfully'});
}