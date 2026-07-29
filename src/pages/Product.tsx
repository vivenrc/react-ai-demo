import { useNavigate } from 'react-router-dom';
import ProductForm from '@/components/ProductForm';
import type { FormValues } from '@/components/ProductForm/types';

export default function Product() {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormValues) => {
    // TODO: 调用保存 API
    console.log('Form data:', data);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>商品</h1>
      <ProductForm mode="create" onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </div>
  );
}
