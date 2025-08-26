"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Search, Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/public/images/logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DialogComponent from "@/components/common/DialogComponent";
import { LoginForm } from "@/components/login-form"

export default function Header() {
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const headerHeight = headerRef.current.offsetHeight;
      // Nếu scroll vượt quá nửa chiều cao của header
      if (window.scrollY > headerHeight / 2) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Text = ({ text }: { text: string }) => (<span className="text-14 font-semibold text-white">{text}</span>);
  
  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-40 transition-all duration-300 px-2 sm:px-6 text-sm
        ${scrolled ? "bg-neutral-950/80 backdrop-blur border-neutral-800" : "bg-neutral-950/950 border-neutral-80"}`}
    >
      <div className={`flex items-center gap-3 py-3`}>
        {/* Mobile menu */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/genres/hanh-dong")}>
                    Thể loại
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/genres/phim-le")}>
                    Phim lẻ
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/genres/phim-bo")}>
                    Phim bộ
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Quốc gia</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => router.push("/countries/vietnam")}>
                          Việt Nam
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/countries/sing")}>
                          Sing
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Đăng nhập</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link href="/" className="text-3xl font-black text-brand mb-1">
            <Image
              src={Logo.src}
              alt="ShinTV Logo"
              width={150}
              height={50}
              className="w-auto max-h-[24px] lg:max-h-[40px] object-contain"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-4 text-sm text-gray-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer text-white flex items-center">
                <Text text="Thể loại" />
                <ChevronDown className="w-4 h-4 ml-1 mt-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/genres/hanh-dong")}>
                  Hành động
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/genres/phim-le")}>
                  Phim lẻ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/genres/phim-bo")}>
                  Phim bộ
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/genres/tam-ly" className="hover:text-white">
            <Text text="Phim lẻ" />
          </Link>
          <Link href="/genres/hoat-hinh" className="hover:text-white">
            <Text text="Phim bộ" />
          </Link>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer text-white flex items-center">
                <Text text="Quốc gia" />
                <ChevronDown className="w-4 h-4 ml-1 mt-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/genres/hanh-dong")}>
                  Hành động
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/genres/phim-le")}>
                  Phim lẻ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/genres/phim-bo")}>
                  Phim bộ
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/genres/hoat-hinh" className="hover:text-white">
            <Text text="Diễn viên" />
          </Link>
        </nav>

        {/* Search + Auth */}
        <div className={`ml-auto flex items-center gap-2 text-white`}>
          <div className={`flex items-center ${scrolled ? "bg-neutral-900" : "bg-gray-200"} rounded-full px-3 py-1.5`}>
            <Search
              className={`w-4 h-4 ${scrolled ? "text-white" : "text-black"}`}
              onClick={() => router.push(`/search?q=${encodeURIComponent(q)}`)}
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && router.push(`/search?q=${encodeURIComponent(q)}`)}
              placeholder="Tìm phim ..."
              className={`bg-transparent outline-none text-sm px-2 ${scrolled ? "text-white" : "text-black"}`}
            />
          </div>
          <div className="hidden lg:flex items-center gap-2">
            
            <DialogComponent
              trigger={<Button 
              variant="ghost" 
              className="text-16"
            >Đăng nhập</Button>}
            >
              <LoginForm />
            </DialogComponent>
          </div>
        </div>
      </div>
    </header>
  );
}
