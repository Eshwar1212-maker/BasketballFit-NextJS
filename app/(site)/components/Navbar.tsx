"use client"

import { FC } from 'react'
import {Sacramento, Pacifico, PT_Sans, Bonheur_Royale} from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation';


const cedarville_cursive = Pacifico({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-cedarville-cursive',
    weight: '400'
  })
  const inter = PT_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
    weight: "400",
  });
  const bon = Bonheur_Royale({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
    weight: "400",
  });


interface NavbarProps {
  
}
const Navbar: FC<NavbarProps> = ({
  
}) => {
  const router = useRouter()
  return (
    <div className='flex justify-between px-20 py-4 bg-white text-black'>
      <div style={inter.style} className='text-xl text-blue-800'>
       SportsSync
      </div>
      <div className='text-sm font-bold'>
        <button onClick={() => router.push("/auth")}>SIGN UP</button>
      </div>
    </div>
  )
}

export default Navbar