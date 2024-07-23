// Utilise 'use client' pour signaler que ce module doit uniquement s'exécuter côté client.
'use client'

// Importe le composant Image de la bibliothèque Next.js pour l'affichage d'images.
import Image from 'next/image'

// Importe React pour l'utilisation de ses fonctionnalités dans le composant.
import * as React from 'react'

// Importe une fonction utilitaire 'cn' pour manipuler les classes CSS de manière conditionnelle.
import { cn } from '@/lib/utils'

// Déclare le composant fonctionnel ProductImages, avec des props typés pour TypeScript.
export default function ProductImages({ images }: { images: string[] }) {
  // Utilise le hook d'état de React pour gérer l'indice de l'image actuellement affichée.
  const [current, setCurrent] = React.useState(0)

  // Retourne le JSX qui rend le composant, incluant l'affichage de l'image principale et les miniatures.
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            /* Applique des styles conditionnels et gère les clics pour changer l'image principale. */
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === index && 'border-orange-500'
            )}
            onClick={() => setCurrent(index)}
          >
            <Image src={image} alt={'image'} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  )
}
