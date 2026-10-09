// src/data/products.js

export const products = [
  {
    id: 1,
    title: "Beginner's Crochet Kit – Honey Bee",
    category: "keychains",
    price: 1399,
    originalPrice: 2199,
    image: "/image/ProductImage/product-1.jpg",
    media: [
      { type: "image", src: "/image/ProductImage/product-1.jpg", alt: "Honey bee front" },
      { type: "image", src: "/image/ProductImage/product-1.jpg", alt: "Bee side view" },
      { type: "image", src: "/image/ProductImage/product-1.jpg", alt: "Bee in hand" },
      { type: "youtube", src: "https://www.youtube.com/shorts/6wB6lOJ0OTo", alt: "Assembly video" },
    ],
    descriptionTitle: "Meet our cute little Honey bee",
    description:
      "Our honey bee is really hardworking and she loves to dance. Let us bring this hardworking bee to life! with the help of our tried-and-true instructions and let us dance together.",
    faq: [
      {
        q: "Can I really learn how to crochet from these kits?",
        a: "Of course you can, as they say where there is a will there's a way :) and you can be next! Just follow the step-by-step video tutorials that come with each learn-to-crochet kit. Our beginner kits also come pre-started to get you over the first leap."
      }
    ],
    includedTitle: "What's included",
    included: [
      "Step-by-step video tutorials",
      "Yarn",
      "Pre-started for you, so you can get right into practicing the main crochet stitch",
      "Unlimited help over e-mail, plus virtual crochet office hours",
      "Plastic eyes",
      "Stuffing",
      "Tapestry needle",
      "Stitch marker",
      "Key ring",
      "Crochet hook",
      "Honey bee crochet pattern as a PDF download",
      "Skill level",
      "Beginner, recommended for ages 14+"
    ],
    materials: "Yarn, cotton thread, polyfill",
    specs: ["Skill: Beginner", "Time: ~2–3 hours", "Size: ~7–9 cm"],
    colorNote: "Colors may slightly vary due to lighting.",
    amazonLink: "https://www.amazon.in/",
    etsyLink: "https://etsy.com",
    meeshoLink: "https://meesho.com",
    relatedIds: [2, 3, 4],
    collections: ["collabs"],
  },
  
// code yaha khtm hua id1 ka 

  {
    id: 2,
    title: "Beginner's Crochet Kit – Sunny Bee & Frog",
    category: "home-decor",
    price: 399,
    originalPrice: 599,
    image: "/image/ProductImage/product-2.jpg",
    media: [
      { type: "image", src: "/image/ProductImage/product-2.jpg", alt: "Sunny Bee & Frog front" },
      { type: "image", src: "/image/ProductImage/product-2.jpg", alt: "Angle view" },
      { type: "image", src: "/image/ProductImage/product-2.jpg", alt: "In-hand" },
      { type: "image", src: "/image/ProductImage/product-2.jpg", alt: "Packaging" },
    ],
    descriptionTitle: "Meet our Sunny Bee & Frog",
    description:
      "Two adorable buddies to brighten your desk or keys. Let us bring them to life with the help of our step-by-step crochet kit.",
    faq: [
      {
        q: "Can I really learn how to crochet from these kits?",
        a: "Yes! Just follow the beginner-friendly step-by-step video tutorials that come with each kit."
      }
    ],
    includedTitle: "What's included",
    included: [
      "Step-by-step video tutorials",
      "Yarn",
      "Plastic eyes",
      "Stuffing",
      "Tapestry needle",
      "Stitch marker",
      "Key ring",
      "Crochet hook",
      "Sunny bee & frog crochet pattern PDF",
      "Skill level: Beginner"
    ],
    amazonLink: "https://www.amazon.in/",
    etsyLink: "https://etsy.com",
    meeshoLink: "https://meesho.com",
    relatedIds: [1, 3, 4],
    collections: ["collabs", "new-arrivals"],
  },



  {
    id: 3,
    title: "Beginner's Crochet Kit – Frog & Whale",
    category: "mini-decor",
    price: 1399,
    originalPrice: 2199,
    image: "/image/ProductImage/product-3.jpg",
    media: [
      { type: "image", src: "/image/ProductImage/product-3.jpg", alt: "Frog & Whale front" },
      { type: "image", src: "/image/ProductImage/product-3.jpg", alt: "Side view" },
      { type: "image", src: "/image/ProductImage/product-3.jpg", alt: "In-hand" },
    ],
    descriptionTitle: "Meet our Frog & Whale",
    description: "From pond to sea, this duo brings cheerful vibes. Use the same easy, guided approach to make both.",
    faq: [
      {
        q: "Is this beginner friendly?",
        a: "Yes, each kit includes videos and pre-started swatches to help you learn."
      }
    ],
    includedTitle: "What's included",
    included: [
      "Step-by-step video tutorials",
      "Yarn",
      "Plastic eyes",
      "Stuffing",
      "Tapestry needle",
      "Stitch marker",
      "Crochet hook",
      "Frog & Whale crochet pattern PDF",
      "Skill level: Beginner"
    ],
    amazonLink: "https://www.amazon.in/",
    etsyLink: "https://etsy.com",
    meeshoLink: "https://meesho.com",
    relatedIds: [1, 2, 4],
    collections: ["collabs"],
  },


  {
    id: 4,
    title: "Beginner's Crochet Kit – Mouse & Chick",
    category: "trending",
    price: 1399,
    originalPrice: 2199,
    image: "/image/ProductImage/product-4.jpg",
    media: [
      { type: "image", src: "/image/ProductImage/product-4.jpg", alt: "Mouse & Chick front" },
      { type: "image", src: "/image/ProductImage/product-4.jpg", alt: "Side view" },
      { type: "video", src: "/video/ProductVideo/product-4.mp4", alt: "Showcase video" },
    ],
    descriptionTitle: "Meet our Mouse & Chick",
    description: "Trending pair with easy stitches.",
    faq: [
      {
        q: "Can I learn with this kit?",
        a: "Of course! Our tutorials make it easy even for beginners."
      }
    ],
    includedTitle: "What's included",
    included: [
      "Step-by-step video tutorials",
      "Yarn",
      "Plastic eyes",
      "Stuffing",
      "Tapestry needle",
      "Stitch marker",
      "Crochet hook",
      "Mouse & Chick crochet pattern PDF",
      "Skill level: Beginner"
    ],
    amazonLink: "https://www.amazon.in/",
    etsyLink: "https://etsy.com",
    meeshoLink: "https://meesho.com",
    relatedIds: [1, 2, 3],
    collections: ["collabs"],
  },

  {
    id: 4,
    title: "Beginner's Crochet Kit – Mouse & Chick",
    category: "trending",
    price: 1399,
    originalPrice: 2199,
    image: "/image/ProductImage/product-4.jpg",
    media: [
      { type: "image", src: "/image/ProductImage/product-4.jpg", alt: "Mouse & Chick front" },
      { type: "image", src: "/image/ProductImage/product-4.jpg", alt: "Side view" },
      { type: "video", src: "/video/ProductVideo/product-4.mp4", alt: "Showcase video" },
    ],
    descriptionTitle: "Meet our Mouse & Chick",
    description: "Trending pair with easy stitches.",
    faq: [
      {
        q: "Can I learn with this kit?",
        a: "Of course! Our tutorials make it easy even for beginners."
      }
    ],
    includedTitle: "What's included",
    included: [
      "Step-by-step video tutorials",
      "Yarn",
      "Plastic eyes",
      "Stuffing",
      "Tapestry needle",
      "Stitch marker",
      "Crochet hook",
      "Mouse & Chick crochet pattern PDF",
      "Skill level: Beginner"
    ],
    amazonLink: "https://www.amazon.in/",
    etsyLink: "https://etsy.com",
    meeshoLink: "https://meesho.com",
    relatedIds: [1, 2, 3],
    collections: ["collabs"],
  },


  
];

export const allProducts = products;
export const collabProducts = products.filter(p => p.collections?.includes("collabs"));
export const newArrivalProducts = products.filter(p => p.collections?.includes("new-arrivals"));
export const categoriesInCollabs = Array.from(new Set(collabProducts.map(p => p.category)));
