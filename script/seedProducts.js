const Product = require('../models/Product');

const sampleProducts = [
  // Oils
  {
    name: "Anti-Dandruff Hair Oil",
    category: "oil",
    price: 499,
    tags: ["dandruff", "dry_scalp", "scalp_health"],
    benefits: "Reduces dandruff and soothes dry scalp"
  },
  {
    name: "Genetic Hair Fall Control Oil",
    category: "oil",
    price: 599,
    tags: ["genetic", "hormonal", "advanced_stage"],
    benefits: "Targets genetic hair loss with DHT blockers"
  },
  {
    name: "Stress Relief Hair Oil",
    category: "oil",
    price: 549,
    tags: ["stress", "sleep_issues", "inflammation"],
    benefits: "Calms scalp inflammation caused by stress"
  },
  {
    name: "Nutrition Boost Hair Oil",
    category: "oil",
    price: 449,
    tags: ["nutritional", "vitamin_deficiency"],
    benefits: "Rich in vitamins for hair nourishment"
  },
  {
    name: "Early Stage Hair Growth Oil",
    category: "oil",
    price: 399,
    tags: ["early_stage", "scalp_health"],
    benefits: "Stimulates hair follicles in early hair loss"
  },
  
  // Shampoos
  {
    name: "Dandruff Control Shampoo",
    category: "shampoo",
    price: 299,
    tags: ["dandruff", "oily_scalp", "scalp_health"],
    benefits: "Controls excessive oil and dandruff"
  },
  {
    name: "Gentle Cleansing Shampoo",
    category: "shampoo",
    price: 279,
    tags: ["early_stage", "dry_scalp"],
    benefits: "Mild formula for sensitive scalps"
  },
  {
    name: "Advanced Hair Fall Shampoo",
    category: "shampoo",
    price: 349,
    tags: ["advanced_stage", "genetic"],
    benefits: "Fortified with keratin for weak hair"
  },
  {
    name: "Stress Defense Shampoo",
    category: "shampoo",
    price: 329,
    tags: ["stress", "inflammation"],
    benefits: "Contains cooling agents for stressed scalp"
  },
  {
    name: "Nutrition Boost Shampoo",
    category: "shampoo",
    price: 379,
    tags: ["nutritional", "vitamin_deficiency"],
    benefits: "With biotin and vitamin E complex"
  },
  
  // Medicines
  {
    name: "Hair Vitamin Capsules",
    category: "medicine",
    price: 799,
    tags: ["nutritional", "vitamin_deficiency"],
    benefits: "Complete hair vitamins with biotin, zinc"
  },
  {
    name: "DHT Blocker Tablets",
    category: "medicine",
    price: 899,
    tags: ["genetic", "hormonal", "advanced_stage"],
    benefits: "Reduces DHT production for genetic hair loss"
  },
  {
    name: "Stress Management Supplement",
    category: "medicine",
    price: 699,
    tags: ["stress", "sleep_issues"],
    benefits: "Ashwagandha and L-theanine for stress relief"
  },
  {
    name: "Scalp Health Capsules",
    category: "medicine",
    price: 749,
    tags: ["scalp_health", "inflammation", "dandruff"],
    benefits: "Reduces scalp inflammation and flaking"
  },
  {
    name: "Early Intervention Hair Tonic",
    category: "medicine",
    price: 649,
    tags: ["early_stage", "nutritional"],
    benefits: "Prevents progression of early hair thinning"
  }
];

async function seedProducts() {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('✅ Products seeded successfully');
}

module.exports = seedProducts;