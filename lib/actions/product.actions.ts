// Utilise 'use server' pour indiquer que ce module doit uniquement s'exécuter côté serveur.
'use server'

// Importe la fonction 'desc' pour spécifier un ordre décroissant dans les requêtes.
import { desc } from 'drizzle-orm'

// Importe une instance de base de données configurée depuis un chemin spécifique.
import db from '@/db/drizzle'

// Importe le schéma des produits de la base de données.
import { products } from '@/db/schema'

// Importe la fonction 'eq' pour utiliser des conditions d'égalité dans les requêtes SQL.
import { eq } from 'drizzle-orm/sql'

// Définit une fonction asynchrone pour récupérer les derniers produits ajoutés.
export async function getLatestProducts() {
  // Effectue une requête pour trouver plusieurs produits, en les triant par date de création en ordre décroissant.
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    limit: 4, // Limite le nombre de produits retournés à 4.
  })
  return data // Retourne les produits récupérés.
}

// Définit une fonction asynchrone pour récupérer un produit spécifique par son slug.
export async function getProductBySlug(slug: string) {
  // Effectue une requête pour trouver le premier produit correspondant au slug donné.
  return await db.query.products.findFirst({
    where: eq(products.slug, slug), // Utilise une condition d'égalité pour filtrer par slug.
  })
}
