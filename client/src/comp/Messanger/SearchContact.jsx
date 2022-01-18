import React from 'react'
import searchContact from './image/searchContact.png'
import chatContact from './image/chatContact.png'


export default function SearchContact() {
    return (
        <div className="SearchContact">
            <div className="Title1">
                <h2>Search Contact</h2>
            </div>
            <div className="Search">
                <img src={searchContact} alt="" />
                <input type="text" name="" id="" placeholder="Search for contact" />
            </div>
            <div className="Title2">
                <img src={chatContact} alt="" />
                <h2>Messanger</h2>
            </div>
        </div>
    )
}
