import { PrismaClient, AdminRole, Material, ProductStatus, CollectionStatus, Metal } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Admin User
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@jewellery.demo' },
    update: {},
    create: {
      email: 'admin@jewellery.demo',
      name: 'Admin User',
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
    },
  });
  console.log('Admin user created/exists');

  // 2. Showroom Settings
  await prisma.showroomSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      businessName: '[DEMO] Premium Jewellery Showroom',
      phone: '9876543210',
      whatsapp: '9876543210',
      email: 'hello@jewellery.demo',
      address: '123 Demo Street',
      city: 'Demo City',
      state: 'Demo State',
      pincode: '123456',
    },
  });

  // 3. Business Settings
  await prisma.businessSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      announcementBar: 'BIS 916 Hallmark Certified Gold | Wedding Season Offers | Book Private Viewing',
      heroHeading: 'Timeless Jewellery.',
      heroSubheading: 'Trusted Tradition.',
      heroDescription: 'Discover exquisite Gold, Silver and Diamond jewellery crafted for weddings, celebrations and generations.',
      heroCTAPrimary: 'Explore Jewellery',
      heroCTASecondary: 'Book an Appointment',
    },
  });

  // 4. Metal Rates
  const ratesData = [
    { metal: Metal.GOLD, purity: '22K', rate: 7500 },
    { metal: Metal.GOLD, purity: '24K', rate: 8200 },
    { metal: Metal.GOLD, purity: '18K', rate: 5800 },
    { metal: Metal.SILVER, purity: '999', rate: 98 },
  ];
  for (const r of ratesData) {
    await prisma.metalRate.upsert({
      where: { metal_purity: { metal: r.metal, purity: r.purity } },
      update: { rate: r.rate },
      create: {
        metal: r.metal,
        purity: r.purity,
        rate: r.rate,
        updatedById: admin.id,
      }
    });
  }

  // 5. Categories
  const parentCats = [
    { name: 'Gold Jewellery', slug: 'gold', material: Material.GOLD },
    { name: 'Silver Jewellery', slug: 'silver', material: Material.SILVER },
    { name: 'Diamond Jewellery', slug: 'diamond', material: Material.DIAMOND },
    { name: 'Bridal Collection', slug: 'bridal', material: undefined },
  ];
  
  for (const cat of parentCats) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        material: cat.material as Material,
      }
    });
  }

  const goldCat = await prisma.category.findUnique({ where: { slug: 'gold' } });
  
  const subCats = [
    { name: 'Chains', slug: 'gold-chains', parentId: goldCat?.id, material: Material.GOLD },
    { name: 'Rings', slug: 'gold-rings', parentId: goldCat?.id, material: Material.GOLD },
    { name: 'Bangles', slug: 'gold-bangles', parentId: goldCat?.id, material: Material.GOLD },
  ];

  for (const cat of subCats) {
    if(cat.parentId) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: {
          name: cat.name,
          slug: cat.slug,
          parentId: cat.parentId,
          material: cat.material,
        }
      });
    }
  }

  const ringCat = await prisma.category.findUnique({ where: { slug: 'gold-rings' } });

  // 6. Products
  if (ringCat) {
    await prisma.product.upsert({
      where: { productCode: 'DEMO-R1' },
      update: {},
      create: {
        productCode: 'DEMO-R1',
        name: '[DEMO] Classic Gold Ring',
        slug: 'demo-classic-gold-ring',
        description: '[DEMO] A beautiful classic ring.',
        material: Material.GOLD,
        purity: '22K',
        weightGrams: 5.5,
        categoryId: ringCat.id,
        featured: true,
      }
    });
  }

  // 7. Collections
  await prisma.collection.upsert({
    where: { slug: 'bridal-collection' },
    update: {},
    create: {
      name: 'Bridal Collection',
      slug: 'bridal-collection',
      status: CollectionStatus.PUBLISHED,
      featured: true,
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
