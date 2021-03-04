import React from "react"
import UserItem from "../../users/components/UserItem"

import PlaceList from "../../places/components/PlaceList"

const DUMMY_PLACE = [
    {
        id:"p1",
        title:"Empire State",
        description:"One of 7 wonders",
        imageURL: "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
        address: "Agra",
        location :{
            lat:27.173891,
            long: 78.042068
        },
        creator:"u1"
        
    },
    {
        id:"p2",
        title:"Empire State",
        description:"One of 7 wonders",
        imageURL: "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
        address: "Agra",
        location :{
            lat:27.173891,
            long: 78.042068
        },
        creator:"u2"
    }
]

const UserPlaces = (props) => {

    return <PlaceList items={DUMMY_PLACE}/>
}
export default UserPlaces

