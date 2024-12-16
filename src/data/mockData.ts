import { TourPackage, Booking } from "../types";

export const TourPackages: TourPackage[] = [
  {
    _id: "1",
    title: "Majestic Swiss Alps Adventure",
    description:
      "Experience the breathtaking beauty of the Swiss Alps with this 7-day adventure package. Includes hiking, skiing, and luxury accommodation.",
    price: 2499,
    availableDates: ["2024-04-15", "2024-05-01", "2024-05-15"],
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
      "https://images.unsplash.com/photo-1422393462206-207b0fbd8d6b",
      "https://images.unsplash.com/photo-1470010762743-1fa2363f65ca",
      "https://images.unsplash.com/photo-1577386346613-3c7cde89b951",
    ],
    location: "Switzerland",
    duration: "7 days",
    highlights: [
      "Scenic hiking trails in the Alps",
      "Luxury mountain resort accommodation",
      "Swiss chocolate tasting experience",
      "Cable car rides with panoramic views",
      "Traditional Swiss fondue dinner",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich",
        description: "Welcome meeting and transfer to mountain resort",
      },
      {
        day: 2,
        title: "Alpine Hiking",
        description: "Guided hiking tour through scenic mountain trails",
      },
    ],
    included: [
      "Luxury accommodation",
      "Daily breakfast and dinner",
      "Professional guide",
      "All transfers",
      "Equipment rental",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Lunch meals",
    ],
  },
  {
    _id: "2",
    title: "Tropical Paradise Bali Retreat",
    description:
      "Immerse yourself in the cultural richness and natural beauty of Bali with this 10-day luxury retreat package.",
    price: 1899,
    availableDates: ["2024-06-01", "2024-06-15", "2024-07-01"],
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8",
    ],
    location: "Bali, Indonesia",
    duration: "10 days",
    highlights: [
      "Private villa accommodation",
      "Traditional spa treatments",
      "Temple visits and cultural tours",
      "Cooking classes with local chefs",
      "Beach yoga sessions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Denpasar",
        description: "Welcome ceremony and transfer to luxury villa",
      },
      {
        day: 2,
        title: "Cultural Immersion",
        description: "Visit to ancient temples and traditional markets",
      },
    ],
    included: [
      "Luxury villa accommodation",
      "Daily breakfast",
      "Airport transfers",
      "Cultural tours",
      "Spa treatments",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
    ],
  },
  {
    _id: "3",
    title: "African Safari Adventure",
    description:
      "Experience the ultimate wildlife adventure with this 8-day safari through the Serengeti and Ngorongoro Crater.",
    price: 3299,
    availableDates: ["2024-08-01", "2024-08-15", "2024-09-01"],
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      "https://images.unsplash.com/photo-1549366021-9f761d450615",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d",
    ],
    location: "Tanzania",
    duration: "8 days",
    highlights: [
      "Game drives in the Serengeti",
      "Luxury tented camp accommodation",
      "Maasai village visit",
      "Hot air balloon safari",
      "Sundowner experiences",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Welcome briefing and overnight at luxury lodge",
      },
      {
        day: 2,
        title: "Serengeti National Park",
        description: "Full-day game drive in the Serengeti",
      },
    ],
    included: [
      "Luxury accommodation",
      "All meals",
      "Game drives",
      "Park fees",
      "Professional guide",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
    ],
  },
];

export const mockBookings: Booking[] = [
  {
    _id: "1",
    packageId: "1",
    packageTitle: "Manali",
    customerName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    travelers: 2,
    specialRequests: "Vegetarian meals preferred",
    totalPrice: 4998,
    createdAt: "2024-03-15",
  },
  {
    _id: "2",
    packageId: "2",
    packageTitle: "Shimla",
    customerName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 891",
    travelers: 1,
    totalPrice: 1899,
    createdAt: "2024-03-16",
  },
];
