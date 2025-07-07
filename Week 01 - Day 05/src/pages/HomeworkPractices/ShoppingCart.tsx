import React, { useState, createContext, useContext, useCallback } from 'react';
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, X, Menu, Search } from 'lucide-react';
import styles from './ShoppingCart.module.css';

// Types
interface Product {
    id: number;
    name: string;
    price: number;
    image: string
}

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    totalItems: number;
    totalPrice: number;
}

// Product data
const products: Product[] = [
    {
        id: 1,
        name: "Bột Xốt Nấu Demiglace Knorr 1kg",
        price: 315000,
        image: "1.jpg"
    },
    {
        id: 2,
        name: "Nước Tương Kikkoman 1L",
        price: 180000,
        image: "2.webp"
    },
    {
        id: 3,
        name: "Bánh da Đỗ Lương Nghệ An 5 chiếc/túi",
        price: 25000,
        image: "3.jpg"
    },
    {
        id: 4,
        name: "Sốt Worcestershire Lea & Perrins 290ml",
        price: 150000,
        image: "4.jpg"
    },
    {
        id: 5,
        name: "Mắm nêm ngon phà sản Thuận Phát",
        price: 22000,
        image: "5.webp"
    },
];

// Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Filter Section Component
const FilterSection: React.FC = () => {
    const filters = [
        { id: 'all', label: 'Gia vị', active: true },
        { id: 'sauce', label: 'Gạo, bún, phở, miến' },
        { id: 'rice', label: 'Đồ hộp, thực phẩm sơ chế đóng gói' },
        { id: 'canned', label: 'Bột các loại' },
        { id: 'flour', label: 'Bánh đa nem, rau' },
        { id: 'noodles', label: 'Hạt các loại' },
        { id: 'nuts', label: 'Mốc nhí, măng, nấm khô' }
    ];

    return (
        <div className={styles.filterSection}>
            <div className={styles.filterContainer}>
                {filters.map(filter => (
                    <span
                        key={filter.id}
                        className={`${styles.filterTag} ${filter.active ? styles.active : ''}`}
                    >
                        {filter.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

// Sort Section Component
const SortSection: React.FC = () => {
    const { totalItems, totalPrice } = useCart();

    return (
        <div className={styles.sortSection}>
            <div className={styles.sortLeft}>
                Thực phẩm khô
            </div>
            <div className={styles.sortRight}>
                <span className={styles.sortLabel}>Sắp xếp theo:</span>
                <select className={styles.sortSelect}>
                    <option>Giá tăng</option>
                    <option>Giá giảm</option>
                    <option>Tên A-Z</option>
                    <option>Tên Z-A</option>
                </select>
            </div>
        </div>
    );
};

// Cart Summary Component  
const CartSummary: React.FC = () => {
    const { totalItems, totalPrice } = useCart();

    if (totalItems === 0) return null;

    return (
        <div className={styles.cartSummary}>
            <div className={styles.cartSummaryItem}>
                Giỏ hàng của bạn
            </div>
            <div className={styles.cartSummaryItem}>
                (<span className={styles.cartSummaryValue}>{totalItems}</span>) sản phẩm
            </div>
            <div className={styles.cartSummaryItem}>
                <span className={styles.cartSummaryValue}>{formatPrice(totalPrice)}</span>
            </div>
            <button className={styles.viewCartButton}>
                Xem giỏ hàng
            </button>
        </div>
    );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { cartItems, addToCart, updateQuantity } = useCart();

    const cartItem = cartItems.find(item => item.id === product.id);
    const quantity = cartItem?.quantity || 0;

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleIncrease = () => {
        updateQuantity(product.id, quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            updateQuantity(product.id, quantity - 1);
        }
    };

    return (
        <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
                <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                />
            </div>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>{formatPrice(product.price)}</p>
            </div>

            {quantity === 0 ? (
                <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                    <Plus size={16} />
                    Thêm vào giỏ hàng
                </button>
            ) : (
                <div className={styles.quantityControls}>
                    <button
                        className={styles.quantityBtn}
                        onClick={handleDecrease}
                    >
                        <Minus size={16} />
                    </button>
                    <span className={styles.quantityDisplay}>{quantity}</span>
                    <button
                        className={styles.quantityBtn}
                        onClick={handleIncrease}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

// Format price helper
const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN') + ' ₫';
};
const CartIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const { totalItems } = useCart();

    return (
        <div className={styles.cartIconContainer} onClick={onClick}>
            <ShoppingCartIcon size={24} />
            {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
            )}
        </div>
    );
};

const CartDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

    if (!isOpen) return null;

    return (
        <div className={styles.cartDropdown}>
            <div className={styles.cartHeader}>
                <h3 className={styles.cartTitle}>Giỏ hàng của bạn</h3>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
            <div className={styles.cartItems}>
                {cartItems.length === 0 ? (
                    <p className={styles.emptyCart}>Giỏ hàng trống</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeFromCart(item.id)}
                            >
                                Xóa
                            </button>
                            <div className={styles.cartItemImage}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={styles.cartItemImg}
                                />
                            </div>
                            <div className={styles.cartItemDetails}>
                                <h4 className={styles.cartItemName}>{item.name}</h4>
                                <div className={styles.cartItemPriceRow}>
                                    <span className={styles.cartItemQuantity}>{item.quantity} x</span>
                                    <span className={styles.cartItemPrice}>{formatPrice(item.price)}</span>
                                </div>
                                <div className={styles.cartItemControls}>
                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className={styles.quantityDisplay}>{item.quantity}</span>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                    <span className={styles.cartItemTotal}>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartItems.length > 0 && (
                <div className={styles.cartFooter}>
                    <div className={styles.cartTotal}>
                        <span className={styles.cartTotalLabel}>Tổng cộng:</span>
                        <span className={styles.cartTotalPrice}>{formatPrice(totalPrice)}</span>
                    </div>
                    <button className={styles.checkoutBtn}>
                        Xem giỏ hàng
                    </button>
                </div>
            )}
        </div>
    );
};

// Product Grid Component
const ProductGrid: React.FC = () => {
    return (
        <div className={styles.productGrid}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

// Cart Provider Component
const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((product: Product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [removeFromCart]);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Main App Component
const ShoppingCart: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <CartProvider>
            <div className={styles.app}>
                <header className={styles.appHeader}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.headerTitle}>Big Market</h1>
                        <button className={styles.categoryMenuBtn}>
                            <Menu size={16} />
                            <span className={styles.categoryMenuText}>Danh mục sản phẩm</span>
                        </button>
                    </div>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Tìm kiếm sản phẩm ..."
                        />
                        <button className={styles.searchBtn}>
                            <Search size={16} />
                        </button>
                    </div>
                    <CartIcon onClick={toggleCart} />
                </header>
                <main className={styles.appMain}>
                    <FilterSection />
                    <SortSection />
                    {/* <div className={styles.contentHeader}> 
                        <CartSummary />
                     </div> */}
                    <ProductGrid />
                </main>
                <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
        </CartProvider>
    );
};

export default ShoppingCart;