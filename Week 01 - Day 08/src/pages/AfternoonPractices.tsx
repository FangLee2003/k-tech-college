import React, { useState, useEffect } from 'react';
import { ShoppingCart, Home, FileText, Grid, Package, LogIn, Users } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Types
interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

// Navigation Component
const Navigation: React.FC<{ currentPage: string; onPageChange: (page: string) => void }> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Blog', icon: FileText },
    { name: 'Category', icon: Grid },
    { name: 'Products', icon: Package },
    { name: 'Login', icon: LogIn },
    { name: 'Customer', icon: Users },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Magazines</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => onPageChange(item.name)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      currentPage === item.name
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full transition-colors duration-200">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Filter Sidebar Component
const FilterSidebar: React.FC<{ 
  categories: Category[]; 
  selectedCategories: number[]; 
  onCategoryChange: (categoryId: number) => void; 
}> = ({ categories, selectedCategories, onCategoryChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories</h2>
      <div className="space-y-3">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => onCategoryChange(category.id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              {category.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const getValidImageUrl = (images: string[]) => {
    if (!images || images.length === 0) return null;
    
    // Filter out invalid URLs and get the first valid one
    const validImages = images.filter(img => 
      img && 
      typeof img === 'string' && 
      (img.startsWith('http://') || img.startsWith('https://')) &&
      !img.includes('[') && 
      !img.includes(']')
    );
    
    return validImages.length > 0 ? validImages[0] : null;
  };

  const imageUrl = getValidImageUrl(product.images);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square bg-gray-200 flex items-center justify-center relative">
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 p-4">
                <Skeleton height="100%" containerClassName="h-full" />
              </div>
            )}
            <img
              src={imageUrl}
              alt={product.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Package size={48} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.title}</h3>
        <p className="text-2xl font-bold text-blue-600">${product.price}</p>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination: React.FC<{ 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

// Page Components
const HomePage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Magazines</h1>
      <p className="text-xl text-gray-600">Your one-stop shop for all things amazing!</p>
    </div>
  </div>
);

const BlogPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
      <p className="text-xl text-gray-600">Read our latest articles and insights</p>
    </div>
  </div>
);

const CategoryPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
      <p className="text-xl text-gray-600">Browse all product categories</p>
    </div>
  </div>
);

const LoginPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Login</h1>
      <p className="text-xl text-gray-600">Sign in to your account</p>
    </div>
  </div>
);

const CustomerPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer</h1>
      <p className="text-xl text-gray-600">Customer service and support</p>
    </div>
  </div>
);

// Products Page Component
const ProductsPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 4;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await response.json();
        setCategories(data.slice(0, 10)); // Limit to 10 categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '';
        const offset = (currentPage - 1) * productsPerPage;
        
        if (selectedCategories.length > 0) {
          // If categories are selected, fetch from the first selected category
          const categoryId = selectedCategories[0];
          url = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=${offset}&limit=${productsPerPage}`;
        } else {
          // If no categories selected, fetch all products
          url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${productsPerPage}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
        
        // For simplicity, assume we have more products available
        setTotalProducts(Math.max(50, data.length));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, currentPage]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [categoryId] // For simplicity, only allow one category at a time
    );
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Render skeleton cards while loading
  const renderSkeletonCards = () => (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      {Array.from({ length: productsPerPage }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square">
            <Skeleton height="100%" containerClassName="h-full" />
          </div>
          <div className="p-4">
            <Skeleton height={28} className="mb-2" />
            <Skeleton height={32} width={80} />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              renderSkeletonCards()
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          {/* Pagination */}
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Main ProductListing Component
const ProductListing: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Products');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage />;
      case 'Blog':
        return <BlogPage />;
      case 'Category':
        return <CategoryPage />;
      case 'Products':
        return <ProductsPage />;
      case 'Login':
        return <LoginPage />;
      case 'Customer':
        return <CustomerPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>{renderCurrentPage()}</main>
    </div>
  );
};

export default ProductListing;