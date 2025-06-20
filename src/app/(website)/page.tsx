import { prisma } from '@/lib/prisma';
import { Pagination } from '@/components/pagination';
import { ProductCard } from '@/components/product';
import { SearchBox } from '@/components/search-box';
import Footer from '@/components/footer';

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; page?: string; category?: string }>;
}) {
    const searchPrms = await searchParams;

    const page = Number(searchPrms?.page) || 1;
    const pageSize = 12;
    const search = searchPrms?.q || '';
    const category = searchPrms?.category || '';

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

    const total = await prisma.product.count({ where });
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
        <>
            <div className="mx-auto max-w-7xl p-4">
                <SearchBox search={search} />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} search={search} />
                    ))}
                </div>

                <Pagination
                    pagination={pagination}
                    page={page}
                    totalPages={totalPages}
                    search={search}
                    category={category}
                />
            </div>
            <Footer search={search} />
        </>
    );
}
