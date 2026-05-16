import axios from "axios";

const API_URL =
  "https://openrouter.ai/api/v1/chat/completions";

export const generateAITrip = async (
  tripData
) => {

  try {

    const prompt = `
Create a detailed ${tripData.days}-day travel itinerary for ${tripData.destination}
for ${tripData.travelers} travelers with a ${tripData.budget} budget and a ${tripData.mood} vibe.

Format clearly and neatly.

For each day include:

Day 1
Morning:
- activity
- activity

Afternoon:
- activity
- activity

Evening:
- activity
- activity

Then include separate sections in bullet points:

Best Time:
- best season/months to visit

Currency:
- local currency used

Language:
- main language spoken

Packing:
- item
- item
- item

Recommended Hotels:
- hotel 1
- hotel 2
- hotel 3

Restaurants:
- restaurant 1
- restaurant 2
- restaurant 3

Travel Tips:
- tip
- tip
- tip
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

          "Content-Type":
            "application/json",
        },
      }
    );

    return response.data.choices[0]
      .message.content;

  } catch (error) {

    console.log(error);

    return "AI failed to generate trip.";

  }

};