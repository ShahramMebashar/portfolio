"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import React from "react";

interface ViewTransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: React.ReactNode;
}

export function ViewTransitionLink({ href, children, onClick, ...props }: ViewTransitionLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    if (!document.startViewTransition) {
      startTransition(() => {
        router.push(href);
      });
      return;
    }

    document.startViewTransition(() => {
      startTransition(() => {
        router.push(href);
      });
    });
  };

  return (
    <Link href={href} onClick={handleNavigation} {...props}>
      {children}
    </Link>
  );
}
