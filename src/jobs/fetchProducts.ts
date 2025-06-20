import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import type { ProductApi } from '@/types/productApi';
import { env } from '@/lib';

const prisma = new PrismaClient();

async function main() {
	const res = await fetch(
		`${env.API_BASE_URL}/index.php?route=api/product/all&token=${env.API_TOKEN}`
	);
	const data = (await res.json()) as ProductApi[];

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
}

main();
