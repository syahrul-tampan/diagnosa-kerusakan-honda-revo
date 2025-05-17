
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mock login - in a real app, you'd validate against a backend
    setTimeout(() => {
      if (email && password) {
        // Store login state in localStorage
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Login berhasil");
        navigate("/");
      } else {
        toast.error("Email dan password diperlukan");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Masukkan kredensial Anda untuk mengakses akun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password">Password</label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Memproses..." : "Login"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mt-2">
                Belum punya akun? <a href="#" className="text-revo-accent">Registrasi</a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
