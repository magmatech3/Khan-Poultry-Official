const IMG = (name: string) => `/images/products/${name}`;

const RULES: { test: RegExp; image: string }[] = [
  // Seafood
  { test: /shrimp/i, image: IMG("shrimp.webp") },
  { test: /squid/i, image: IMG("squid.webp") },
  { test: /crab/i, image: IMG("crab.webp") },
  { test: /herring/i, image: IMG("herring.webp") },
  { test: /lambie/i, image: IMG("lambie.webp") },
  { test: /shark/i, image: IMG("shark-fillet.webp") },
  { test: /marlin/i, image: IMG("marlin.webp") },
  { test: /salmon/i, image: IMG("salmon.webp") },
  { test: /tuna/i, image: IMG("tuna.webp") },
  { test: /mahi/i, image: IMG("mahi-mahi.webp") },
  { test: /carite/i, image: IMG("carite.webp") },
  { test: /king.?fish/i, image: IMG("kingfish.webp") },
  { test: /^fish/i, image: IMG("kingfish.webp") },
  { test: /ocean delight|fresh shrimp/i, image: IMG("shrimp.webp") },

  // Poultry seasoned flavors (match before generic seasoned)
  { test: /jerk/i, image: IMG("jerk-chicken.webp") },
  { test: /mediterranean.*herb|herb/i, image: IMG("herb-chicken.webp") },
  { test: /spicy.*khan's|khan's.*herb|geera/i, image: IMG("spicy-chicken.webp") },

  // Specialty meats
  { test: /oxtail/i, image: IMG("oxtail.webp") },
  { test: /minced.?lamb|lamb.*mince/i, image: IMG("minced-lamb.webp") },
  { test: /minced (beef|lamb)/i, image: IMG("minced-beef.webp") },
  { test: /minced/i, image: IMG("minced-chicken.webp") },
  { test: /beef liver/i, image: IMG("beef-liver.webp") },
  { test: /soup bone/i, image: IMG("beef-bone.webp") },
  { test: /trimmings|cow heel|heel/i, image: IMG("beef.webp") },
  { test: /beef clod/i, image: IMG("beef.webp") },
  { test: /beef (stir.?fry|stew)/i, image: IMG("beef-stew.webp") },
  { test: /beef.*(roast|shortloin|striploin|ribeye|t-bone)|beef steak/i, image: IMG("beef-steak.webp") },
  { test: /beef/i, image: IMG("beef.webp") },
  { test: /goat/i, image: IMG("goat.webp") },
  { test: /lamb.*(chop|loin)/i, image: IMG("lamb-chops.webp") },
  { test: /lamb rack/i, image: IMG("lamb-rack.webp") },
  { test: /lamb leg/i, image: IMG("lamb-leg.webp") },
  { test: /lamb shoulder/i, image: IMG("lamb-shoulder.webp") },
  { test: /lamb stew/i, image: IMG("lamb-stew.webp") },
  { test: /lamb/i, image: IMG("lamb-chops.webp") },
  { test: /turkey/i, image: IMG("turkey.webp") },

  // Poultry parts (fresh)
  { test: /whole chicken/i, image: IMG("whole-chicken.webp") },
  { test: /breast.*(kebab|tender)|tenders/i, image: IMG("chicken-tenders.webp") },
  { test: /bone.?less.*breast|center breast|breast/i, image: IMG("chicken-breast.webp") },
  { test: /thigh/i, image: IMG("chicken-thighs.webp") },
  { test: /wing/i, image: IMG("chicken-wings.webp") },
  { test: /drumstick/i, image: IMG("chicken-drumsticks.webp") },
  { test: /whole legs|legs/i, image: IMG("chicken-legs.webp") },
  { test: /liver/i, image: IMG("chicken-liver.webp") },
  { test: /gizzard|feet|neck|cut.?up|mixed pack/i, image: IMG("chicken-offal.webp") },
  { test: /duck/i, image: IMG("duck.webp") },

  // Generic seasoned
  { test: /seasoned/i, image: IMG("seasoned-chicken.webp") },

  // Fallbacks
  { test: /chicken/i, image: IMG("chicken-breast.webp") },
  { test: /meat/i, image: IMG("beef-steak.webp") },
];

const FALLBACKS: Record<string, string> = {
  "poultry-fresh": IMG("chicken-breast.webp"),
  "poultry-seasoned": IMG("seasoned-chicken.webp"),
  "specialty-meats": IMG("beef-steak.webp"),
  seafood: IMG("seafood.webp"),
};

export function productImage(
  name: string,
  categorySlug: string | null,
  slug?: string | null
): string {
  if (slug) return IMG(`${slug}.webp`);
  const nameOnly = name.replace(/\(.*?\)/g, "").trim();
  for (const rule of RULES) {
    if (rule.test.test(nameOnly)) return rule.image;
  }
  if (categorySlug && FALLBACKS[categorySlug]) return FALLBACKS[categorySlug];
  return FALLBACKS["specialty-meats"];
}