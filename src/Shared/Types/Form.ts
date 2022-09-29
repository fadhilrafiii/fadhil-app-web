export interface FormField<T> {
  value: T;
  errorMessage?: string;
  required?: boolean;
}
