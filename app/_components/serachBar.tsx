'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from './ui/button';
import { Field, FieldError } from './ui/field';
import { Input } from './ui/input';

const formSchema = z.object({
  title: z.string().trim().min(1, 'Digite algo para buscar!'),
});

const SearchBar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const router = useRouter();

  const handleSubmit = ({ title }: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?title=${title}`);
  };

  return (
    <form
      id='search'
      onSubmit={form.handleSubmit(handleSubmit)}
      className='flex gap-2'>
      <Controller
        name='title'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              id='title'
              aria-invalid={fieldState.invalid}
              placeholder='Faça a sua busca...'
              autoComplete='title'
              className='w-full'
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type='submit'>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default SearchBar;
