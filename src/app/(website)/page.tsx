import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function Home({
    searchParams,
}: {
    searchParams?: { q?: string; page?: string; category?: string };
}) {
    const page = Number(searchParams?.page) || 1;
    const pageSize = 12;
    const search = searchParams?.q || '';
    const category = searchParams?.category || '';

    // Kategorileri çek
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    // Filtreleme için where objesi
    const where: any = {};
    if (search) {
        where.name = { contains: search };
    }
    if (category) {
        where.categories = {
            some: {
                category: {
                    category_id: category,
                },
            },
        };
    }

    // Toplam ürün sayısı
    const total = await prisma.product.count({ where });
    // Ürünleri çek
    const products = await prisma.product.findMany({
        where,
        orderBy: { date_added: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });

    const totalPages = Math.ceil(total / pageSize);

    // Modern sayfalama için yardımcı fonksiyon
    function getPagination(current: number, total: number) {
        const delta = 2;
        const range = [];
        for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
            range.push(i);
        }
        if (current - delta > 2) range.unshift('...');
        if (current + delta < total - 1) range.push('...');
        range.unshift(1);
        if (total > 1) range.push(total);
        return range;
    }
    const pagination = getPagination(page, totalPages);

    return (
        <div className="mx-auto max-w-7xl p-4">
            {/* Modern arama ve filtre kutusu */}
            <form className="mb-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-blue-100 bg-white/90 px-6 py-4 shadow md:flex-row">
                <input
                    type="text"
                    name="q"
                    placeholder="Ürün adı ara..."
                    defaultValue={search}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-700 shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none md:w-1/2"
                />
                <select
                    name="category"
                    defaultValue={category}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-700 shadow-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none md:w-1/4"
                >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map((cat: any) => (
                        <option key={cat.category_id} value={cat.category_id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-base font-bold text-white shadow-md transition hover:from-blue-600 hover:to-cyan-600"
                >
                    Ara
                </button>
            </form>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product: any) => (
                    <div
                        key={product.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xs transition hover:border-gray-200 hover:shadow-xs dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-gray-700"
                    >
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
                                    <span
                                        key={c.category.id}
                                        className="rounded-md border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-300/30 dark:bg-blue-900/30 dark:text-blue-200"
                                    >
                                        {c.category.name}
                                    </span>
                                ))}
                            </div>
                            <div className="line-clamp-2 text-base font-bold text-gray-900 dark:text-gray-100">
                                {product.name}
                            </div>
                            <div
                                className="line-clamp-2 min-h-[32px] text-xs text-gray-500 dark:text-gray-400"
                                dangerouslySetInnerHTML={{ __html: product.description || '' }}
                            />
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
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center rounded-lg bg-slate-600 px-4 py-2 text-base font-medium text-white shadow-none transition hover:bg-slate-700 dark:bg-cyan-900/40 dark:text-cyan-200 dark:hover:bg-cyan-800"
                            >
                                Ürünü Gör
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modern Sayfalama */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <a
                    href={`?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${Math.max(1, page - 1)}`}
                    className={`rounded-full border px-4 py-2 text-base font-semibold transition ${page === 1 ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400' : 'border-blue-200 bg-white text-blue-600 hover:scale-105 hover:bg-blue-50'}`}
                    aria-disabled={page === 1}
                >
                    &lt;
                </a>
                {pagination.map((p, i) =>
                    typeof p === 'number' ? (
                        <a
                            key={i}
                            href={`?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${p}`}
                            className={`rounded-full border px-4 py-2 text-base font-semibold transition ${page === p ? 'scale-110 border-blue-600 bg-blue-600 text-white shadow-lg' : 'border-blue-200 bg-white text-blue-600 hover:scale-105 hover:bg-blue-50'}`}
                        >
                            {p}
                        </a>
                    ) : (
                        <span key={i} className="px-2 text-lg text-gray-400 select-none">
                            ...
                        </span>
                    )
                )}
                <a
                    href={`?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${Math.min(totalPages, page + 1)}`}
                    className={`rounded-full border px-4 py-2 text-base font-semibold transition ${page === totalPages ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400' : 'border-blue-200 bg-white text-blue-600 hover:scale-105 hover:bg-blue-50'}`}
                    aria-disabled={page === totalPages}
                >
                    &gt;
                </a>
            </div>
        </div>
    );
}
