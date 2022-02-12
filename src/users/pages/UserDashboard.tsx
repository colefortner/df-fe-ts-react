import React from "react";
import BusinessList from "../../businesses/components/BusinessList";

const Users: React.FC = () => {
  const saved_businesses = [
    {
      id: "1",
      name: "Pinellas Ale House",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
      rating: 4,
    },
    {
      id: "2",
      name: "Dog House",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
      rating: 4.5,
    },
  ];
  //if logged in
  return (
    <div>
      <h2>Dashboard Title</h2>
      <BusinessList businesses={saved_businesses} />
      <h2>Promotion Announcements ?</h2>
      <h2>Friends Checked in ?</h2>
    </div>
  );
};

export default Users;
