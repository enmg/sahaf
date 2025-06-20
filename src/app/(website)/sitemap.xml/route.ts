import { prisma } from '@/lib/prisma';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const products = await prisma.product.findMany({
        select: {
            product_id: true,
            name: true,
            date_modified: true,
        },
    });

    function toProductSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/ç/g, 'c')
            .replace(/ğ/g, 'g')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ş/g, 's')
            .replace(/ü/g, 'u')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    const urls = products.map((product) => {
        const slug = `${product.product_id}-${toProductSlug(product.name)}`;
        return `    <url>\n      <loc>${baseUrl}/${slug}</loc>\n      <lastmod>${new Date(product.date_modified).toISOString()}</lastmod>\n    </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
