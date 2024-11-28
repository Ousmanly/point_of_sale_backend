// import { PrismaClient, Role } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Création de l'utilisateur admin
//   const adminUser = await prisma.user.create({
//     data: {
//       name: 'Admin User',
//       email: 'admin@example.com',
//       password: 'password123', // En pratique, tu devrais hacher le mot de passe
//       role: Role.ADMIN,
//     },
//   });

//   // Création de l'utilisateur caissier
//   const caissierUser = await prisma.user.create({
//     data: {
//       name: 'Caissier User',
//       email: 'caissier@example.com',
//       password: 'password123', // En pratique, tu devrais hacher le mot de passe
//       role: Role.CAISSIER,
//     },
//   });

//   // Création d'un fournisseur
//   const supplier = await prisma.supplier.create({
//     data: {
//       name: 'Fournisseur A',
//       phone: '0123456789',
//       user: {
//         connect: { id: adminUser.id }, // Associe ce fournisseur à l'utilisateur admin
//       },
//     },
//   });

//   // Création d'un produit
//   const product = await prisma.product.create({
//     data: {
//       name: 'Produit X',
//       stock: 100,
//       sale_price: 15.50,
//       purchase_price: 10.00,
//       seuil: 10,
//       created_at: new Date(),
//       updated_at: new Date(),
//       status: true,
//       user: {
//         connect: { id: adminUser.id }, // Associe ce produit à l'utilisateur admin
//       },
//     },
//   });

//   // Création d'une vente
//   const sale = await prisma.sale.create({
//     data: {
//       name: 'Vente de produit',
//       email: 'customer@example.com',
//       phone: '0987654321',
//       user: {
//         connect: { id: caissierUser.id }, // Associe cette vente à l'utilisateur caissier
//       },
//     },
//   });

//   // Détails de la vente (ajoute le produit à la vente)
//   await prisma.saleDetail.create({
//     data: {
//       amount: 1550, // 15.50 * 100 (prix unitaire * quantité)
//       sale_quantity: 100,
//       id_sale: sale.id,
//       id_product: product.id,
//       price: 15.50,
//     },
//   });

//   // Création de réception de stock
//   const reception = await prisma.reception.create({
//     data: {
//       recepted_at:'2024-11-27T00:34:49.622Z',
//       supplier: {
//         connect: { id: supplier.id }, // Associe cette réception au fournisseur
//       },
//       user: {
//         connect: { id: adminUser.id }, // Associe cette réception à l'utilisateur admin
//       },
//     },
//   });

//   // Détails de réception
//   await prisma.receptionDetail.create({
//     data: {
//       quantity: 50,
//       id_reception: reception.id,
//       id_product: product.id,
//       price: 10.00,
//     },
//   });

//   console.log('Seed effectué avec succès');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Supprimer les données existantes pour éviter les doublons
  await prisma.saleDetail.deleteMany();
  await prisma.receptionDetail.deleteMany();
  await prisma.reception.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.user.deleteMany();

  // Création de l'utilisateur admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Ousmane Ly',
      email: 'lyousmane492@gmail.com',
      password: 'ousmane', // En pratique, tu devrais hacher le mot de passe
      role: Role.ADMIN,
    },
  });

  // Création de l'utilisateur caissier
  const caissierUser = await prisma.user.create({
    data: {
      name: 'Caissier User',
      email: 'caissier@example.com',
      password: 'password123', // En pratique, tu devrais hacher le mot de passe
      role: Role.CAISSIER,
    },
  });

  // Création d'un fournisseur
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Fournisseur A',
      phone: '0123456789',
      user: {
        connect: { id: adminUser.id },
      },
    },
  });

  // Création d'un produit
  const product = await prisma.product.create({
    data: {
      name: 'Produit X',
      stock: 100,
      sale_price: 15.50,
      purchase_price: 10.00,
      seuil: 10,
      created_at: new Date(),
      updated_at: new Date(),
      status: true,
      user: {
        connect: { id: adminUser.id },
      },
    },
  });

  // Création d'une vente
  const sale = await prisma.sale.create({
    data: {
      name: 'Vente de produit',
      email: 'customer@example.com',
      phone: '0987654321',
      user: {
        connect: { id: caissierUser.id },
      },
    },
  });

  // Détails de la vente (ajoute le produit à la vente)
  await prisma.saleDetail.create({
    data: {
      amount: 1550, // 15.50 * 100 (prix unitaire * quantité)
      sale_quantity: 100,
      id_sale: sale.id,
      id_product: product.id,
      price: 15.50,
    },
  });

  // Création de réception de stock
  const reception = await prisma.reception.create({
    data: {
      recepted_at: '2024-11-27T00:34:49.622Z',
      supplier: {
        connect: { id: supplier.id },
      },
      user: {
        connect: { id: adminUser.id },
      },
    },
  });

  // Détails de réception
  await prisma.receptionDetail.create({
    data: {
      quantity: 50,
      id_reception: reception.id,
      id_product: product.id,
      price: 10.00,
    },
  });

  console.log('Seed effectué avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
