
import { GoogleGenAI, Type } from "@google/genai";
import { Hotel } from '../types';

const fetchHotels = async (): Promise<Hotel[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 12 diverse, fictional hotels available in Chennai, India. Provide a mix of luxury, boutique, and budget options. Each hotel must have a unique name, a plausible location within Chennai, a price per night (between 80 and 500 USD), a rating out of 5 (can be a float like 4.5), a list of 4-6 key amenities, a detailed description, and a unique image URL from picsum.photos with dimensions 800x600.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hotels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                   id: {
                    type: Type.STRING,
                    description: "A unique identifier for the hotel, perhaps based on its name."
                  },
                  name: {
                    type: Type.STRING,
                    description: "The name of the hotel."
                  },
                  location: {
                    type: Type.STRING,
                    description: "The neighborhood or area in Chennai where the hotel is located (e.g., T. Nagar, Adyar)."
                  },
                  pricePerNight: {
                    type: Type.NUMBER,
                    description: "The cost for one night's stay in USD."
                  },
                  rating: {
                    type: Type.NUMBER,
                    description: "The customer rating of the hotel, on a scale of 1 to 5."
                  },
                  amenities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of key amenities offered by the hotel."
                  },
                  imageUrl: {
                    type: Type.STRING,
                    description: "A placeholder image URL from picsum.photos."
                  },
                  description: {
                    type: Type.STRING,
                    description: "A compelling and detailed description of the hotel."
                  }
                },
                required: ["id", "name", "location", "pricePerNight", "rating", "amenities", "imageUrl", "description"]
              }
            }
          }
        },
      },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    // Ensure the response is an array of hotels
    if (parsed && parsed.hotels && Array.isArray(parsed.hotels)) {
        // Add a unique seed to image URLs to prevent duplicates
        return parsed.hotels.map((hotel: Hotel, index: number) => ({
            ...hotel,
            imageUrl: `${hotel.imageUrl}?random=${index + 1}`
        }));
    } else {
        console.error("Unexpected JSON structure:", parsed);
        throw new Error("Failed to parse hotel data from AI response.");
    }
  } catch (error) {
    console.error("Error fetching hotels from Gemini API:", error);
    throw new Error("Could not fetch hotel information. Please check your API key and try again.");
  }
};

export { fetchHotels };
