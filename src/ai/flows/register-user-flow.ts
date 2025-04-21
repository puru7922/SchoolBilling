'use server';
/**
 * @fileOverview Registers a new user.
 *
 * - registerUser - A function that handles the user registration process.
 * - RegisterUserInput - The input type for the registerUser function.
 * - RegisterUserOutput - The return type for the registerUser function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RegisterUserInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  email: z.string().email().describe('The email of the user.'),
  password: z.string().describe('The password of the user.'),
});
export type RegisterUserInput = z.infer<typeof RegisterUserInputSchema>;

const RegisterUserOutputSchema = z.object({
  success: z.boolean().describe('Whether the user registration was successful.'),
  message: z.string().optional().describe('A message providing more details about the registration outcome.'),
});
export type RegisterUserOutput = z.infer<typeof RegisterUserOutputSchema>;

export async function registerUser(input: RegisterUserInput): Promise<RegisterUserOutput> {
  return registerUserFlow(input);
}

const prompt = ai.definePrompt({
  name: 'registerUserPrompt',
  input: {
    schema: z.object({
      name: z.string().describe('The name of the user.'),
      email: z.string().email().describe('The email of the user.'),
      password: z.string().describe('The password of the user.'),
    }),
  },
  output: {
    schema: z.object({
      success: z.boolean().describe('Whether the user registration was successful.'),
      message: z.string().optional().describe('A message providing more details about the registration outcome.'),
    }),
  },
  prompt: `You are an AI assistant that helps with user registration.
  Based on the provided information, determine if the registration should be successful.
  If the email is already in use, or the password does not meet security standards, registration should fail.

  Name: {{{name}}}
  Email: {{{email}}}
  Password: {{{password}}}

  Respond with a JSON object indicating the success and a message if registration fails.`,
});

const registerUserFlow = ai.defineFlow<
  typeof RegisterUserInputSchema,
  typeof RegisterUserOutputSchema
>(
  {
    name: 'registerUserFlow',
    inputSchema: RegisterUserInputSchema,
    outputSchema: RegisterUserOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Simulate user registration logic here
    // In a real application, this would involve storing the user data in a database
    // and potentially sending a confirmation email.
    // For demonstration purposes, we always return a successful registration.
    return { success: true, message: 'User registered successfully.' };
  }
);
