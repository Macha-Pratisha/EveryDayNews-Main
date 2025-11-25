// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Newspaper } from 'lucide-react';
// import { toast } from 'sonner';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await login(email, password);
//       toast.success('Login successful!');
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
//       <Card className="w-full max-w-md p-8">
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//             <Newspaper className="h-8 w-8 text-primary" />
//           </div>
//           <h1 className="text-2xl font-bold">Manager Login</h1>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Access your newspaper agency portal
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="manager@agency.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login'}
//           </Button>
//         </form>

//         <div className="mt-6 text-center text-sm">
//           <span className="text-muted-foreground">Don't have an account? </span>
//           <Link to="/signup" className="font-medium text-primary hover:underline">
//             Sign up
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Newspaper className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Manager Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access your newspaper agency portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="manager@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
