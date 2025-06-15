const Product = require('../models/Product');

// Custom business logic to get Recommended Products
function mapHairTestToTags(hairTest) {
  const tags = [];
  
  // Map hair loss stage
  if (hairTest.hairLossStage.includes('stage-1') || 
      hairTest.hairLossStage.includes('stage-2')) {
    tags.push('early_stage');
  } else {
    tags.push('advanced_stage');
  }
  
  // Map family history
  if (hairTest.familyHistory !== 'none') {
    tags.push('genetic');
  }
  
  // Map dandruff
  if (hairTest.dandruff !== 'no') {
    tags.push('dandruff');
    
    if (hairTest.dandruff === 'heavy') {
      tags.push('oily_scalp');
    } else if (hairTest.dandruff === 'mild') {
      tags.push('dry_scalp');
    }
  }
  
  // Map internal health
  if (hairTest.stress === 'moderate' || hairTest.stress === 'high') {
    tags.push('stress');
  }
  
  if (hairTest.sleep !== 'peaceful') {
    tags.push('sleep_issues');
  }
  
  if (hairTest.haveAcidityOrGas) {
    tags.push('inflammation');
  }
  
  if (hairTest.energyLevels !== 'high') {
    tags.push('vitamin_deficiency', 'nutritional');
  }
  
  if (hairTest.takingSupplements) {
    tags.push('nutritional');
  }
  
  return [...new Set(tags)];
}

exports.getRecommendedProducts = async (hairTest) => {
  const tags = mapHairTestToTags(hairTest);
  
  const recommendedProducts = await Product.aggregate([
    {
      $match: {
        active: true,
        tags: { $in: tags } // Products matching at least one tag
      }
    },
    {
      $addFields: {
        matchScore: {
          $size: { $setIntersection: ["$tags", tags] } // Count of matching tags
        },
        priority: {
          $switch: { // Custom priority by category
            branches: [
              { case: { $eq: ["$category", "medicine"] }, then: 3 },
              { case: { $eq: ["$category", "oil"] }, then: 2 },
              { case: { $eq: ["$category", "shampoo"] }, then: 1 }
            ],
            default: 0
          }
        }
      }
    },
    {
      $sort: {
        matchScore: -1,
        priority: -1,
        price: 1
      }
    },
    {
      $limit: 3
    },
    {
      $project: {
        _id: 1,
        // name: 1,
        // category: 1,
        // price: 1,
        // benefits: 1
      }
    }
  ]);

  return recommendedProducts.map(product => product._id);
}

exports.determineCauses = (hairTest) => {
  // Intentionally skipped Complex business logic
  return ['genetic_predisposition', 'stress_related'];
}

exports.calculateRecoveryTime = (hairTest) => {
  // Intentionally skipped Complex business logic
  return hairTest.hairLossStage === 'stage-1' ? 4 : 6;
}