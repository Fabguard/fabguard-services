
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    // Replace this stub with authentication logic once backend is connected.
    alert("Logged in! (This is just a demo — setup backend for real auth.)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-center">Log in</h2>
        <p className="text-gray-500 mb-6 text-center">Access your account</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="Password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <div className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
