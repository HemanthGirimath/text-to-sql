'use client';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation"
import Sidebar from "@/components/layouts/sidebar"

  
import { useState, useEffect } from 'react';
import { Switch } from '../ui/switch';
import { useTheme } from "next-themes";
import { Button } from '../ui/button';
import Link from "next/link";
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-4 flex justify-between w-full">
       
        <div className="flex justify-between w-96"> 
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem >
                <Button className="mr-10">
                              <Sidebar></Sidebar>
                            </Button>
                            <Link href="/chat" legacyBehavior passHref >
                                <NavigationMenuLink className="mr-10">
                                      chat
                                </NavigationMenuLink>
                            </Link>
                            <Link href="/dashboard" legacyBehavior passHref>
                                <NavigationMenuLink>
                                    Dashboard
                                </NavigationMenuLink>
                            </Link>
                            
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </div>
        <div>
        <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      {/* <span className="ml-2">
        {theme === 'dark' ? 'Dark' : 'Light'} Mode
      </span> */}
        </div>


    </div>
    
  );
};

export default Navbar;