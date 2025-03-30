import { createServerFn } from "@tanstack/react-start"
import { prismaClient } from './prisma';

export const fetchArticles = createServerFn({ method: 'GET'}).handler(
  async () => {
    console.info('Fetching articles...')
    try {
      const articles = await prismaClient.article.findMany({
        include: {
          category: true, 
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return articles.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        category: article.category?.name,
        createdAt: article.createdAt,
      }));
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Failed to fetch articles from the database');
    }
  }
)

export const createArticle = createServerFn({ method: 'POST' })
  .validator((data: {title: string, category: string, content: string}) => {

    const title = data.title
    const category = data.category
    const content = data.content

    if (!title || !category || !content) {
      throw new Error('Title, Category and Content are required')
    }

    return {
      title: title.toString(),
      category: category.toString(),
      content: content.toString(),
    }
  })
  .handler(async ({ data: { title, category, content } }) => {

    const categoryRecord = await prismaClient.category.findFirst({
      where: { name: category }
    })

    if (!categoryRecord) {
      await prismaClient.category.create({
        data: {
          name: category
        }
      })
    }

    const article = await prismaClient.article.create({
          data: {
            title: title,
            categoryId: categoryRecord?.id,
            content: content,
          },
        })
    
    return article
  })