export const generateTripPlan = async (prompt) => {

  if (prompt.includes("Goa")) {

    return `

🌴 Goa Trip Plan

Day 1:
- Baga Beach
- Sunset at Chapora Fort
- Seafood dinner

Day 2:
- Water sports
- Anjuna Market
- Beach party

Travel Tips:
- Carry sunglasses
- Rent a scooter
- Stay hydrated

`;

  }

  if (prompt.includes("Hyderabad")) {

    return `

🏰 Hyderabad Trip Plan

Day 1:
- Charminar
- Mecca Masjid
- Famous biryani dinner

Day 2:
- Golconda Fort
- Tank Bund
- Street food tour

Travel Tips:
- Visit early morning
- Try Irani chai
- Carry water bottle

`;

  }

  return `

✈️ Custom AI Trip Plan

Day 1:
- Explore local attractions
- Try famous food spots
- Relax and enjoy

Day 2:
- Adventure activities
- Shopping
- Local sightseeing

Travel Tips:
- Plan early
- Stay safe
- Enjoy the journey

`;
};