'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SplitTextAnimation } from "./ui/split-text";

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companion', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' }
]

const NavItems = ({ mobile = false }: NavItemsProps) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex items-center gap-4",
        mobile ? "flex-col items-start w-full" : "hidden md:flex"
      )}
    >
      {navItems.map(({ label, href }, index) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "transition-colors",
            pathname === href && "text-primary font-semibold",
            mobile && "w-full py-2"
          )}
        >
          {mobile ? (
            <SplitTextAnimation
              type="chars"
              trigger="load"
              stagger={0.06}
              duration={0.7}
              ease="back.out(1.4)"
              delay={0.15 + index * 0.05}
              className="text-lg font-medium"
            >
              {label}
            </SplitTextAnimation>
          ) : (
            label
          )}
        </Link>
      ))}
    </nav>
  )
}

export default NavItems