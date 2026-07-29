import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import { formSchema } from './schema';
import type { FormProps, FormValues } from './types';

const CATEGORY_OPTIONS = [
  { label: '电子产品', value: 'electronics' },
  { label: '服装', value: 'clothing' },
  { label: '食品', value: 'food' },
  { label: '其他', value: 'other' },
] as const;

export default function ProductForm({ mode, initialData, onSubmit, onCancel }: FormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      productName: '',
      category: 'electronics',
      price: undefined,
      stock: undefined,
      description: '',
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    try {
      await onSubmit(data);
      message.success(mode === 'create' ? '创建成功' : '保存成功');
    } catch {
      message.error('操作失败，请重试');
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
      <Form.Item
        label="商品名称"
        validateStatus={errors.productName ? 'error' : undefined}
        help={errors.productName?.message}
        required
      >
        <Input
          {...register('productName')}
          placeholder="请输入商品名称"
          maxLength={50}
          showCount
        />
      </Form.Item>

      <Form.Item
        label="商品分类"
        validateStatus={errors.category ? 'error' : undefined}
        help={errors.category?.message}
        required
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select {...field} options={[...CATEGORY_OPTIONS]} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="价格"
        validateStatus={errors.price ? 'error' : undefined}
        help={errors.price?.message}
        required
      >
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              placeholder="请输入价格"
              min={0.01}
              precision={2}
              prefix="¥"
              style={{ width: '100%' }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="库存"
        validateStatus={errors.stock ? 'error' : undefined}
        help={errors.stock?.message}
        required
      >
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              placeholder="请输入库存"
              min={0}
              precision={0}
              style={{ width: '100%' }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="商品描述"
        validateStatus={errors.description ? 'error' : undefined}
        help={errors.description?.message}
      >
        <Input.TextArea
          {...register('description')}
          placeholder="请输入商品描述（选填）"
          maxLength={500}
          showCount
          rows={4}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {mode === 'create' ? '创建' : '保存'}
        </Button>
        {onCancel && (
          <Button style={{ marginLeft: 12 }} onClick={onCancel}>
            取消
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
