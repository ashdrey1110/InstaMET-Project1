// METgetter.js captures 10 random objectIDs and their respective key-values

// Create a new array of objects, which will hold 10 random pieces
let arrayOfTenPieces = [];

function artSelector() {
   // Randomly select an index between 0 and 494093 
   let randomIndex = Math.round(Math.random() * (494093 - 0) + 0);
   console.log(`the random index is ${randomIndex}`);

   let objectID;

   // Fetch & jsonify 
   fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`)
    .then(rawData => {
        if(!rawData.ok){
            throw new Error(`code: ${rawData.status}, status text: ${rawData.statusText}`);
        } 
        else {return rawData.json();}
    })
    .then(jsonifiedData => {
        objectID = jsonifiedData.objectIDs[randomIndex];
        console.log(`the object id is ${objectID}`);
    })
    // Now, with the objectID, lets get some info on the art piece
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
            .then(rawArt => {
                if(!rawArt.ok){
                    throw new Error(`code: ${rawArt.status}, status text: ${rawArt.statusText}`);
                } 
                else {return rawArt.json();}
            })
            .then(jsonifiedArt => {
                let artImage = jsonifiedArt.primaryImageSmall;
                let artTitle = jsonifiedArt.title;
                let artistName = jsonifiedArt.artistDisplayName;
                let artistBio = jsonifiedArt.artistDisplayBio;
                let artDate = jsonifiedArt.objectDate;
                let artMedium = jsonifiedArt.medium;
                let artWiki = jsonifiedArt.objectWikidata_URL;
                let artDepartment = jsonifiedArt.department;
                let artGalleryNum = jsonifiedArt.GalleryNumber;

                arrayOfTenPieces.push({
                    title: artTitle,
                    fullName: artistName,
                    image: artImage,
                    bio: artistBio,
                    date: artDate,
                    medium: artMedium,
                    wiki: artWiki,
                    department: artDepartment,
                    gallery: artGalleryNum
                })
            })  
    // print the object
    console.log(arrayOfTenPieces);
}

artSelector();