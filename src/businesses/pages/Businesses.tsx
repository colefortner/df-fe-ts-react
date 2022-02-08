import BusinessList from "../components/BusinessList";

const Businesses: React.FC = () => {
  const businesses_data = [
    {
      id: "1",
      name: "Pinellas Ale House",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
    },
    {
      id: "2",
      name: "Dog House",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
    },
  ];
  return <BusinessList businesses={businesses_data} />;
};

export default Businesses;
