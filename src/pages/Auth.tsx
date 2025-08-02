
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type SignInFormValues = {
  email: string;
  password: string;
};

type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
};

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resetEmail, setResetEmail] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);

  const signInForm = useForm<SignInFormValues>();
  const signUpForm = useForm<SignUpFormValues>();

  // Wait for auth to initialize before doing any redirects
  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
      if (user) {
        console.log('User is authenticated, redirecting to home...');
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  // Don't render anything until auth is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  const onSignIn = async (data: SignInFormValues) => {
    console.log('Attempting sign in...');
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Error signing in",
          description: error.message || "Failed to sign in. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Sign in successful');
        toast({
          title: "Success!",
          description: "You have been signed in successfully.",
        });
        // Don't navigate here, let the useEffect handle it
      }
    } catch (err) {
      console.error('Unexpected sign in error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUp = async (data: SignUpFormValues) => {
    console.log('Attempting sign up...');
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Error signing up",
          description: error.message || "Failed to create account. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Sign up successful');
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (err) {
      console.error('Unexpected sign up error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async () => {
    if (!resetEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });
      
      if (error) {
        console.error('Password reset error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to send reset email. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Password reset email sent. Please check your inbox.",
        });
        setShowResetPassword(false);
        setResetEmail("");
      }
    } catch (err) {
      console.error('Unexpected reset password error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/bb163471-e547-491d-b573-7d52ae442c7c.png" 
              alt="FabGuard Logo" 
              className="h-12 w-12 mr-3"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              FabGuard
            </h1>
          </div>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                <div>
                  <label htmlFor="signin-email" className="block font-medium mb-1">Email</label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@email.com"
                    {...signInForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {signInForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {signInForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="signin-password" className="block font-medium mb-1">Password</label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Password"
                    {...signInForm.register("password", { required: "Password is required" })}
                  />
                  {signInForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {signInForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
              
              {showResetPassword && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-2">Reset Password</h3>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={onResetPassword}
                        disabled={isLoading}
                        size="sm"
                      >
                        {isLoading ? "Sending..." : "Send Reset Email"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setShowResetPassword(false);
                          setResetEmail("");
                        }}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="block font-medium mb-1">Full Name</label>
                  <Input
                    id="signup-name"
                    placeholder="Your Name"
                    {...signUpForm.register("fullName", { required: "Name is required" })}
                  />
                  {signUpForm.formState.errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {signUpForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="signup-email" className="block font-medium mb-1">Email</label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@email.com"
                    {...signUpForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {signUpForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="signup-password" className="block font-medium mb-1">Password</label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create password"
                    {...signUpForm.register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  {signUpForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
