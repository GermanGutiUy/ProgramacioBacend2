import { productService } from '../services/product.service.js';

// Listar todos los productos
export const listProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ status: 'success', payload: products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Crear producto (Admin)
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Actualizar producto (Admin)
export const updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: updated });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Eliminar producto (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.pid);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: deleted });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
