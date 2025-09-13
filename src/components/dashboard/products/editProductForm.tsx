import { useState, useEffect } from 'react';
import axios from 'axios';

interface ProductProps {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  quantity: number;
}

interface EditProductFormProps {
  id: string;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ id }) => {
  const [formData, setFormData] = useState<ProductProps>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: '',
    quantity: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({
    type: '',
    text: '',
  });

  const categories: string[] = [
    'Electronics',
    'Footwear',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Sports & Fitness',
    'Food & Beverages',
    'Furniture',
    'Games & Toys',
    'Health & Wellness',
    'Home & Garden',
    'Accessories',
  ];

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<{ product: ProductProps }>(
          `http://localhost:3001/api/routes/products/${id}`
        );
        setFormData(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
        setMessage({ type: 'error', text: 'Failed to load product details.' });
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.put(
        `http://localhost:3001/api/routes/products/${id}`,
        formData
      );
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'Product updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update product. Please try again.' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage({ type: 'error', text: 'An error occurred while updating the product.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Preview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Image</h3>
          <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-center h-64 bg-gray-100">
            <img
              src={formData.imageUrl}
              alt={formData.name}
              className="max-h-56 max-w-full object-contain"
              onError={handleImageError}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">Current product image</p>
        </div>

        {/* Edit Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: '',
                    price: 0,
                    description: '',
                    imageUrl: '',
                    category: '',
                    quantity: 0,
                  })
                }
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
