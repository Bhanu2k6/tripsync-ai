import axios from "axios";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
export const generateAITrip = async (tripData) => {
try {
const prompt = `
Create a detailed ${tripData.days}-day travel itinerary for ${tripData.destination}
for ${tripData.travelers} travelers with a ${tripData.budget} budget and a ${tripData.mood} vibe.

Also include:

- Best time to visit
- Currency used
- Main language spoken
- Packing checklist
- Recommended hotels
- Restaurants/cafes
- Local travel tips

Format clearly with:
Day 1
Morning:
Afternoon:
Evening:

Then separate sections for:
Best Time:
Currency:
Language:
Packing Checklist:
Hotels:
Restaurants:
Travel Tips:
`;
const response = await axios.post(
API_URL,
{
model: "openai/gpt-3.5-turbo",
messages: [
{
role: "user",
content: prompt,
},
],
},
{
headers: {
Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
"Content-Type": "application/json",
},
}
);
return response.data.choices[0].message.content;
} catch (error) {
console.log(error);
return "AI failed to generate trip.";
}
};