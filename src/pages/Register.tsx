
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    // Replace this stub with registration logic once backend is connected.
    alert("Registered! (This is just a demo — setup backend for real auth.)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
        <p className="text-gray-500 mb-6 text-center">Create a new account</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name</label>
            <Input
              id="name"
              placeholder="Your Name"
              autoComplete="name"
              {...register("name", { required: "Name is required" })}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              autoComplete="new-password"
              {...register("password", { required: "Password is required" })}
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
        <div className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
