import { Box, Button } from '@material-ui/core';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValue: Student) => void;
}
const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name')
      .test('two-words', 'Please enter atleast two word', (value) => {
        if (!value) return true;
        const parts = value?.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number')
      .integer('Please enter an integer number')
      .min(18, 'Min is 18')
      .max(70, 'Max is 70')
      .required('Please enter age')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .positive('Please enter a positive number')
      .max(10, 'Max is 10')
      .required('Please enter age')
      .typeError('Please enter a valid number'),
    gender: yup
      .string()
      .oneOf(['male', 'Female'], 'Please select either male or female')
      .required('Please select gender'),
    city: yup.string().required('Please select city'),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState<string>('');
  const handleFormSubmit = async (formValue: Student) => {
    console.log(formValue);
    try {
      setError('');
      await onSubmit?.(formValue);
    } catch (error) {
      console.log('Fail to add/update student', error);
      setError(error.message);
    }
  };
  const cityOptions = useAppSelector(selectCityOptions);
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <InputField name="age" control={control} label="Age" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="mark" control={control} label="Mark" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
