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
  search: z.string().trim().min(1, 'Digite algo para buscar!'),
});

const SearchBar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  const router = useRouter();

  const handleSubmit = ({ search }: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${search}`);
  };

  return (
    <form
      id='search'
      onSubmit={form.handleSubmit(handleSubmit)}
      className='flex gap-2'>
      <Controller
        name='search'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              id='search'
              aria-invalid={fieldState.invalid}
              placeholder='Faça a sua busca...'
              autoComplete='search'
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
