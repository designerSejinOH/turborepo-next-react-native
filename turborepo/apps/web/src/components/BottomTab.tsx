"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface BottomTabProps {
  links: { path: string; label: string }[];
}

export function BottomTab(props: BottomTabProps): React.JSX.Element {
  const { links } = props;
  const pathname = usePathname();

  return (
    <>
      <div className="fixed left-0 bottom-0 w-full flex flex-row gap-2 p-4">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`${
              pathname === link.path ? "text-blue-500" : "text-gray-500"
            } p-4 w-full text-center text-xl`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
