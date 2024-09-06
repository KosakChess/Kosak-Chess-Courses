import { PrismaClient } from '@prisma/client';

import { initialCategories, initialCourses } from './data';

const prisma = new PrismaClient();

async function main() {
	for (const category of initialCategories) {
		await prisma.category.upsert({
			where: { slug: category.slug },
			update: {},
			create: category,
		});
	}

	for (const course of initialCourses) {
		await prisma.course.upsert({
			where: { slug: course.slug },
			update: {},
			create: course,
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
