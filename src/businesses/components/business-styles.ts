import styled from "styled-components";
import { Link } from "react-router-dom";

export const BusinessCard = styled.li`
  // border: 1px solid gray;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 6px;
  padding: 10px;
  height: 400px;
  width: 275px;
  margin: 10px;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.brand.primary};
`;

export const BusinessCardLink = styled(Link)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: inherit;
  font-family: ${(props) => props.theme.fonts.body};
`;

export const Image = styled.img`
  height: 225px;
  width: 225px;
  border-radius: 10px;
  margin-top: 8px;
  margin-bottom: 8px;
  // this keeps the picture from being distorted
  object-fit: cover;
`;

export const Phone = styled.div`
  margin-top: 5px;
  color: #445663;
`;

export const Open = styled.div`
  margin-top: 5px;
  // color: green;
  color: #445663;
`;

export const SaveButton = styled.button`
  // all: unset;
  background: none;
  border: none;
  position: absolute;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 170px;
  color: white;
  &:focus {
    background: black;
  }
`;

export const DeleteButton = styled.button`
  // all: unset;
  background: none;
  border: none;
  position: absolute;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 170px;
  color: hsla(353, 100%, 62%, 1);
  &:focus {
    background: white;
  }
`;

export const RestaurantName = styled.h2`
  color: #445663;
`;

export const Type = styled.p`
  font-size: 12px;
  margin-top: 5px;
  margin-left: 8px;
  margin-right: 8px;
  color: #445663;
`;

export const RatingContainer = styled.div`
  // color: white;
  color: #445663;
`;
