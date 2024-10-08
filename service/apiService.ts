import api from "@/hooks/axiosConfig";
import { Product } from '@/types/Product';

const apiService = {

  signup: async (data: { username: string, email: string, password: string }) => {

    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },

  updateUserProfile: async (id: string, data: { name: string; email: string; address: string }) => {
    const response = await api.put(`/user/${id}`, data);
    return response.data;
  },

  getHighlightedProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products/highlighted');
    return response.data;
  },

  // Método para buscar os itens do carrinho com base no ID
  getCartItemsById: async (cartId: string) => {
    try {
      const response = await api.get(`/cart/${cartId}`);
      return response.data; // Supondo que a API retorne um array de produtos no carrinho
    } catch (error) {
      console.error('Erro ao buscar itens do carrinho:', error);
      throw error;
    }
  },

  getCartItems: async (): Promise<Product[]> => {
    const response = await api.get('/cart');
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products?category=${category}`);
    return response.data;
  },

  getPromotions: async (): Promise<Product[]> => {
    const response = await api.get('/products/promotions');
    return response.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get(`/products?search=${query}`);
    return response.data;
  },

  getRecommendations: async (): Promise<Product[]> => {
    const response = await api.get('/products/recommendations');
    return response.data;
  },

  getNotifications: async (): Promise<any[]> => {
    const response = await api.get('/notifications');
    return response.data;
  },

  getOrderHistory: async (): Promise<any[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Método para adicionar produtos ao carrinho
  addToCart: async (cartData: { user: string; products: { quantity: number; productId: string }[] }) => {
    try {
      const response = await api.post('/cart', cartData);
      return response.data; // Supondo que a resposta da API retorne o ID do carrinho e outros detalhes
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      throw error;
    }
  },

  processTransaction: async (transactionData: any) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  login: async (email: string, password: string) => { 
    
    const response = await api.post('/auth/login', { email, password });
    if(!!response.data){
      return {
        token: response.data.token,
        user: response.data.user
      }
    }
    
    return response.data;
  },

  filterProducts: async (filters: { title?: string; category?: string; minPrice?: number; maxPrice?: number; seller?: string }): Promise<Product[]> => {
    const query = new URLSearchParams();

    if (filters.title) query.append('title', filters.title);
    if (filters.category) query.append('category', filters.category);
    if (filters.minPrice) query.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) query.append('maxPrice', filters.maxPrice.toString());
    if (filters.seller) query.append('seller', filters.seller);

    const response = await api.get(`/products?${query.toString()}`);
    return response.data;
  },
};

export default apiService;
