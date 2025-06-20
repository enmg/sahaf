import { ProductCardProps } from '@/types/product';
import Image from 'next/image';
import { toProductSlug } from '@/lib/utils/';

export function ProductCard({ product, search }: ProductCardProps) {
    function stripHtml(html: string): string {
        if (!html) return '';
        return html
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs transition hover:border-gray-200 hover:shadow-xs dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-gray-700">
            <div className="flex h-48 items-center justify-center overflow-hidden bg-gray-50 p-0 dark:bg-neutral-800">
                <Image
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="h-48 w-full rounded-t-2xl object-cover transition group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-1 flex-col gap-3 px-4 pt-3">
                <div className="mb-1 flex flex-wrap gap-2">
                    {product.categories.map((c: any) => (
                        <a
                            key={c.category.id}
                            href={`?q=${encodeURIComponent(search)}&category=${encodeURIComponent(c.category.category_id)}&page=1`}
                            className="cursor-pointer rounded-md border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-300/30 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-800"
                        >
                            {c.category.name}
                        </a>
                    ))}
                </div>
                <div className="line-clamp-2 text-base font-bold text-gray-900 dark:text-gray-100">
                    {product.name}
                </div>
                <div className="line-clamp-2 min-h-[32px] text-xs text-gray-500 dark:text-gray-400">
                    {stripHtml(product.description || '')}
                </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2 px-4 pt-2 pb-4">
                <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-base font-semibold text-slate-900 shadow-none dark:bg-neutral-800 dark:text-blue-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        ></path>
                    </svg>
                    <span>
                        {Number(product.price).toLocaleString('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                        })}
                    </span>
                </div>
                <a
                    href={`/${product.product_id}-${toProductSlug(product.name)}`}
                    className="bg-primary hover:bg-primary/90 focus:ring-primary/50 flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-white shadow transition focus:ring-2 focus:outline-none dark:bg-cyan-900/40 dark:text-cyan-200 dark:hover:bg-cyan-800"
                    aria-label="Ürün detayını gör"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.75 12l-6 6m0 0l-6-6m6 6V3"
                        />
                    </svg>
                    Ürünü Gör
                </a>
            </div>
        </div>
    );
}
