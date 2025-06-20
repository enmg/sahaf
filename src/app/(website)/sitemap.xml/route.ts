import { prisma } from '@/lib/prisma';
import { toProductSlug } from '@/lib/utils/index';
import { getBaseUrl } from '@/lib/utils/urls';

export async function GET() {
    const products = await prisma.product.findMany({
        select: {
            product_id: true,
            name: true,
            date_modified: true,
        },
    });

    const urls = products.map((product) => {
        const slug = `${product.product_id}-${toProductSlug(product.name)}`;
        return `    <url>\n      <loc>${getBaseUrl}/${slug}</loc>\n      <lastmod>${new Date(product.date_modified).toISOString()}</lastmod>\n    </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
