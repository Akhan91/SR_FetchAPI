// Denna fil ska innehålla er lösning till projektuppgiften.

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

//variabler
let showNumRows = document.getElementById("shownumrows");
let mainNavList = document.getElementById("mainnavlist");
let info        = document.getElementById( "info" );
let apiURL      = 'http://api.sr.se/api/v2/' // This is the base url, we can add additional endpoints to it depending on what we want to fetch



window.onload = function () {
    info.innerHTML +=
    "<h3> Välkommen till tablåer för Sveriges radio!</h3>" +
    "<p>Denna webb-applikation använder Sveriges Radios öppna API för tablåer och program.</p>" +
    "<p>Välj kanal till vänster för att visa tablå för denna kanal.</p>";
    fetchData()
};

// The main function for fetching data from SR. Both Channels and Programs runs inside it.
async function fetchData() {
    let response = await fetch( apiURL + 'channels?format=json' )
    let data = await response.json();
    let fetchChannels = () => {
        for ( let i = 0;i < data.channels.length;i++ ) {
            let id = data.channels[ i ].id;
            mainNavList.innerHTML += `
            <ul>
            <li id="${ id }" class="channels">${ data.channels[ i ].name }</li>
            <h1></h1>
            </ul>
            `;
            // console.log( data.channels[i].scheduleurl )
        }
    }
    
    // CREATE eventListener WHICH REACTS TO THE FUNCTION fetchSchedule
    
    fetchChannels()
    fetchSchedule()
};

// console.log(li.id)
// START WRITING A NEW FUNCTION HERE WHICH CAN FETCH THE PROGRAMS (TABELLER) JUST LIKE fetchChannels()
let fetchSchedule = async () => {
    let response = await fetch( apiURL + `scheduledepisodes?channelid=${id}&format=JSON` )
    let data = await response.json();
    console.log(data)
    for ( let i = 0;i < data.schedule.length;i++ ) {
        let channelUrls = data.schedule[ i ].channel.id 
        const startTime = data.schedule[ i ].starttimeutc.substr( 6, 13 );
        const endTime   = data.schedule[ i ].endtimeutc.substr( 6 );
        info.innerHTML += `
        <h4>${ data.schedule[ i ].title }</h4>
        <p>${ data.schedule[ i ].description }</p>
        <hr>
        `;
    };
};
