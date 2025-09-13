import { useState } from 'react';

interface FormData {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  quantity: number;
}

const AddProductForm = () => {
  const [_formData, setFormData] = useState<FormData>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: '',
    quantity: 0,
  });

  const [_isSubmitting, _setIsSubmitting] = useState(false);
  const [_message, _setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });
  // const navigate = useNavigate();

  // const categories: string[] = [
  //   'Electronics',
  //   'Footwear',
  //   'Clothing',
  //   'Home & Kitchen',
  //   'Books',
  //   'Sports & Fitness',
  //   'Food & Beverages',
  //   'Furniture',
  //   'Games & Toys',
  //   'Health & Wellness',
  //   'Home & Garden',
  //   'Accessories'
  // ];

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setMessage({ type: '', text: '' });

  //   try {
  //     const response = await axios.post(`http://localhost:3001/api/routes/products/`, formData);
  //     if (response.status === 201) {
  //       setMessage({ type: 'success', text: 'Product has been added successfully!' });
  //       setTimeout(() => navigate("/"), 3000);
  //     } else {
  //       setMessage({ type: 'error', text: 'Failed to add a product. Please try again.' });
  //     }
  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //     setMessage({ type: 'error', text: 'An error occurred while adding the product.' });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  //   const target = e.target as HTMLImageElement;
  //   target.src = 'data:image/svg+xml;base64,...'; // placeholder
  // };

  const handleReset = () => {
    setFormData({
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      category: '',
      quantity: 0,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* ...rest of your JSX stays the same */}
      <button
        type="button"
        onClick={handleReset}
        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
      >
        Reset Changes
      </button>
    </div>
  );
};

export default AddProductForm;
