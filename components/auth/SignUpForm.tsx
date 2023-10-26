"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {Stack, Heading, FormControl, FormLabel, Input, Button, FormErrorMessage, Center} from "@chakra-ui/react";
import { z } from 'zod';

// Define your schema using Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  passwordConfirmation: z.string(),
}).refine(data => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ['passwordConfirmation']
});

type Inputs = z.infer<typeof schema>;

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Center>
          <Heading as='h1' size='lg'>
            Create new account
          </Heading>
        </Center>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type='email' {...register('email')} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type='password' {...register('password')} />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.passwordConfirmation}>
          <FormLabel>Password Confirmation</FormLabel>
          <Input type='password' {...register('passwordConfirmation', {
            validate: value => value === password || "The passwords do not match"
          })} />
          <FormErrorMessage>
            {errors.passwordConfirmation && errors.passwordConfirmation.message}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme='blue' type="submit">Sign Up</Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
