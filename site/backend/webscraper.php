<?php
    #include 'site/backend/webscraper.php'; Ez lesz majd az include link!

    # Globális változók
    $ImgUrl;            # Kép src címe
    $Title;             # Esemény címe
    $TitleDescription;  # Esemény leírása
    $Place;             # Esemény helyszíne
    $Date;              # Esemény dátuma
    $Other;             # Egyéb 
    $SearchPlace = 'helyszín';
    $SearchDate  = 'időpont';
    
    # WebScraper
    include ('simpleDom/simple_html_dom.php');

    $websiteUrl = "https://yurusuaikido.hu/";

    $html = file_get_html($websiteUrl);
    # ID amit keresek:  event_2
    $EventData;

    foreach($html -> find('#event_2') as $postDiv ) {
        # Kép címének megkeresése
        foreach($postDiv -> find('.aikido-event-image') as $a){
            $ImgUrl = $a -> attr['src'];
            #echo ($ImgUrl);
        }

        # Esemény címének előkeresése
        foreach($postDiv -> find('h3') as $a){
            $Title = substr($a, 4, -5 );
            #echo ($Title);
        }

        # Esemény leírása
        foreach($postDiv -> find('h4') as $a){
            $TitleDescription = substr($a, 4, -5 );
            #echo ($TitleDescription);
        }
        
        # Helyszín
        foreach($postDiv -> find('p') as $a){
            /*
                $Other = substr($a, 3, -4 ); 
            */
            /* Kisbetűsre konvertáljuk a teljes stringet amiben keresünk ,mert kisbetűs a változó is ami a keresett stringet tartalmazza. */
            $a = strtolower($a);
            /* Nem countert fogunk használni ,hanem azt vizsgáljuk, hogy az időpont vagy a helyszín szó szerepel-e az adott elemben. */
            $PlacePos = strpos($a, $SearchPlace);
            $DatePos = strpos($a, $SearchDate);

            if($PlacePos !== false){
                $EventData = $SearchPlace;
            };
                
            if($DatePos !== false){
                $EventData = $SearchDate;
            };
                
            switch($EventData) {
                case 'helyszín':
                    $Place = str_replace("Helyszín:","<u>HELYSZÍN:</u> <br>",substr($a, 3, -4 )); 
                    break;
                case 'időpont':
                    $Date = str_replace("Időpont:", "<u>IDŐPONT:</u> <br>", substr($a, 3, -4 ));
                    break;    
            }
        }
    }
?>
    <!--  Megjelenítés az oldalon -->
    <div class="container pt-2 mt-5" id="actuality">
        <div class="row mt-3 p-2 rounded">  
            <div class="col-sm-12 col-md-8 mt-auto mb-auto" id="welcomePic">
                <img src="https://www.yurusuaikido.hu/<?php echo $ImgUrl; ?>" alt="The cover image of the event" class="img-fluid rounded w-100">
            </div>          
                        <div class="col-sm-12 col-md-4 mt-auto mb-auto">
                            <h1 class="text text-uppercase text-center text-warning m-3"><?php echo ($Title); ?></h1>
                            <p class="text text-secondary">
                                <?php echo $TitleDescription ;?>
                                <br>
                                <br>
                                <span id="place" class="text text-uppercase text-secondary fw-bold"><?php echo ($Place);
                                ?></span>
                                <br>
                                <br>
                                <span id="date" class="text text-uppercase text-secondary fw-bold"><?php echo ($Date); ?></span>
                                <br>
                                <br>
                                <span class="text text-uppercase text-secondary fw-bold"><u>infó:</u></span>
                                <br>
                                <a href="https://www.yurusuaikido.hu/">Yurusu Aikido Egyesület</a>
                                <br>
                                
                                <p id="other" class="text text-center text-secondary fw-bold">
                                    <?php echo $Other; ?>
                                </p>
                            
                            </p>
                            <p class="text text-secondary text-center border-top border-2 p-2 fw-bold">
                                <?php echo $Date; ?>
                            </p>
                            <a id="btnEvent" href="https://www.yurusuaikido.hu/" class="btn btn-outline-light m-3 d-grid mx-auto" target="_blank"><span>Tovább az eseményhez...</span></a>
                        </div>
                    </div>
                </div>                