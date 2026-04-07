import z from "zod";

const signInSchema = z.object({
  name: z.string({ message: "Name is required" }).min(3, { message: "Name should be least 4 character" }),
  phone: z
    .string({ message: "Phone number is required" })
    .min(10, { message: "Invalied length on number" })
    .max(10, { message: "Invalied length on number" }),
  password: z
    .string({ message: "Password is required" })
    .min(3, { message: "Password should be least 4 character" }),
});

const onRampValidationSchema = z.object({
  token: z.string().min(5, { message: "Invalid token" }),
  user_identifier: z.string({ message: "User identifier is required" }),
  amount: z
    .string({ message: "Amount required" })
    .min(2, { message: "Provied valid minimum amount" }),
});

const SUPPORTED_BANK_PROVIDERS = ["HDFC Bank", "Axis Bank"] as const;

const onRampTransactionSchema = z.object({
  amount: z.number({ message: "Amount is required" }),
  provider: z.enum(SUPPORTED_BANK_PROVIDERS),
});

const p2pTransferSchema = z.object({
  phone: z.number({ message: "Phone number is required" }),
  amount: z.number({ message: "Amount is required" }),
});


export type CredentialsType = z.infer<typeof signInSchema>;
export { onRampTransactionSchema, onRampValidationSchema, p2pTransferSchema, signInSchema };

