import { ModeToggle } from '@/components/mode-toggle'
import { Profile } from '@/components/profile'
import { SideBar } from '@/components/side-bar'
import { Separator } from '@/components/ui/separator'
import supabase from '@/lib/supabase'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (!session || error) {
        navigate('/login', { replace: true });
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((session) => {
      if (!session) {
        navigate('/login', { replace: true });
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);



  return (
    <div className='h-screen flex overflow-hidden'>
      <div className='h-full w-[12%] p-8 default:bg-primary bg-cooper'>
        <Profile />
        <SideBar />
      </div>
      <Separator orientation='vertical' />
      <div className='w-full p-8 flex gap-2'>
        <Outlet />
        <span className="absolute top-8 right-8">
          <ModeToggle />
        </span>
      </div>
    </div>
  )
}
