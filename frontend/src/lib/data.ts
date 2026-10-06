export type Location = {
  name: string;
  area: string;
  image: string;
  phone: string;
  phoneHref: string;
  mapQuery: string;
  hours: [string, string][];
};

export const LOCATIONS: Location[] = [
  {
    name: "Market Street",
    area: "Marabella",
    image: "/images/locations/Marabella.webp",
    phone: "344-CHIK (2445)",
    phoneHref: "tel:+18683442445",
    mapQuery: "Market Street Marabella Trinidad",
    hours: [
      ["Mon – Fri", "8:00 AM – 5:00 PM"],
      ["Saturday", "8:00 AM – 5:00 PM"],
      ["Sunday", "6:00 AM – 1:00 PM"],
    ],
  },
  {
    name: "Gulf View",
    area: "La Romain",
    image: "/images/locations/Gulf%20view.webp",
    phone: "321-CHIK (2445)",
    phoneHref: "tel:+18683212445",
    mapQuery: "Gulf View La Romain Trinidad",
    hours: [
      ["Mon – Wed", "8:00 AM – 5:00 PM"],
      ["Thu – Sat", "8:00 AM – 6:00 PM"],
      ["Sunday", "8:00 AM – 2:00 PM"],
    ],
  },
  {
    name: "Munroe Road",
    area: "Cunupia",
    image: "/images/locations/Munroe%20Road.webp",
    phone: "321-CHIK (2445)",
    phoneHref: "tel:+18683212445",
    mapQuery: "Munroe Road Cunupia Trinidad",
    hours: [
      ["Mon – Fri", "8:00 AM – 6:00 PM"],
      ["Saturday", "7:00 AM – 6:00 PM"],
      ["Sunday", "7:00 AM – 1:00 PM"],
    ],
  },
  {
    name: "Main Road",
    area: "Marabella",
    image: "/images/locations/Main%20Road.jpeg",
    phone: "658-CHIK (2445)",
    phoneHref: "tel:+18686582445",
    mapQuery: "Main Road Marabella Trinidad",
    hours: [
      ["Mon – Sat", "7:00 AM – 6:00 PM"],
      ["Sunday", "7:00 AM – 2:00 PM"],
    ],
  },
  {
    name: "Gasparillo Junction",
    area: "Gasparillo",
    image: "/images/locations/Gasparillo%20Junction.webp",
    phone: "394-CHIK (2445)",
    phoneHref: "tel:+18683942445",
    mapQuery: "Gasparillo Junction Trinidad",
    hours: [
      ["Mon – Fri", "8:00 AM – 6:00 PM"],
      ["Saturday", "7:00 AM – 6:00 PM"],
      ["Sunday", "8:00 AM – 2:00 PM"],
    ],
  },
  {
    name: "Rodney Road",
    area: "San Juan",
    image: "/images/locations/Rodney%20Road.webp",
    phone: "321-CHIK (2445)",
    phoneHref: "tel:+18683212445",
    mapQuery: "Rodney Road San Juan Trinidad",
    hours: [
      ["Mon – Sat", "8:00 AM – 6:00 PM"],
      ["Sunday", "8:00 AM – 2:00 PM"],
    ],
  },
  {
    name: "Diego Martin",
    area: "Diego Martin",
    image: "/images/locations/Diego%20Martin.webp",
    phone: "321-CHIK (2445)",
    phoneHref: "tel:+18683212445",
    mapQuery: "Diego Martin Trinidad",
    hours: [
      ["Mon – Sat", "8:00 AM – 6:00 PM"],
      ["Sunday", "7:00 AM – 2:00 PM"],
    ],
  },
];

export type Cut = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  price: string;
  orderNote: string;
};

export const FAVORITE_CUTS: Cut[] = [
  {
    name: "Whole Chicken",
    tagline: "The daily hero",
    description:
      "Fresh-chilled, halal whole chicken — perfect for roasts, pot dishes, or a simple Saturday fry. Picked fresh every morning, delivered to every store.",
    image: "/images/products/whole-chicken.webp",
    alt: "Fresh whole chicken from Khan's Poultry",
    price: "Market price",
    orderNote: "I'd like to order a whole chicken",
  },
  {
    name: "Seasoned Favorites",
    tagline: "Jerk, herb & ready to cook",
    description:
      "Marinated in-house — authentic jerk, Mediterranean herb, and our spicy 'Khan's blend'. Straight to the grill, no thinking required.",
    image: "/images/products/seasoned-chicken.webp",
    alt: "Seasoned chicken skewers ready to grill",
    price: "From $19/lb",
    orderNote: "I'd like to order seasoned chicken",
  },
  {
    name: "Fresh Seafood",
    tagline: "From water to counter",
    description:
      "Salmon, shrimp, mahi-mahi and more — chilled on ice and never frozen twice. Rich, flaky, and ready for the pan the same day.",
    image: "/images/products/salmon.webp",
    alt: "Fresh salmon fillet on ice",
    price: "From $25/lb",
    orderNote: "I'd like to order fresh seafood",
  },
];

export const STATS = [
  { value: "35+", label: "Years in business" },
  { value: "8", label: "Stores islandwide" },
  { value: "100+", label: "Products in store" },
  { value: "100%", label: "Halal certified" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Been shopping at Khan's for over 15 years. The quality is consistent and the staff treats you like family. Best chicken in Trinidad.",
    name: "Maria R.",
    detail: "Marabella",
  },
  {
    quote:
      "The seasoned chicken is amazing — just throw it on the grill and dinner is ready. My family's go-to for weekend BBQs.",
    name: "David P.",
    detail: "Diego Martin",
  },
  {
    quote:
      "As a restaurant owner I need reliable suppliers. Khan's wholesale prices and consistent quality made them our exclusive meat provider.",
    name: "Sean K.",
    detail: "Restaurant owner, San Fernando",
  },
  {
    quote:
      "Fresh counter, fair prices, and the jerk wings sell out by 9am for a reason. I plan my Sunday shop around their opening.",
    name: "Aisha R.",
    detail: "San Juan",
  },
];

export const INSTAGRAM_URL = "https://www.instagram.com/khans_poultry/";
export const FACEBOOK_URL = "https://www.facebook.com/khanspoultryandmeats/";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Khan%27s+Poultry+And+Meats+Limited+Southern+Main+Road+Marabella+Trinidad+and+Tobago";
export const GIFT_CARD_URL =
  "https://Blinkskytrinidad.com/khanspoultry-giftcard";
export const PHONE_LINK = "tel:+18683442445";
export const WHATSAPP_LINK = "https://wa.me/18683442445";