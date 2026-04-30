import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { SvelteHTMLElements } from 'svelte/elements';

type ElementProps<T extends keyof SvelteHTMLElements> = SvelteHTMLElements[T];

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};

export type WithoutChildrenOrChild<T> = Omit<T, 'children' | 'child'>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
