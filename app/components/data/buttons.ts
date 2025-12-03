interface TypeLinks {
    label?: string;
    href?: string;
    hover?:string;
    sec?:string;
    image?: string;
}

   export const userLinks: TypeLinks[] = [
        { image: "/images/svg/nav-svg/shop.svg", href: "/" }
    ]

   export const secLinks: TypeLinks[] = [
    { image: "/images/svg/nav-svg/profile.svg", hover:"About", sec: "about" },
    { image: "/images/svg/nav-svg/resume.svg", hover:"Resume", sec: "resume" },
    { image: "/images/svg/nav-svg/skills.svg", hover:"Skills", sec: "skills" },
    { image: "/images/svg/nav-svg/media.svg", hover:"Media", sec: "media" },
    { image: "/images/svg/nav-svg/contact.svg", hover:"Contact", sec: "contact" },
    { image: "/images/svg/nav-svg/blog.svg", hover:"Blog", sec: "blog" },
]


   export const contactLinks: TypeLinks [] = [
    { image: "/images/svg/contacts/call.svg", href: "/" },
    { image: "/images/svg/contacts/email.svg", href: "/" }
];
