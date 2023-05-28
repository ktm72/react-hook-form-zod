import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

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

type formType = z.infer<typeof formSchema>;
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const onFormSubmit = (data: formType) => {
    console.log(data);
  };
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registration Form
        </h1>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              {...register("name")}
              placeholder="John Doe"
            />
            <p className="mt-1 text-xs font-medium italic text-rose-500">
              {errors?.name?.message}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              {...register("email")}
              placeholder="john@example.com"
            />
            <p className="mt-1 text-xs italic font-medium text-rose-500">
              {errors?.email?.message}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="number"
              id="phone"
              {...register("phone")}
              placeholder="012....."
            />
            <p className="mt-1 text-xs italic font-medium text-rose-500">
              {errors?.phone?.message}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option
                value="female"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                Female
              </option>
              <option
                value="male"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                Male
              </option>
              <option
                value="other"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                Other
              </option>
            </select>
            <p className="mt-1 text-xs italic font-medium text-rose-500">
              {errors?.gender?.message}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              {...register("password")}
              placeholder="********"
            />
          </div>
          <p className="mt-1 text-xs italic font-medium text-rose-500">
            {errors?.password?.message}
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="confirm-password"
              {...register("confirm")}
              placeholder="********"
            />
            <p className="mt-1 text-xs italic font-medium text-rose-500">
              {errors?.confirm?.message}
            </p>
          </div>
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
