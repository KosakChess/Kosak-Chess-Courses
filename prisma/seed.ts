import { Currency, Locale, type Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialCategories: Prisma.CategoryCreateInput[] = [
	{
		slug: 'openings',
		translations: {
			create: [
				{ locale: Locale.pl, name: 'Debiuty' },
				{ locale: Locale.en, name: 'Openings' },
			],
		},
	},
	{
		slug: 'strategy',
		translations: {
			create: [
				{ locale: Locale.pl, name: 'Strategia' },
				{ locale: Locale.en, name: 'Strategy' },
			],
		},
	},
	{
		slug: 'tactics',
		translations: {
			create: [
				{ locale: Locale.pl, name: 'Taktyka' },
				{ locale: Locale.en, name: 'Tactics' },
			],
		},
	},
];

const initialCourses: Prisma.CourseCreateInput[] = [
	{
		slug: 'opening-fundamentals',
		isPublished: true,
		category: {
			connect: { slug: 'openings' },
		},
		translations: {
			create: [
				{
					locale: Locale.pl,
					title: 'Podstawy Debiutów',
					description: 'Naucz się podstawowych debiutów w szachach.',
					price: 2999,
					currency: Currency.PLN,
				},
				{
					locale: Locale.en,
					title: 'Opening Fundamentals',
					description: 'Learn the basics of chess openings.',
					price: 999,
					currency: Currency.USD,
				},
			],
		},
	},
	{
		slug: 'middlegame-strategy',
		isPublished: true,
		category: {
			connect: { slug: 'strategy' },
		},
		translations: {
			create: [
				{
					locale: Locale.pl,
					title: 'Strategia Średniej Gry',
					description: 'Zdobądź wiedzę na temat strategii średniej gry w szachach.',
					price: 4999,
					currency: Currency.PLN,
				},
				{
					locale: Locale.en,
					title: 'Middlegame Strategy',
					description: 'Gain insights into chess middlegame strategies.',
					price: 1999,
					currency: Currency.USD,
				},
			],
		},
	},
	{
		slug: 'attack-tactics',
		isPublished: true,
		category: {
			connect: { slug: 'tactics' },
		},
		translations: {
			create: [
				{
					locale: Locale.pl,
					title: 'Atak i Taktyka',
					description: 'Odkryj najważniejsze zasady ataku i taktyki.',
					price: 3999,
					currency: Currency.PLN,
				},
				{
					locale: Locale.en,
					title: 'Attack and Tactics',
					description: 'Discover essential principles of attack and tactics.',
					price: 1499,
					currency: Currency.USD,
				},
			],
		},
	},
];

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
