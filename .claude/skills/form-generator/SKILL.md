# React表单组件生成规范

## 技术栈
- React 19.2.7
- TypeScript 6.0
- Ant Design 6.5.1
- react-hook-form 7.82
- zod 4.4.3

## 文件结构
每个表单组件按以下结构组织：

FormName/
├── index.tsx       # 组件主文件
├── schema.ts       # zod校验规则
└── types.ts        # TypeScript类型

## 代码模板

### types.ts 模板
```typescript
import { z } from 'zod';
import { formSchema } from './schema';

export type FormValues = z.infer<typeof formSchema>;

export interface FormProps {
  mode: 'create' | 'edit';
  initialData?: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel?: () => void;
}
```

### schema.ts 模板
```typescript
import { z } from 'zod';

export const formSchema = z.object({
  // 字段定义，每个字段必须有中文错误提示
  username: z.string().min(1, '请输入用户名'),
  email: z.string().email('邮箱格式不正确'),
});
```

### index.tsx 模板
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Button } from 'antd';
import { formSchema } from './schema';
import type { FormProps, FormValues } from './types';

export default function FormName({ mode, initialData, onSubmit, onCancel }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {/* 表单字段 */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          提交
        </Button>
        {onCancel && <Button onClick={onCancel}>取消</Button>}
      </Form.Item>
    </Form>
  );
}
```

## 字段类型处理

### 文本类型

```typescript
// schema
username: z.string().min(3, '至少3个字符').max(20, '最多20个字符'),

// tsx
<Form.Item label="用户名" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
  <Input {...register('username')} placeholder="请输入用户名" />
</Form.Item>
```
### 邮箱类型

```typescript
// schema
email: z.string().email('邮箱格式不正确'),

// tsx
<Form.Item label="邮箱" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
  <Input {...register('email')} type="email" />
</Form.Item>
```

### 手机号
```typescript
// schema
phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),

// tsx
<Form.Item label="手机号" validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
  <Input {...register('phone')} maxLength={11} />
</Form.Item>
```

### 数字类型
```typescript
// schema
age: z.number().min(18, '年龄不能小于18').max(100, '年龄不能大于100'),

// tsx
<Form.Item label="年龄">
  <InputNumber {...register('age', { valueAsNumber: true })} min={0} max={150} />
</Form.Item>
```

### 下拉选择
```typescript
// schema
role: z.enum(['admin', 'user'], { errorMap: () => ({ message: '请选择角色' }) }),

// tsx
<Form.Item label="角色">
  <Select {...register('role')} options={[
    { label: '管理员', value: 'admin' },
    { label: '普通用户', value: 'user' },
  ]} />
</Form.Item>
```

## 提交处理
```typescript
const onSubmit = async (data: FormValues) => {
  try {
    await onSubmit(data);
    message.success(mode === 'create' ? '创建成功' : '保存成功');
  } catch (error) {
    message.error('操作失败，请重试');
  }
};
```

## 输出要求
- 完整的三个文件
- 所有字段都有zod校验
- 所有错误提示都是中文
- 提交按钮有loading状态