import BackButton from '@/components/back-button';
import Footer from '@/components/footer';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ idAndSlug: string }> }) {
    const { idAndSlug } = await params;

    const [id] = idAndSlug.split('-');
    const product = await prisma.product.findUnique({
        where: { product_id: id },
        include: {
            categories: {
                include: { category: true },
            },
        },
    });

    if (!product) {
        return <div className="mt-20 text-center text-lg">Ürün bulunamadı.</div>;
    }

    const images: string[] = Array.isArray(product.images) ? product.images : [];

    function stripHtml(html: string): string {
        if (!html) return '';
        return html
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    return (
        <>
            <script type="application/ld+json" suppressHydrationWarning>
                {JSON.stringify({
                    '@context': 'https://schema.org/',
                    '@type': 'Product',
                    name: product.name,
                    image: [
                        product.image,
                        ...(Array.isArray(product.images) ? product.images : []),
                    ],
                    description: stripHtml(product.description || ''),
                    sku: product.sku,
                    mpn: product.model,
                    brand: product.manufacturer
                        ? { '@type': 'Brand', name: product.manufacturer }
                        : undefined,
                    review: {
                        '@type': 'Review',
                        reviewRating: {
                            '@type': 'Rating',
                            ratingValue: product.rating,
                            bestRating: 5,
                        },
                        author: { '@type': 'Person', name: 'Kullanıcı' },
                    },
                    aggregateRating: {
                        '@type': 'AggregateRating',
                        ratingValue: product.rating,
                        reviewCount: product.reviews,
                    },
                    offers: {
                        '@type': 'Offer',
                        url: product.url,
                        priceCurrency: 'TRY',
                        price: product.price,
                        availability: product.stock_status?.toLowerCase().includes('stok')
                            ? 'https://schema.org/InStock'
                            : 'https://schema.org/OutOfStock',
                    },
                })}
            </script>
            <div className="container mx-auto mt-10 max-w-7xl px-4 py-8">
                <div className="mb-6">
                    <BackButton />
                </div>
                <div className="flex flex-col gap-10 md:flex-row">
                    <div className="flex w-full flex-col items-center gap-4 md:w-2/5">
                        <div className="flex aspect-[4/5] w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white md:max-w-none dark:border-neutral-800 dark:bg-neutral-900">
                            <Image
                                src={product.image || '/placeholder.png'}
                                alt={product.name}
                                width={600}
                                height={750}
                                className="h-96 w-full object-contain md:h-[28rem]"
                                loading="lazy"
                            />
                        </div>
                        {images.length > 0 && (
                            <div className="mt-2 flex flex-wrap justify-center gap-2">
                                {images.map((img: string, i: number) => (
                                    <Image
                                        key={i}
                                        src={img || '/placeholder.png'}
                                        alt={product.name + ' ek görsel ' + (i + 1)}
                                        width={64}
                                        height={64}
                                        className="h-12 w-12 cursor-pointer rounded-lg border border-gray-200 bg-white object-cover dark:border-neutral-700 dark:bg-neutral-900"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-1 flex-col gap-6">
                        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-2 flex flex-wrap gap-2">
                                {product.categories.map((c: any) => (
                                    <Link
                                        key={c.category.category_id}
                                        href={`/?category=${encodeURIComponent(c.category.category_id)}`}
                                        className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-300/30 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-800"
                                    >
                                        {c.category.name}
                                    </Link>
                                ))}
                            </div>
                            <h1 className="mb-2 text-3xl leading-tight font-extrabold text-gray-900 dark:text-gray-100">
                                {product.name}
                            </h1>
                            <div className="mb-2 flex flex-wrap items-center gap-4">
                                <span className="bg-primary rounded-xl px-6 py-3 text-2xl font-bold text-white">
                                    {Number(product.price).toLocaleString('tr-TR', {
                                        style: 'currency',
                                        currency: 'TRY',
                                    })}
                                </span>
                                {product.special && (
                                    <span className="rounded-xl bg-yellow-400/90 px-4 py-2 text-lg font-semibold text-yellow-900">
                                        Kampanya:{' '}
                                        {Number(product.special).toLocaleString('tr-TR', {
                                            style: 'currency',
                                            currency: 'TRY',
                                        })}
                                    </span>
                                )}
                                {product.stock_status && (
                                    <span
                                        className={
                                            product.stock_status.toLowerCase().includes('yok')
                                                ? 'rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                : 'rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                        }
                                    >
                                        {product.stock_status}
                                    </span>
                                )}
                                {product.manufacturer && (
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
                                        {product.manufacturer}
                                    </span>
                                )}
                                {product.rating > 0 && (
                                    <span className="flex items-center gap-1 text-base text-yellow-600 dark:text-yellow-300">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={
                                                    i < Math.round(product.rating)
                                                        ? 'currentColor'
                                                        : 'none'
                                                }
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M12 17.25l-6.16 3.24 1.18-6.88-5-4.87 6.91-1.01L12 2.25l3.09 6.48 6.91 1.01-5 4.87 1.18 6.88z"
                                                />
                                            </svg>
                                        ))}
                                        <span className="ml-1 text-xs">({product.rating} / 5)</span>
                                    </span>
                                )}
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-neutral-800 dark:text-gray-300">
                                    {product.reviews} Yorum
                                </span>
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-neutral-800 dark:text-gray-300">
                                    {product.viewed} Görüntülenme
                                </span>
                            </div>
                            <div className="prose prose-sm dark:prose-invert min-h-[80px] max-w-none text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                <div
                                    dangerouslySetInnerHTML={{ __html: product.description || '' }}
                                />
                            </div>
                            <div className="mt-4">
                                <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary hover:bg-primary/90 focus:ring-primary/50 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white shadow transition focus:ring-2 focus:outline-none"
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
                                    Ürünü Satın Al
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer search="" />
        </>
    );
}
