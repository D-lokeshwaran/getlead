'use client';

import Image from 'next/image';
import clsx from 'clsx';
import Link from "next/link"
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Leads', href: '/', icon: "leads-list" },
  {
    name: 'Modules',
    href: '/modules',
    icon: "leads-list",
  },
  {
    name: 'My Progress',
    href: '/my-progress',
    icon: "leads-list"
  },
  {
    name: 'trash',
    href: '/trash',
    icon: "leads-list"
  },
];

export default function NavLinks({  }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-1 my-3">
            {
                links.map((link) =>
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            `flex items-center gap-3 px-3 py-[0.4rem] rounded-lg hover:bg-[#F4EFE6] cursor-pointer hover:text-blue-600 md:flex-none md:justify-start md:px-3`,
                            {
                                'bg-[#F4EFE6]': pathname === link.href
                            },
                        )}
                    >
                        <div className="text-[#1C160C]" data-size="24px" data-weight="regular">
                            <Image src={`/icons/${link.icon}.svg`} alt={`nav link ${link.name}`}  width={20} height={20}/>
                        </div>
                        <p className="text-[#1C160C] text-sm font-medium leading-normal">{link.name}</p>
                    </Link>
                )
            }
        </div>
    )
}