/* A weblap frontendes javascript elemei */
function menuStyle() {
    const menu = document.querySelectorAll('.nav-link');

    for (let menuItem of menu){
        menuItem.addEventListener('mouseover', function() {
           // menuItem.style.textDecoration       = 'underline';
           // menuItem.style.textDecorationColor  = '#AAD13F';
            menuItem.style.color = '#FFC107';
        });

        menuItem.addEventListener('mouseleave', function() {
            menuItem.style.textDecoration = 'none';
            menuItem.style.color = '#FFFFFF';
        });
    };
};
menuStyle();

/*  A funkciónak az esemény dátumát kell beadni. Funkción belül
    intézzük a hónapból levonást a dátum értékhez, mert a JS-ben  
    0-11-ig számol hónapot */
function actualEvent(year, month, day){
    const date      = new Date();
    const eventDate = new Date(year, month -1, day);
    let actEvent    = document.getElementById('actuality');
    let filler      = document.getElementById('filler');

    if(date <= eventDate){
        filler.style.display = 'none';
    }
    else{
        actEvent.style.display = 'none';
    }
}

// Feldolgozó funkció: A kapott stringben szerepel-e a lista valamely eleme
function findDateParts(arr, text){
    let answer = "";
    arr.forEach((element) =>{
        if(text.includes(element)){
            if(!answer.includes(element)){
                answer = element;
            }
        }
    })
    return answer;
}

function getDateEvent(){
    let dateOrig;

    dateOrig = document.getElementById('date');
    rawDate = dateOrig.textContent;
    
    // Dátum kiszedése
    let years   = ["2022", "2023"];
    let months  = [ "Január", "Február", "Március","Április", "Május", "Június",
                    "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    let days    = [ "1.", "2.", "3.", "4.", "5.", 
                    "6.", "7.", "8.", "9.", "10.",
                    "11.", "12.", "13.", "14.","15.",
                    "16.","17.","18.","19.","20.",
                    "21.","22.","23.","24.","25.",
                    "26.","27.","28.","29.","30.","31."];

    // Évszám kiszedése
    year = findDateParts(years,rawDate);
    year.trim();
    
    // Hónap kiszedése
    rawMonth = findDateParts(months,rawDate);
    rawMonth.trim();
    
    // Nap kiszedése
    day = findDateParts(days,rawDate);
    day.trim();
    

    let monthNum;

    switch(rawMonth){
        case months[0]: monthNum = 01; 
            break;
        case months[1]: monthNum = 02; 
            break;
        case months[2]: monthNum = 03; 
            break;
        case months[3]: monthNum = 04; 
            break;
        case months[4]: monthNum = 05; 
            break; 
        case months[5]: monthNum = 06; 
            break;
        case months[6]: monthNum = 07; 
            break;
        case months[7]: monthNum = 08; 
            break;
        case months[8]: monthNum = 09; 
            break;
        case months[9]: monthNum = 10; 
            break;
        case months[10]: monthNum = 11; 
            break; 
        case months[11]: monthNum = 12; 
            break;
        default : console.log('Error on the event month.');
    }
    actualEvent(year,monthNum,day);
}
getDateEvent();