import React, { useState } from 'react'
import ContactList from './ContactList'
import SearchContact from './SearchContact'
import './Messanger.scss'
import $ from 'jquery'


export default function FeedChat() {
    const windowSize = $(window).width();
    const [MessangerOpen, setMessangerOpen] = useState(false)
    return (
        <div className="Messanger"
            onClick={() => {
                if (!MessangerOpen && windowSize < 600) {
                    setMessangerOpen(true)
                    $(".Messanger").addClass("MessangerOpen");
                }
            }}>
            {MessangerOpen ? <div className="CloseMessanger" onClick={() => {
                console.log("yes")
                setMessangerOpen(false)
                $(".Messanger").removeClass("MessangerOpen");
            }}>Close</div> : null}
            <SearchContact />
            <ContactList />
        </div>
    )
}
