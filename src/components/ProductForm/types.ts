import { z } from 'zod';
import { formSchema } from './schema';

export type FormValues = z.infer<typeof formSchema>;

export interface FormProps {
  mode: 'create' | 'edit';
  initialData?: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel?: () => void;
}
