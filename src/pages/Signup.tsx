import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const signupSchema = z.object({
  username: z.string().trim().min(2, "Username must be at least 2 characters").max(30),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
});

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "", phone: "" },
  });

  const onSubmit = async (values: SignupForm) => {
    setError("");
    setLoading(true);
    const result = await signup(values.username, values.email, values.password, values.phone || "");
    setLoading(false);
    if (result.success === false) {
      setError(result.error);
      return;
    }
    refreshAuth();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/80 to-background" />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-black/75 p-10 md:p-14 shadow-2xl">
        <h1
          className="text-3xl font-extrabold tracking-wider mb-1"
          style={{ color: "hsl(var(--primary))" }}
        >
          MOVIEFLIX
        </h1>
        <h2 className="text-2xl font-semibold text-foreground mb-7">Sign Up</h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Phone (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 234 567 8900"
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Creating account…" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-muted-foreground mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
