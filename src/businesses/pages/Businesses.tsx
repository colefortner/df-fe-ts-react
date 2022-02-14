import BusinessList from "../components/BusinessList";

const Businesses: React.FC = () => {
  const businesses_data = [
    {
      id: "1",
      name: "Pinellas Ale House",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
      rating: 4,
      coordinates: {
        lat: 27.7699,
        lng: -82.6601,
      },
    },
    {
      id: "2",
      name: "3 Daughters Brewing",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
      rating: 4.5,
      coordinates: {
        lat: 27.769528,
        lng: -82.6627778,
      },
    },
  ];
  return <BusinessList businesses={businesses_data} />;
};

export default Businesses;
