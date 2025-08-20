"use client";

import { ChevronDownIcon } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";

interface NavItem {
  label: string;
  id: string;
  active: boolean;
}

export const Footer = (): JSX.Element => {
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([
    { label: "Exchange", id: "exchange", active: true },
    { label: "How To", id: "how-to", active: false },
    { label: "Reviews", id: "reviews", active: false },
    { label: "FAQ", id: "faq", active: false },
    { label: "Blog", id: "blog", active: false },
  ]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } 
  };

  const updateActiveItem = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNavigationItems((prevItems) =>
              prevItems.map((item) => ({
                ...item,
                active: item.id === entry.target.id,
              }))
            );
          }
        });
      },
      { threshold: 0.5 } 
    );

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navigationItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [navigationItems]);

  useEffect(() => {
    const cleanup = updateActiveItem();
    return cleanup;
  }, [updateActiveItem]);

  return (
    <footer className="w-full bg-[#252525] py-[52px]">
      <div className="max-w-[1392px] mx-auto px-6 flex items-center justify-between">
        <img
          className="w-[169.62px] h-[53.39px]"
          alt="Frame"
          src="https://c.animaapp.com/meffcgsqJEhpuK/img/frame-1.svg"
        />

        <div className="flex items-center gap-12">
          <nav className="flex items-center gap-[31px]">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-auto p-0 font-normal text-base tracking-[0] leading-normal whitespace-nowrap ${
                  item.active
                    ? "text-[#2e77da] hover:text-[#2e77da]"
                    : "text-[#c1c1c1] opacity-50 hover:text-[#c1c1c1] hover:opacity-75"
                }`}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="relative flex items-center">
            <span className="text-[#c1c1c1] text-base text-center font-normal tracking-[0] leading-[51px] whitespace-nowrap mr-2">
              en
            </span>
            <ChevronDownIcon className="w-4 h-4 text-[#c1c1c1]" />
          </div>
        </div>
      </div>
    </footer>
  );
};