import { z } from 'zod';

export const formSchema = z.object({
  productName: z
    .string()
    .min(1, '请输入商品名称')
    .max(50, '商品名称最多50个字符'),

  category: z.enum(['electronics', 'clothing', 'food', 'other'], {
    message: '请选择商品分类',
  }),

  price: z
    .number({ message: '请输入有效价格' })
    .positive('价格必须大于0'),

  stock: z
    .number({ message: '请输入有效库存' })
    .int('库存必须为整数')
    .min(0, '库存不能小于0'),

  description: z
    .string()
    .max(500, '商品描述最多500个字符')
    .optional()
    .or(z.literal('')),
});
