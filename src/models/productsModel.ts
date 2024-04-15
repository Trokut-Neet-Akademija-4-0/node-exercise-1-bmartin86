import IProduct from './interfaces/productInterface'

const products: IProduct[] = [
  {
    id: 1,
    gender: 'woman',
    category: ['New Arrival', 'Jacket', 'Coat'],
    name: 'Woman Trench Coat',
    description:
      'A classic and sophisticated piece, this light brown trenchcoat for women exudes timeless elegance. Crafted from high-quality materials, its tailored silhouette complements any outfit effortlessly. With its versatile hue and refined details such as buttoned epaulettes and a waist belt, this trenchcoat is the perfect combination of style and functionality for any occasion.',
    price: 99.99,
    discountPercentage: 12,
    images: [
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201639/women-trenchcoat_ssptmi.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204128/women-trenchcoat2_iygwmj.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204129/women-trenchcoat-3_oyb3ho.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204130/women-trenchcoat-4_bpcssa.webp',
    ],
    thumbnail:
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201639/women-trenchcoat_ssptmi.webp',
  },
  {
    id: 2,
    gender: 'woman',
    category: ['Pants'],
    name: 'Wide Leg Pants',
    description:
      "Step into chic comfort with these women's wide-leg pants. Crafted for both style and ease, their flowing silhouette offers a modern twist on classic elegance. Versatile and effortlessly fashionable, these pants are a wardrobe essential for any occasion, offering both sophistication and comfort in every step.",
    price: 59.99,
    discountPercentage: 20,
    images: [
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201635/wide-leg-pants_fvoalf.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201636/wide-leg-pants-3_rhrylq.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201637/wide-leg-pants-4_nm27xx.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201636/wide-leg-pants-2_ptk5gq.webp',
    ],
    thumbnail:
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201635/wide-leg-pants_fvoalf.webp',
  },
  {
    id: 3,
    gender: 'man',
    category: ['New Arrival', 'Jacket'],
    name: 'Men Slim Fit Jacket',
    description:
      "Elevate your look with this sleek men's black jacket. Timelessly stylish and versatile, its minimalist design makes it a wardrobe staple for any occasion. Crafted with attention to detail and premium materials, this jacket effortlessly combines sophistication with everyday comfort, ensuring you stand out with understated elegance wherever you go.",
    price: 69.99,
    discountPercentage: 0,
    images: [
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201635/men-jacket4_zqo6m8.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204086/men-jacket-1_h5e4vj.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204087/men-jacket-2_oxhool.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204088/men-jacket-3_ynz3qb.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204089/men-jacket-5_umvayb.webp',
    ],
    thumbnail:
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711201635/men-jacket4_zqo6m8.webp',
  },
  {
    id: 4,
    gender: 'woman',
    category: ['New Arrival', 'Dress'],
    name: 'Woman Zebra Dress',
    description:
      "Elevate your look with this sleek woman's Zebra Dress. Timelessly stylish and versatile, its minimalist design makes it a wardrobe staple for any occasion. Crafted with attention to detail and premium materials, this jacket effortlessly combines sophistication with everyday comfort, ensuring you stand out with understated elegance wherever you go.",
    price: 69.99,
    discountPercentage: 0,
    images: [
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204126/women-shirt-dress-3_xdnsvz.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204125/women-shirt-dress-2_exphk4.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204124/women-shirt-dress_fecgu4.jpg',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204126/women-shirt-dress-4_n6xv0h.webp',
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204127/women-shirt-dress-5_irl5zd.webp',
    ],
    thumbnail:
      'https://res.cloudinary.com/dx6qjxz55/image/upload/v1711204126/women-shirt-dress-3_xdnsvz.webp',
  },
]
export default products
