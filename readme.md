## Installation

```
pnpm i react-hook-form @hookform/resolvers zod

```

## Schema

- name: string
- email: string
- phone: number
- gender: enum
- password: string
- confirm: string

## Validation level

```
const formSchema = z
  .object({
    name: z.string().min(4, "Name should contain at least 4 characters"),
    email: z.string().email(),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({
        message: "You must select either Male or Female!",
      }),
    }),
    password: z.string().min(6, "Password should be at least 6 characters"),
    phone: z
      .string()
      .min(10, "Use valid phone number")
      .transform((data) => (data.includes("88") ? "+" + data : "+88" + data)),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
```

# cd src/component/SignUp
