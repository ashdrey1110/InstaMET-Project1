// METgetter.js captures 10 random objectIDs and their respective key-values

/*
PLEASE BE AWARE! 

Due to the fact the MET holds over 490k pieces and many of those pieces do not have an
image, an artist name, or other information that would be desirable to include for the 
purpose of this Insta app, only the European Paintings department is used.

Not only does this department contain more information to fulfill the needs of this app, but
it is also small enough of a collection that it will make the app work faster.
*/

// Create a new array of objects, which will hold 10 random pieces
const arrayOfTenPieces = [];


// The artSelector fxn fetches and jsonifies the data, and creates the new object
async function artSelector() {
    try {
        // Fetch & jsonify up front for all objects
        const promise = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11`)
        if(!promise.ok){
            throw new Error(`first fetch code: ${promise.status}, status text: ${promise.statusText}`);
        }
        const jsonifiedData = await promise.json();

        // Randomly select an index between 0 and 2635 for only department 11 
        // Euro art and paintings
        let randomIndex = Math.round(Math.random() * (jsonifiedData.objectIDs.length - 0) + 0);
        let objectID = jsonifiedData.objectIDs[randomIndex];
        //console.log(`the object id is ${objectID}`);

        // Now fetch and jsonify the object info for an objectID's artwork
        const rawArt = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
        if (!rawArt.ok) {
            throw new Error(`Second fetch error: ${rawArt.status}, ${rawArt.statusText}`);
        }
        const jsonifiedArt = await rawArt.json();

        // Set up art object
        let artObject = {
            title: jsonifiedArt.title || "Untitled",
            fullName: jsonifiedArt.artistDisplayName || "anon",
            image: jsonifiedArt.primaryImageSmall,
            bio: jsonifiedArt.artistDisplayBio,
            date: jsonifiedArt.objectDate,
            medium: jsonifiedArt.medium,
            wiki: jsonifiedArt.objectWikidata_URL || "Sorry, no wiki page is available",
            department: jsonifiedArt.department,
            id: jsonifiedArt.objectID,
            gallery: jsonifiedArt.GalleryNumber
        };
        
        return artObject;
    }

    // For any errors
    catch (error) {
        console.error("Error fetching artwork:", error);
        return null;
    }
}


// getTenArtworks fxn actually creates the list of 10
async function getTenArtworks () {
    while(arrayOfTenPieces.length<10){
        let artwork = await artSelector();
        //if there's an artwork AND it has an image
        if(artwork && artwork.image){
            arrayOfTenPieces.push(artwork);
        }
    }
    console.log(`the length is ${arrayOfTenPieces.length} and the artwork at index 3 is titled ${arrayOfTenPieces[3].title} with objectID of ${arrayOfTenPieces[3].id}`);
}

getTenArtworks();

module.exports = METgetter;