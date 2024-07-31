import { users } from '@/db/schema'
import email from 'next-auth/providers/email'

const sampleData = {
  users: [
    {
      name: 'Raouf',
      email: 'rww.warnier@gmail.com',
      password: hashSync('1234567', 10),
      role: 'admin',
    },
    {
      name: 'Raouf2',
      email: 'rw.warnierr@gmail.com',
      password: hashSync('abcdefg', 10),
      role: 'admin',
    },
  ],

  products: [
    {
      name: 'BRACELET PIERRES MIXTES',
      slug: 'bracelet-pierres-mixtes',
      category: 'Bracelet',
      images: ['/assets/images/p1-1.jpg', '/assets/images/p1-2.jpg'],
      price: '20.00',
      brand: 'Wakil',
      rating: '4.5',
      numReviews: 10,
      stock: 5,
      description: 'Bracelet fait à partir de plusieurs type de roche.',
      isFeatured: true,
      banner: '/assets/images/banner-1.jpeg',
    },
    {
      name: 'BRACELET PIERRE DE LUNE',
      slug: 'bracelet-pierre-de-lune',
      category: 'Bracelet',
      images: ['/assets/images/p2-1.jpg', '/assets/images/p2-2.jpeg'],
      price: '25.00',
      brand: 'JB',
      rating: '4.2',
      numReviews: 8,
      stock: 10,
      description: 'Bracelet fait à partir de pierres roses',
      isFeatured: true,
      banner: '/assets/images/banner-2.jpeg',
    },
    {
      name: 'BRACELET PIERRE ROCHEUSE',
      slug: 'bracelet-pierre-rocheuse',
      category: 'Wakil',
      images: ['/assets/images/p3-1.jpg', '/assets/images/p3-2.jpg'],

      price: '20.00',
      brand: 'Nike',
      rating: '4.9',
      numReviews: 3,
      stock: 0,
      description:
        'Bracelet fait à partir de pierres rocheuses ressemblant à des pierres météorites',
    },
    {
      name: 'BRACELET PIERRES VIOLETTES',
      slug: 'bracelet-pierres-violettes',
      category: 'Wakil',
      images: ['/assets/images/p4-1.jpg', '/assets/images/p4-2.jpg'],
      price: '25.00',
      brand: 'Lacoste',
      rating: '3.6',
      numReviews: 5,
      stock: 10,
      description: 'Bracelet fait à partir de pierres violettes',
    },
  ],
}

export default sampleData
function hashSync(arg0: string, arg1: number) {
  throw new Error('Function not implemented.')
}
