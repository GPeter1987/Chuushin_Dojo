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
    let assoMonths = {  "január": 1, "február": 2, "március": 3, "április": 4,
                        "május": 5, "június": 6, "július": 7, "augusztus": 8, "szeptember": 9, "október": 10, "november": 11, "december": 12 };

    let tmpArr = rawDate.split(" ");

    // Évszám kiszedése
    if(isNaN(tmpArr[1].slice(-1))) //ha az utolsó karakter nem szám
		year=tmpArr[1].substring(0,tmpArr[1].length-1); //akkor levágjuk
	else year=tmpArr[1];
    
    // Hónap kiszedése
    if(isNaN(tmpArr[3].slice(-1))) //ha az utolsó karakter nem szám
		day=tmpArr[3].substring(0,tmpArr[3].length-1); //akkor levágjuk
	else day=tmpArr[3];
    
    let monthNum;
    
    if(isNaN(tmpArr[2])){ //ha nem szám a hónap, vagyis szövegesen van kiírva
		if(assoMonths.hasOwnProperty(tmpArr[2])) //akkor ha az objektumban definiált (érvényes) hónapról van szó
			monthNum=assoMonths[tmpArr[2]]; //akkor a szöveges index alapján kikeressük a hozzá tartozó számot
		else{ //ha szöveges és érvénytelen a hónap név
			if(isNaN(tmpArr[2].substring(0,tmpArr[2].length-1))) //akkor még mindig 2 lehetőség maradt: vagy <szám>. formátumban van, vagy tényleg érvénytelen
				return; //ha érvénytelen, akkor nincs értelme folytatni, nincs esemény (kilépünk)
			else monthNum=tmpArr[2].substring(0,tmpArr[2].length-1); //ha "nem nem szám" (vagyis szám) n-1 hosszon, akkor levágjuk az utolsó karaktert
		}
	}
	else //egyébként (ha szám a hónap)
		monthNum=tmpArr[2];
        
    console.log(year + " " + monthNum + " " + day);
    actualEvent(year,monthNum,day);
}
getDateEvent();