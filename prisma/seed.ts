import { PrismaClient } from '@prisma/client';
import { categories } from '../lib/const/categories';

const prisma = new PrismaClient();

async function main() {
  // Lee el archivo categories.json
  const categoriesData = categories;
  // Inserta las categorías en la base de datos
  for (const category of categoriesData) {
    await prisma.category.create({
      data: {
        id: category.id.toString(),
        name: category.name,
        description: category.description,
        focusAreas: category.focusAreas,
        recommendedFor: category.recommendedFor,
      },
    });
    console.log(`Categoría ${category.name} agregada`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
