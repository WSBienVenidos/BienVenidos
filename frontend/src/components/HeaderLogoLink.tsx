"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import api from "@/lib/api";

export default function HeaderLogoLink() {
  const pathname = usePathname();
  const [href, setHref] = useState("/");

  useEffect(() => {
    let active = true;
    api.me()
      .then(() => {
        if (!active) return;
        setHref("/users");
      })
      .catch(() => {
        if (!active) return;
        setHref("/");
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  return (
    <Link className="flex items-center" href={href}>
      <Image
        src="/logo.png"
        alt="Bienvenidos"
        width={160}
        height={64}
        priority
      />
    </Link>
  );
}
