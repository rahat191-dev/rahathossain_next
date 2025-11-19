"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavLinks {
    label?:string;
    href:string;
    image?:string;
}

export default function Navbar() {
    const mainLinks: NavLinks[] =[
        {label: "Rahat Hossain", href: "/"}
    ]

    const userLinks: NavLinks[] =[
        {image: "./images/svg/shop.svg", href: "/"}
    ]

    const secLinks: NavLinks[] =[
        {image: "./images/svg/profile.svg", href: "/"},
        {image: "./images/svg/works.svg", href: "/"},
        {image: "./images/svg/skills.svg", href: "/"},
        {image: "./images/svg/resume.svg", href: "/"},
        {image: "./images/svg/blog.svg", href: "/"},
        {image: "./images/svg/contact.svg", href: "/"},
        {image: "./images/svg/lessons.svg", href: "/"},
    ]

    return (
    <nav className="bg-nav">
        <div className="flex justify-between">
            <div>
                {mainLinks.map ((link, idx) =>(
                    <Link key={idx} href={link.href} >
                        {link.label}
                    </Link>
                ))}
            </div>
            <div>
                {userLinks.map ((link, idx) =>(
                    <Link key={idx} href={link.href} >
                        {link.image && <Image 
                        src={link.image}
                        alt="Button"
                        height={25}
                        width={25}
                        />}
                    </Link>
                ))}
            </div>
        </div>
    </nav>
    )
}