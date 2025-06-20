import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { env } from '@/lib';
import { prisma } from '@/lib/prisma';
import type { ProductApi } from '@/types/productApi';

export async function GET() {
    const res = await fetch(
        `${env.API_BASE_URL}/index.php?route=api/product/all&token=${env.API_TOKEN}`
    );

    const raw = await res.json();
    console.log('API RAW RESPONSE:', JSON.stringify(raw));

    let data: ProductApi[] = [];
    if (Array.isArray(raw)) {
        data = raw;
    } else if (raw && typeof raw === 'object') {
        if ('data' in raw && Array.isArray((raw as any).data)) {
            data = (raw as any).data;
        } else if ('products' in raw && Array.isArray((raw as any).products)) {
            data = (raw as any).products;
        } else if ('result' in raw && Array.isArray((raw as any).result)) {
            data = (raw as any).result;
        } else {
            return NextResponse.json(
                { ok: false, error: 'API response is not an array. Raw: ' + JSON.stringify(raw) },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { ok: false, error: 'API response is not an array. Raw: ' + JSON.stringify(raw) },
            { status: 500 }
        );
    }

    for (const item of data) {
        const categoryIds: string[] = [];
        for (const cat of item.categories || []) {
            const category = await prisma.category.upsert({
                where: { category_id: cat.category_id },
                update: {
                    name: cat.name,
                    url: cat.url,
                    description: cat.name,
                },
                create: {
                    category_id: cat.category_id,
                    name: cat.name,
                    url: cat.url,
                    description: cat.name,
                },
            });
            categoryIds.push(category.id);
        }

        const product = await prisma.product.upsert({
            where: { product_id: item.product_id },
            update: {
                name: item.name,
                description: item.description,
                model: item.model,
                sku: item.sku,
                price: parseFloat(item.price),
                special: item.special ? parseFloat(item.special) : null,
                quantity: parseInt(item.quantity),
                stock_status: item.stock_status,
                manufacturer: item.manufacturer,
                image: item.image,
                images: JSON.stringify(item.images),
                options: JSON.stringify(item.options),
                date_added: new Date(item.date_added),
                date_modified: new Date(item.date_modified),
                status: item.status === '1',
                viewed: parseInt(item.viewed),
                rating: item.rating,
                reviews: item.reviews,
                url: item.url,
            },
            create: {
                product_id: item.product_id,
                name: item.name,
                description: item.description,
                model: item.model,
                sku: item.sku,
                price: parseFloat(item.price),
                special: item.special ? parseFloat(item.special) : null,
                quantity: parseInt(item.quantity),
                stock_status: item.stock_status,
                manufacturer: item.manufacturer,
                image: item.image,
                images: JSON.stringify(item.images),
                options: JSON.stringify(item.options),
                date_added: new Date(item.date_added),
                date_modified: new Date(item.date_modified),
                status: item.status === '1',
                viewed: parseInt(item.viewed),
                rating: item.rating,
                reviews: item.reviews,
                url: item.url,
            },
        });

        await prisma.productCategory.deleteMany({
            where: { productId: product.id },
        });

        for (const categoryId of categoryIds) {
            await prisma.productCategory.create({
                data: {
                    productId: product.id,
                    categoryId: categoryId,
                },
            });
        }
    }
    await prisma.$disconnect();

    return NextResponse.json({ ok: true });
}
