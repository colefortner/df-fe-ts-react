import React, { useState, useEffect, useContext } from "react";
import BusinessList from "../../businesses/components/BusinessList";
import { AuthContext } from "../../shared/context/auth-context";

const Users: React.FC = () => {
  const [businessData, setBusinessData] = useState([]);
  const auth = useContext(AuthContext);
  console.log(auth.userId);
  useEffect(() => {
    fetch(`http://localhost:5050/dashboard/${auth.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBusinessData(data.businesses);
        console.log(data.businesses);
      });
  }, []);
  // const saved_businesses = [
  //   {
  //     id: "1",
  //     name: "Pinellas Ale House",
  //     image:
  //       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
  //     rating: 4,
  //     location: {
  //       lat: 27.7699,
  //       lng: -82.6601,
  //     },
  //   },
  //   {
  //     id: "2",
  //     name: "3 Daughters Brewing",
  //     image:
  //       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/61/d7/ab/paw-brewery-tap-room.jpg?w=1000&h=-1&s=1",
  //     rating: 4.5,
  //     location: {
  //       lat: 27.769528,
  //       lng: -82.6627778,
  //     },
  //   },
  // ];
  //if logged in
  return (
    <div>
      <h2>Dashboard Title</h2>
      <BusinessList
        businesses={businessData}
        dashboard={true}
        landing={false}
      />
      <h2>Promotion Announcements ?</h2>
      <h2>Friends Checked in ?</h2>
    </div>
  );
};

export default Users;
