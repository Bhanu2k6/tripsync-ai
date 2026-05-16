const API_KEY = "51f4e9ff650e49a0aa857f7bfb6bf5ce";

export const getPlaces = async (city) => {

  try {

    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=tourism.sights,catering.restaurant,accommodation.hotel&text=${city}&limit=6&apiKey=${API_KEY}`
    );

    if (!response.ok) {

      return [];

    }

    const data = await response.json();

    return data.features || [];

  } catch (error) {

    console.log("Places API Error:", error);

    return [];

  }
};