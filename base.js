
let startSpecified = false;
let endSpecified = false;

let startSquare = null;
let endSquare = null

function showRoute(square) {
    const messageLiner = document.getElementById("messageLine");
    const currentSquare = document.getElementById(square);

    if (currentSquare.classList.contains("startSquare")) {
        currentSquare.classList.remove("startSquare");
        startSpecified = false;

        if (endSpecified == true){
            let changableEnd = document.getElementById(endSquare)
            changableEnd.classList.remove("endSquare");
            endSpecified = false;

            cleanStationSquares();
        }
        
        messageLiner.innerHTML = "Please choose two squares...";
    } else {
        if (startSpecified != true){
            currentSquare.classList.add("startSquare");
            startSpecified = true;
            startSquare = currentSquare.id;
            messageLiner.innerHTML = "Choose the target square or remove the start square with another click on it.";
        } else {
            if (currentSquare.classList.contains("endSquare")) {
                currentSquare.classList.remove("endSquare");
                endSpecified = false;

                cleanStationSquares();

                messageLiner.innerHTML = "Choose the target square or remove the start square with another click on it.";
            } else {
                if (endSpecified != true){
                    currentSquare.classList.add("endSquare");
                    endSpecified = true;
                    endSquare = currentSquare.id;
                } else {
                    let changableEnd = document.getElementById(endSquare)
                    changableEnd.classList.remove("endSquare");
                    currentSquare.classList.add("endSquare");
                    endSquare = currentSquare.id;
                }
            }
        }
    }

    if (startSpecified == true && endSpecified == true){
        //messageLiner.innerHTML = startSquare + "---" + endSquare;

        cleanStationSquares();

        specifyEnd(startSquare, endSquare);
    }
}

function specifyEnd(startPoint, endPoint){
    const messageLiner = document.getElementById("messageLine");

    let path = '?start=' + startPoint + '&end=' + endPoint;

    const Http = new XMLHttpRequest();
    const url='https://v86wed9i20.execute-api.eu-west-1.amazonaws.com/public/knight-path' + path;

    Http.open("GET", url);
    Http.send();
    
    //alert(Http.responseText);

    Http.onreadystatechange = (e) => {
        const possibleArray = Http.responseText;

        var cleanedArray = possibleArray.replace(/([^a-z0-9,]+)/gi, "").split(",");
        messageLiner.innerHTML = "This is the path: " + cleanedArray + ". You can remove the start or/and end squares.";

        cleanedArray.splice(0, 1);
        cleanedArray.splice(-1, 1);

        //messageLiner.innerHTML = "This is the path: " + cleanedArray;

        let counter = 1;
        for (const item of cleanedArray) {
            const squareStation = document.getElementById(item);
            squareStation.classList.add("stationSquare" + counter);
            //console.log(counter);
            counter += 1;
        }
    }
}

cleanStationSquares = () => {
    let elems = document.getElementsByClassName('stationSquare1');
    while (elems[0]) {elems[0].classList.remove('stationSquare1');}

    elems = document.getElementsByClassName('stationSquare2');
    while (elems[0]) {elems[0].classList.remove('stationSquare2');}

    elems = document.getElementsByClassName('stationSquare3');
    while (elems[0]) {elems[0].classList.remove('stationSquare3');}

    elems = document.getElementsByClassName('stationSquare4');
    while (elems[0]) {elems[0].classList.remove('stationSquare4');}

    elems = document.getElementsByClassName('stationSquare5');
    while (elems[0]) {elems[0].classList.remove('stationSquare5');}

    elems = document.getElementsByClassName('stationSquare6');
    while (elems[0]) {elems[0].classList.remove('stationSquare6');}
}