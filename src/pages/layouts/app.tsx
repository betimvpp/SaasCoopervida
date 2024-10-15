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
      <div className='h-full w-[10%] p-8 '>
        <Profile />
        <SideBar />
      </div>
      <Separator orientation='vertical' />
      <div className='h-[2500px] w-full p-8'>
        <span className="absolute top-8 right-8">
          <ModeToggle />
        </span>
        <Outlet />
      </div>
    </div>
  )
}
