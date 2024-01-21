"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { ThemeToggleButton } from "@/components/themeToggleButton"
import { LiaFacebook } from "react-icons/lia"
import { RiTwitterXLine, RiMenu5Fill } from "react-icons/ri"
import { useState, useEffect } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { getProviders, useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SIGN_IN } from "@/routes"
const Navbar = () => {
    const isUserLoggedin = false
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
                <h3 className='font-semibold text-2xl z-10 relative'>
                    <Link href='/'>UREMO </Link>
                </h3>

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
                        {isUserLoggedin ? (
                            <li>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className='h-9 w-9 mx-3'>
                                            <AvatarImage src='https://github.com/shadcn.png' />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end'>
                                        <DropdownMenuItem>
                                            <Link href={"/"}> My Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Button className='text-md w-full ' variant='destructive' onClick={() => signOut()}>
                                                Sign Out
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        ) : (
                            <li>
                                <Button asChild className='mx-3' variant='ghost'>
                                    <Link href={SIGN_IN}>Sign In</Link>
                                </Button>
                            </li>
                        )}
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
                    {isUserLoggedin ? (
                        <>
                            <li className=' border-y border-border text-center py-3'>
                                <Button className='text-lg ' variant='link'>
                                    <Link href={"/"}> My Profile</Link>
                                </Button>
                            </li>
                            <li className='block border-y border-border'>
                                <Button className='text-lg w-full h-16 rounded-none' variant='destructive' onClick={() => signOut()}>
                                    Sign Out
                                </Button>
                            </li>
                        </>
                    ) : (
                        <li className=' border-y border-border py-3 text-center'>
                            <Button className='text-md w-full' variant='link' onClick={() => setMobileMenu(false)}>
                                <Link href={SIGN_IN}>Sign In</Link>
                            </Button>
                        </li>
                    )}

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
