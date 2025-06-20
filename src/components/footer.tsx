import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { env } from '@/lib';
import Link from 'next/link';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { getBaseUrl } from '../lib/utils/urls';
import { LINKS } from '@/constants/links';
import { prisma } from '@/lib/prisma';

export default async function FooterSection(props: { search?: string }) {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });
    const search = props.search || '';
    const categoryColCount = Math.max(1, Math.ceil(categories.length / 5));
    const gridColsClass =
        categoryColCount === 1
            ? 'grid-cols-1'
            : categoryColCount === 2
              ? 'grid-cols-2'
              : categoryColCount === 3
                ? 'grid-cols-3'
                : categoryColCount === 4
                  ? 'grid-cols-4'
                  : 'grid-cols-5';
    return (
        <footer className="mx-auto mt-10 max-w-7xl px-4 py-8">
            <div className="grid gap-30 md:grid-cols-3">
                <div className="md:col-span-1">
                    <Link href={getBaseUrl()} className="mb-6 inline-flex items-center space-x-2">
                        <Logo />
                    </Link>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        {env.APP_DESCRIPTION}
                    </p>
                    <div className="mb-4 flex gap-2">
                        {LINKS.map((link, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="icon"
                                asChild
                                className="hover:bg-primary hover:text-primary-foreground h-8 w-8 transition-colors"
                            >
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                >
                                    <link.icon className="h-3 w-3" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-foreground mb-4 flex items-center gap-2 text-base font-semibold">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-500/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-palette h-3 w-3 text-blue-500"
                                aria-hidden="true"
                            >
                                <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path>
                                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </svg>
                        </span>
                        Kategoriler
                    </h3>
                    <nav>
                        <div className={`grid gap-2 ${gridColsClass} auto-cols-max`}>
                            {Array.from({ length: Math.ceil(categories.length / 5) }).map(
                                (_, colIdx) => (
                                    <div
                                        key={colIdx}
                                        className="max-w-[160px] min-w-[160px] space-y-2"
                                    >
                                        {categories
                                            .slice(colIdx * 5, (colIdx + 1) * 5)
                                            .map((cat: any) => (
                                                <a
                                                    key={cat.category_id}
                                                    href={`/?q=${encodeURIComponent(search)}&category=${encodeURIComponent(cat.category_id)}&page=1`}
                                                    className="text-muted-foreground hover:text-foreground flex w-full items-center truncate pr-10 text-sm transition-colors"
                                                >
                                                    <span className="mr-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                                                    <span className="truncate">{cat.name}</span>
                                                </a>
                                            ))}
                                    </div>
                                )
                            )}
                        </div>
                    </nav>
                </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 pt-6">
                <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
                    © {new Date().getFullYear()} Nostalji Dükkanı
                </span>
                <ThemeSwitcher />
            </div>
        </footer>
    );
}
