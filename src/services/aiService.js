import axios from "axios";

const API_URL =
  "https://openrouter.ai/api/v1/chat/completions";

export const generateAITrip = async (
  tripData
) => {

  try {

const prompt = `
Create a COMPLETE detailed ${tripData.days}-day travel itinerary for ${tripData.destination}
for ${tripData.travelers} travelers with a ${tripData.budget} budget and a ${tripData.mood} vibe.

VERY IMPORTANT:
- Generate ALL ${tripData.days} days completely.
- Do NOT stop at 2 or 3 days.
- Every day must contain Morning, Afternoon, and Evening plans.
- Use clean formatting.
- Use bullet points.
- Keep recommendations realistic and tourist-friendly.

Format EXACTLY like this:

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

Day 2
Morning:
- activity
- activity

Afternoon:
- activity
- activity

Evening:
- activity
- activity

Continue this format UNTIL Day ${tripData.days}.

Then ALWAYS include these EXACT headings:

Best Time:
- best season
- weather info

Currency:
- local currency

Language:
- main language

Packing:
- item
- item
- item

Recommended Hotels:
- hotel
- hotel
- hotel

Restaurants:
- restaurant
- restaurant
- restaurant

Travel Tips:
- tip
- tip
- tip

IMPORTANT:
- Do not skip headings.
- Use bullet points for everything.
- Do not write long paragraphs.
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