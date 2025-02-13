import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormGetValues,
  type UseFormHandleSubmit,
  UseFormRegister,
  type UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
  type ValidationMode,
} from "react-hook-form";

type Arguments<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  mode?: keyof ValidationMode;
};

type Results<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  getValues: UseFormGetValues<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  isDirty: boolean;
  isValid: boolean;
  reset: (defaultValues?: DefaultValues<T>) => void;
  setError: UseFormSetError<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  register: UseFormRegister<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = "onSubmit",
}: Arguments<T>): Results<T> => {
  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    register,
  } = useForm<T>({
    defaultValues,
    mode,
  });

  return {
    control,
    errors,
    getValues,
    handleSubmit,
    isDirty,
    isValid,
    reset,
    setError,
    setValue,
    watch,
    register,
  };
};

export { useAppForm };
