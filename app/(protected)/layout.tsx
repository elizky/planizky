import Link from 'next/link';
import { Dumbbell, Home, PanelLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/toaster';

import { User } from './user';
import Providers from './providers';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
        <div className='flex flex-col sm:gap-4  '>
          <header
            className='container sticky top-0 z-30 flex h-14 justify-between sm:justify-end items-center gap-4 border-b 
          bg-gradient-to-b from-white dark:from-black to-muted/10 
          sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4'
          >
            <MobileNav />
            <User />
          </header>
          <main className='grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/10'>
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </Providers>
  );
}

const menuData = [
  {
    title: 'Dashboard',
    icon: <Home className='h-6 w-6 xl:h-4 xl:w-4' />,
    linkTo: '/dashboard',
  },
];

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='outline' className='sm:hidden'>
          <PanelLeft className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='sm:max-w-xs'>
        <nav className='grid gap-6 text-lg font-medium'>
          <Dumbbell className='h-5 w-5 transition-all group-hover:scale-110' />
          <span className='sr-only'>Planizky</span>
          {menuData.map((menu) => (
            <SheetClose key={`${menu.title}-mobile`} asChild>
              <Link
                href={menu.linkTo}
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              >
                {menu.icon}
                {menu.title}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
