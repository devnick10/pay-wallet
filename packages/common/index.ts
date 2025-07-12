import z from "zod";
const signInSchema = z.object({
  name: z.string().min(3, { message: "Name should be least 4 character" }),
  phone: z
    .string()
    .min(10, { message: "Invalied length on number" })
    .max(10, { message: "Invalied length on number" }),
  password: z
    .string()
    .min(3, { message: "Password should be least 4 character" }),
});

const onRampValidationSchema = z.object({
  token: z.string().min(5, { message: "Invalid token" }),
  user_identifier: z.string({ message: "User identifier is required" }),
  amount: z
    .string({ message: "Amount required" })
    .min(2, { message: "Provied valid minimum amount" }),
});
export type CredentialsType = z.infer<typeof signInSchema>;

export { signInSchema, onRampValidationSchema };
