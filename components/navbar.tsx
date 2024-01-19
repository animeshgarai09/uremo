"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { ThemeToggleButton } from "@/components/themeToggleButton"
import { LiaFacebook } from "react-icons/lia"
import { RiTwitterXLine, RiMenu5Fill } from "react-icons/ri"
import { useState, useEffect } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
const Navbar = () => {
    const size = useWindowSize()
    const [mobileMenu, setMobileMenu] = useState(false)
    useEffect(() => {
        if (size?.width && size?.width > 640) {
            setMobileMenu(false)
            document.body.style.overflow = ""
        }
    }, [size.width])
    useEffect(() => {
        if (mobileMenu) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [mobileMenu])
    return (
        <header className='p-3  border-b border-border relative '>
            <div className='flex items-center justify-between sm:container'>
                <h3 className='font-semibold text-2xl z-10 relative'>UREMO</h3>

                <nav className='z-10'>
                    <ul className='hidden justify-between sm:flex'>
                        <li>
                            <Button asChild className='mx-1 bg-zinc-900 text-white hover:bg-slate-800'>
                                <Link href={"/"}>
                                    <DiscordLogoIcon className=' h-4 w-4 mr-2' />
                                    Join Our Community
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button asChild className='mx-3' variant='ghost'>
                                <Link href={"/"}>Sign In</Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant='outline' size='icon' className='mr-2'>
                                <RiTwitterXLine className='h-4 w-4' />
                            </Button>
                        </li>
                        <li>
                            <Button variant='outline' size='icon' className='mr-2'>
                                <LiaFacebook className='h-6 w-6' />
                            </Button>
                        </li>
                        <li>
                            <ThemeToggleButton />
                        </li>
                    </ul>
                    <div className='sm:hidden flex gap-2'>
                        <Button variant='outline' size='icon' className='mr-2' onClick={() => setMobileMenu((prev) => !prev)}>
                            <RiMenu5Fill className='h-6 w-6' />
                        </Button>
                        <ThemeToggleButton />
                    </div>
                </nav>
            </div>
            {mobileMenu && (
                <ul className='sm:hidden h-screen w-screen absolute top-0 left-0 pt-16 flex flex-col  bg-background z-[1]'>
                    <li className=' border-y border-border py-3 text-center'>
                        <Button asChild className='text-md' variant='link'>
                            <Link href={"/"}>Sign In</Link>
                        </Button>
                    </li>
                    <div className='flex max-w-15 justify-center py-5'>
                        <li>
                            <Button variant='outline' size='icon' className='mr-2'>
                                <RiTwitterXLine className='h-4 w-4' />
                            </Button>
                        </li>
                        <li>
                            <Button asChild className='mx-1 bg-zinc-900 text-white hover:bg-slate-800'>
                                <Link href={"/"}>
                                    <DiscordLogoIcon className=' h-4 w-4 mr-2' />
                                    Join Our Community
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant='outline' size='icon' className='mr-2'>
                                <LiaFacebook className='h-6 w-6' />
                            </Button>
                        </li>
                    </div>
                </ul>
            )}
        </header>
    )
}

export default Navbar
