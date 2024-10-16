import { Currency, Locale, type Prisma } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const readMarkdownFile = (filename: string) =>
	readFileSync(join(__dirname, '../course-descriptions', filename), 'utf-8');

const generateLessons = (
	count: number,
	isPublished: boolean,
): Prisma.LessonCreateWithoutChapterInput[] => {
	const lessons: Prisma.LessonCreateWithoutChapterInput[] = [];

	for (let i = 1; i <= count; i++) {
		const duration = Math.floor(Math.random() * (600 - 120 + 1) + 120);
		const videoLesson = i % 2 !== 0;
		lessons.push({
			duration,
			isPublished,
			order: i,
			translations: {
				create: [
					{
						locale: Locale.en,
						title: videoLesson ? `Lesson ${i} - Video` : `Lesson ${i} - Puzzle`,
					},
					{
						locale: Locale.pl,
						title: videoLesson ? `Lekcja ${i} - Filmik` : `Lekcja ${i} - Zagadka`,
					},
				],
			},
			videoUrl: videoLesson ? 'https://files.vidstack.io/sprite-fight/720p.mp4' : null,
			chessPuzzle: !videoLesson ? `Puzzle for lesson ${i}` : null,
		});
	}

	return lessons;
};

export const initialCourses: Prisma.CourseCreateInput[] = [
	{
		slug: 'opening-fundamentals',
		isPublished: true,
		category: { connect: { slug: 'openings' } },
		translations: {
			create: [
				{
					locale: Locale.pl,
					title: 'Podstawy Debiutów',
					description: readMarkdownFile('opening-fundamentals-pl.md'),
					price: 2999,
					currency: Currency.PLN,
				},
				{
					locale: Locale.en,
					title: 'Opening Fundamentals',
					description: readMarkdownFile('opening-fundamentals-en.md'),
					price: 999,
					currency: Currency.USD,
				},
			],
		},
		chapters: {
			create: [
				{
					isPublished: true,
					isFree: true,
					order: 1,
					translations: {
						create: [
							{ locale: Locale.pl, title: 'Pierwszy rozdział' },
							{ locale: Locale.en, title: 'First Chapter' },
						],
					},
					lessons: {
						create: generateLessons(4, true),
					},
				},
				{
					isPublished: true,
					order: 2,
					translations: {
						create: [
							{ locale: Locale.pl, title: 'Drugi rozdział' },
							{ locale: Locale.en, title: 'Second Chapter' },
						],
					},
					lessons: {
						create: generateLessons(3, true),
					},
				},
			],
		},
	},
	{
		slug: 'middlegame-strategy',
		isPublished: true,
		category: { connect: { slug: 'strategy' } },
		translations: {
			create: [
				{
					locale: Locale.pl,
					title: 'Strategia Gry Środkowej',
					description: readMarkdownFile('middlegame-strategy-pl.md'),
					price: 4999,
					currency: Currency.PLN,
				},
				{
					locale: Locale.en,
					title: 'Middlegame Strategy',
					description: readMarkdownFile('middlegame-strategy-en.md'),
					price: 1999,
					currency: Currency.USD,
				},
			],
		},
		chapters: {
			create: [
				{
					isPublished: true,
					isFree: true,
					order: 1,
					translations: {
						create: [
							{ locale: Locale.pl, title: 'Pierwszy rozdział' },
							{ locale: Locale.en, title: 'First Chapter' },
						],
					},
					lessons: {
						create: generateLessons(5, true),
					},
				},
				{
					isPublished: true,
					order: 2,
					translations: {
						create: [
							{ locale: Locale.pl, title: 'Drugi rozdział' },
							{ locale: Locale.en, title: 'Second Chapter' },
						],
					},
					lessons: {
						create: generateLessons(6, true),
					},
				},
			],
		},
	},
	{
		slug: 'attack-tactics',
		isPublished: true,
		category: { connect: { slug: 'tactics' } },
		translations: {
			create: [
				{
					locale: Locale.pl,
					title: 'Atak i Taktyka',
					description: readMarkdownFile('attack-and-tactics-pl.md'),
					price: 3999,
					currency: Currency.PLN,
				},
				{
					locale: Locale.en,
					title: 'Attack and Tactics',
					description: readMarkdownFile('attack-and-tactics-en.md'),
					price: 1499,
					currency: Currency.USD,
				},
			],
		},
		chapters: {
			create: [
				{
					isPublished: true,
					isFree: true,
					order: 1,
					translations: {
						create: [
							{ locale: Locale.pl, title: 'Pierwszy rozdział' },
							{ locale: Locale.en, title: 'First Chapter' },
						],
					},
					lessons: {
						create: generateLessons(3, true),
					},
				},
				{
					isPublished: true,
					order: 2,
					translations: {
						create: [
							{ locale: Locale.pl, title: 'Drugi rozdział' },
							{ locale: Locale.en, title: 'Second Chapter' },
						],
					},
					lessons: {
						create: generateLessons(5, true),
					},
				},
			],
		},
	},
];

export const initialCategories: Prisma.CategoryCreateInput[] = [
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
