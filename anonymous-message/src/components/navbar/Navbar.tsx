'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { data: session, status } = useSession();
  const { setTheme } = useTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="p-4 bg-white/80 dark:bg-black/70 border-b backdrop-blur-sm w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'}>
          <div className="text-xl font-bold">Anonymous</div>
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link href={'/'} >
            Home
          </Link>
          {status === 'authenticated' ? (
             <Link href={'/dashboard'} >
             Dashboard
           </Link>
          ): null}
         
          <Link href={'/about'} >
            About
          </Link>
          <Link href={'/contact'} >
            Contact
          </Link>
        </div>

        <div className="flex space-x-4 items-center">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          {status === 'authenticated' ? (
            <Button className=' bg-red-600 hover:bg-red-700 dark:bg-red-600' onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Link href={'/sign-in'}>
              <Button variant="custom">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
