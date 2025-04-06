// context/CartContext.js
"use client";
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse saved cart", error);
                setCart([]);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (game) => {
        // Check if the game is already in the cart
        const existingItem = cart.find(item => item.id === game.id);

        if (existingItem) {
            // If the game is already in the cart, increase the quantity
            setCart(cart.map(item =>
                item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // If the game is not in the cart, add it with quantity 1
            setCart([...cart, { ...game, quantity: 1 }]);
        }
    };

    const removeFromCart = (gameId) => {
        setCart(cart.filter(item => item.id !== gameId));
    };

    const updateQuantity = (gameId, quantity) => {
        if (quantity < 1) {
            removeFromCart(gameId);
            return;
        }

        setCart(cart.map(item =>
            item.id === gameId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
