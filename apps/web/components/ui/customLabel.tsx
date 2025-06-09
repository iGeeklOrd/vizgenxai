import React from "react";

export default function CustomLabel({ label }: { label: string }) {
  return (
    <label className="
    absolute top-0 block origin-start px-1
    text-sm text-muted-foreground
    translate-y-2 transition-all
    cursor-text

    group-focus-within:pointer-events-none
    group-focus-within:-translate-y-1/2
    group-focus-within:text-xs
    group-focus-within:font-medium
    group-focus-within:text-foreground

    has-[+textarea:not(:placeholder-shown)]:pointer-events-none
    has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2
    has-[+textarea:not(:placeholder-shown)]:cursor-default
    has-[+textarea:not(:placeholder-shown)]:text-xs
    has-[+textarea:not(:placeholder-shown)]:font-medium
    has-[+textarea:not(:placeholder-shown)]:text-foreground
    ">
      <span className="
      inline-flex 
      bg-background 
      px-2">{label}</span>
    </label>
  );
}