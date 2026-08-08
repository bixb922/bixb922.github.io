/**
 * Browser-based Mock Backend Demo
 * Run directly in the browser environment.
 */

// --- Constants & Helper Functions ---
const HOME = "";
//const STATIC_FOLDER = "/demo/static/";
//const DATA_FOLDER = "/demo/data/";


const DTFORMAT = "YYYY/MM/DD HH:mm:ss";
let TUNELIB = null;
async function fetch(uri,post){
    console.log("ERROR - using plainfetch for", uri);
    return "{}";
}
// --- SessionStorage State Management Helpers ---
function getState(key, defaultValue) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
}

function setState(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Initialize default SessionStorage state if missing
function initSessionState() {
    if (sessionStorage.getItem("CURRENT_SETLIST") === null) {
        setState("CURRENT_SETLIST", []);
    }
    if (sessionStorage.getItem("SAVED_SETLIST") === null) {
        setState("SAVED_SETLIST", []);
    }
    if (sessionStorage.getItem("CURRENT_PROGRESS") === null) {
        setState("CURRENT_PROGRESS", {
            play_mode: true,
            status: "waiting",
            rpsec: 1.2,
            velocity: 50,
            playtime: -1,
            setlist: [],
            is_turning: false,
            tune: null,
            registers: [],
            playback_enabled: true,
            tune_requests: {}
        });
    }
    if (sessionStorage.getItem("CURRENT_VELOCITY") === null) {
        setState("CURRENT_VELOCITY", 50);
    }
    if (sessionStorage.getItem("START_TIME") === null) {
        setState("START_TIME", -1);
    }
}

// --- Route Handlers ---

async function demo_config_json(){
    return {"webserver_cache": true, "tempo_follows_crank": false, "max_age": 300, "lower_threshold_rpsec": 0.3, "max_polyphony": 9, "normal_rpsec": 1.2, "battery_heartbeat_period": 0, "access_point2": "MyCellPhoneAP", "password2": "@encrypted_c31596f0e61ef247e50f835155724a49e45d966576b19f94f6c7ace48ed6cb27", "serverpassword": "@encrypted_c9bdc0a0954076ece1e109cd8e27475ada5087c90341db003631c573c43fd57d", "access_point1": "MyHomeRouter", "password1": "@encrypted_03283b3a750803d2b2056f6ea8cab3a5258e26543e3c8c3172f2a76fe782bfe5", "higher_threshold_rpsec": 0.7, "servernode": "", "mic_signal_low": -18, "mic_store_signal": false, "pulses_per_revolution": 12, "battery_heartbeat_duration": 0, "mic_test_mode": true, "password_required": true, "idle_deepsleep_minutes": 15, "description": "Das Orgelinchen", "ap_max_idle": 120, "rotary_tempo_mult": 1, "touchpad_big_change": 20000, "automatic_delay": 0, "ap_ip": "192.168.144.1", "name": "orgelinchen", "ap_password": "@encrypted_6016ce1e03a9101d959bc4ff148638772bfbf6c4ec809c033b08cb78f9c2139e"}
}
async function demo_history_json(){
    return [["ieITIdKC1", 780358216, 100, false], ["iT7STPh0R", 780366969, 100, false], ["iT7STPh0R", 780375187, 10, false], ["iSjAUw0-i", 780507100, 100, false], ["iT7STPh0R", 780515082, 9, false], ["iT7STPh0R", 807200411, 100, false], ["i9oQcMFpz", 807218118, 9, false]]
}
async function demo_lyrics_json(){
    return {"iFaODnN44": "\"Pisa morena\nPisa con garbo\nQue un relicario\nQue un relicario me voy a hacer\nCon el trocito de mi capote\nQue haya pisado\nQue haya pisado tan lindo pie\"\n", "imsA1mbEX": "(Verse)\nIn the region where the roses always bloom\nBreathing out upon the air their sweet perfume\nLives a dusky maid I long to call my own\nFor, I know my love for her will never die\nWhen the sun am sinking in dat Golden West\nLittle robin red breast gone to seek their nests\nAnd I sneak down to dat place I love the best\nEver'y evening there along I sigh\n\n(Chorus)\nIda! Sweet as apple cider\nSweeter than all I know\nCome out! In the silv'ry moonlight\nOf love we'll whisper, so soft and low!\nSeems as tho' can't live without you\nListen, please, honey do!\nIda! I idolize ya\nI love you, Ida, 'deed I do", "iweguDS1R": "Asómate a la ventana, ay, ay, ay,\npaloma del alma mía,\nque ya la aurora temprana\nnos viene a anunciar el día.\n\nQue ya la aurora temprana ay, ay, ay,\nnos viene a anunciar el día.\nAsómate que ya viene,\nla luz de fresca mañana;\nasómate a la ventana, ay, ay, ay,\npara que mi alma ¡ay¡ no pene.\n\nLas calles están desiertas,\nlas brumas vagan perdidas,\nestán las aves dormidas\ny las estrellas despiertas.\n\nAsómate, y si te miro,\nmi ardiente amor te confieso,\nen los rumores de un beso, ay, ay, ay,\ny en el vaivén de un suspiro.\n\nSabrás que guardo un tesoro\npara ti, dentro del pecho,\nlevántate de tu lecho, ay, ay, ay,\ny sabrás cuanto te adoro.\n\nSi alguna vez en tu pecho, ay, ay, ay,\nmi cariño no lo abrigas,\nengáñalo como a un niño, ay, ay, ay,\npero nunca se lo digas.\n\n(Soñé que el fuego se helaba,\nsoñé que la nieve ardía,\ny por soñar imposibles,\nsoñé que tú me querías.)\n\n(El amor mío se muere, ay, ay, ay,\ny se me muere de frío,\nporque en tu pecho de piedra,\ntú no quieres darle abrigo.\n\nPorque en tu pecho de piedra, ay, ay, ay,\ntú no quieres darle abrigo.)\nAy, ay, ay. ", "iZKeAdV57": "I know I stand in line\nUntil you think you have the time\nTo spend an evening with me\nAnd if we go some place to dance\nI know that there's a chance\nYou won't be leaving with me\nThen afterwards we drop into a quiet little place\nAnd have a drink or two\nAnd then I go and spoil it all\nBy saying somethin' stupid like, \"I love you\"\nI can see it in your eyes\nThat you despise the same old lies\nYou heard the night before\nAnd though it's just a line to you\nFor me it's true\nAnd never seemed so right before\nI practice every day\nTo find some clever lines to say\nTo make the meaning come true\nBut then I think I'll wait\nUntil the evening gets late\nAnd I'm alone with you\nThe time is right, your perfume fills my head\nThe stars get red, and, oh, the night's so blue\nAnd then I go and spoil it all\nBy saying somethin' stupid like, \"I love you\"\nThe time is right, your perfume fills my head\nThe stars get red, and, oh, the night's so blue\nAnd then I go and spoil it all\nBy saying somethin' stupid like, \"I love you\"", "iNjSUxgoc": "Valencia\nEs la tierra de las flores de la luz y del amor\nValencia\nTus mujeres todas tienen de las rosas el color\n\nValencia\nAl sentir como perfuma en tus huertas el azahar\nQuisiera\nEn la huerta valenciana mis amores encontrar\n\nLa blanca barraca, la flor del naranjo\nLas huertas floridas, almendros en flor\nEl Turia de plata, el cielo turquesa\nEl sol valenciano que van diciendo amor\n\nAmores\nEn Valencia son floridos como ramos de azahar\nQuereres\nEn Valencia sus mujeres con el alma suelen dar\n\nPasiones\nEl la huerta valenciana sí te dan el corazón\nSus hembras\nPonen alma y ponen vida en un beso de pasión", "iEdwHmG5f": "Arriba mi manco, arriba\nQue ya ha empezado el rodeo\nY la fiesta en la ramada\nYa está en su alegre apogeo\nApura mi manco, apura\nQue ya empezó la corrida\nY en todos los corazones\nPalpita fuerte la vida\n\nAllá va, allá va, allá va\nAllá va, allá va, allá va\nNo le aflojis capataz\n¡Toro, diablo, malo!\nDale no más\nAllá va, allá va, allá va\nAllá va, allá va, allá va\n¡Hácele punta al champion!\n¡Toro, diablo, malo!\nGuena patrón\n\nGüen dar con la fiesta linda\nQue es el rodeo que encierra\nEl sentimiento del huaso\nQue vive amando a su tierra\nAllí campea el coraje\nEl amor, la galanura\nY en comunión de virtudes\nLa tradición que perdura", "iYOYJK-rA": "Ap'to parathiro mou stelno ena dio\nKe tria ke tessera filia\nPou ftanoun sto limani ena ke dio\nKe tria ke tessera poulia\nPos tha 'thela na iha ena ke dio\nKe tria ke tessera pedia\nOtan tha megalosoun ola na ginoun\nLeventes yia hari tou Pirea\nOso ki an psazo\nDen vrisko allo limani\nTrelli na m' echi kani\nApo tou Pirea\nPou otan vradiazi\nTragoudia m' aradiazi\nKe tis pennies tou allazi\n\nYemizi apo pedia\n\nApo tin porta mou san vgo\nDen iparhi kanis\nPou na min ton agapo\nKe san to vradi kimitho\nXero pos xero pos\nPos tha ton onirefto\nPetradia vazo sto lemo\n\nKe mia ha ke mia ha\nKe mia hantra filachto\nYiati ta vradia kartero\nSto limani san vgo\nKapion agnosto na vro\n\nOso ki an psazo\nDen vrisko allo limani\nTrelli na m' echi kani\nApo tou Pirea\nPou otan vradiazi\nTragoudia m' aradiazi\nKe tis pennies tou allazi\n\nYemizi apo pedia\n\n", "iObdV4akP": "Lyrics\nTranslation\nMeaning\nCantarito de greda, de Peñaflor,\ntu agüita es clara y pura como mi amor,\ncomo mi amor, ay así, yo te lo digo,\nque hasta estando despierto (a), sueño contigo,\nsueño contigo, ay sí, que eres bonita\ny te lavas la cara, con pura agüita.\n\nAgua del río de Peñaflor,\ntú me refrescas el corazón.\nAgua del río de Peñaflor,\ntú me refrescas el corazón.\n\n\nArcilla de los valles, de Peñaflor,\neres coloradita, como el rubor,\ncomo el rubor, ay si, de mi negrita,\nde mi negrita linda, boca chiquita,\nboca chiquita, ay sí, peñaflorina,\nno hay quién pegue contigo, mi negra indina.\n\nAgua del río de Peñaflor,\ntú me refrescas el corazón.\nAgua del río de Peñaflor,\ntú me refrescas el corazón.\n\nCantarito de greda, de Peñaflor.", "i85Kx8QVf": "Muss i denn, muss i denn\nZum Städtele hinaus, Städtele hinaus\nUnd du, mein Schatz, bleibst hier?\n\nWenn i komm', wenn i komm'\nWenn i wieder wieder komm'\nWieder wieder komm'\nKehr' i ein, mein Schatz, bei dir\n\nKann i doch net allweil bei dir sein\nHan i doch mei Freud' an dir!\nWenn i komm', wenn i komm'\nWenn i wieder wieder komm'\n\nWieder wieder komm'\nKehr' i ein, mein Schatz, bei dir\n\nWie du weinst, wie du weinst\nDass i wandere muss, wandere muss\nWie wenn d' Lieb' jetzt wär' vorbei!\n\nSind au drauß, sind au drauß\nDer Mädele viel, Mädele viel\nLieber Schatz, i bleib dir treu\nDenk du net, wenn i 'ne Andre seh'\nNo sei mein' Lieb' vorbei;\nSind au drauß, sind au drauß\nDer Mädele viel, Mädele viel\nLieber Schatz, i bleib dir treu\nÜber's Jahr, über's Jahr\nWenn me Träubele schneid't, Träubele schneid't\nStell' i hier mi wiedrum ei;\nBin i dann, bin i dann\n\nDein Schätzele noch, Schätzele noch\nSo soll die Hochzeit sein\nÜber's Jahr, do ist mein' Zeit vorbei\nDa g'hör' i mein und dein;\nBin i dann, bin i dann\nDein Schätzele noch, Schätzele noch\nSo soll die Hochzeit sein", "irciNXVCh": "\n\nCanciones De La Granja • 2007\nLa Cucaracha\nLetra de La Cucaracha de El Reino Infantil\nchorus\nLa cucaracha, la cucaracha\nYa no puede caminar\nPorque le falta, porque no tiene\nLas dos patitas de atrás\n\nLa señora Cucaracha\nse ha comprado una bombacha\ntoda llena de botones,\ny adornada con hilachas.\n\nQué bombacha mamarracha,\nle dijeron los ratones.\nPero a doña Cucaracha\nno le importan opiniones.", "idmf-YafP": "Yes Sir, That's My Baby\nWords by Gus Kahn, Music by Walter Donaldson\nCopyright ©1925/1951 Irving Berlin Music/Bourne Company\nVerse 1: Who's that coming down the street?\nWho's that looking so petite?\nWho's that coming down to meet me here?\nWho's that you know who I mean,\nSweetest \"who\" you've ever seen,\nI could tell her miles away from here.\nChorus 1: Yes, Sir, That's my Baby, No, Sir, Don't mean \"Maybe\"\nYes, Sir, That's my Baby now.\nYes ma'am, we've dedided, No ma'am, we won't hide it,\nYes, ma'am, you're invited now.\nBy the way, By the way,\nWhen we reach the preacher I'll say, (with feeling)\nYes Sir, That's my Baby, No, Sir, don't mean \"maybe\",\nYes Sir, That's my Baby now.\nVerse 2: Who's the \"who\" I rave about?\nWho do I feel blue without?\nIn the Winter, Summer, Spring and Fall?\nWhat was I just \"gonna\" say,\nI forget, but anyway,\nHere's the most important thing of all.\nChorus 2: Yes, Sir, That's my Baby, No, Sir, Don't mean \"Maybe\"\nYes, Sir, That's my Baby now.\nWell well, \"lookit\" that baby, Do tell, don't say \"maybe\",\nNell's bells, won't she cause some row.\nPretty soon, Pretty soon,\nWe will hear that Lohengrin tune, (I'm sayin')\nWho for should she be sir, No one else but me sir,\nYes sir, That's my Baby now.", "iKhe__rDx": "Oh, give me a home where the buffalo roam\nWhere the deer and the antelope play\nWhere seldom is heard a discouraging word\nAnd the skies are not cloudy all day\nHome, home on the range\nWhere the deer and the antelope play\nWhere seldom is heard a discouraging word\nAnd the skies are not cloudy all day\nAnd the skies are not cloudy all day", "ikBC75HQJ": "Sul mare luccica l'astro d'argento\nPlacida è l'onda, prospero è il vento\nSul mare luccica l'astro d'argento\nPlacida è l'onda, prospero è il vento\nVenite all'agile barchetta mia\nSanta Lucia, santa Lucia\nVenite all'agile barchetta mia\nSanta Lucia, santa Lucia\nCon questo zeffiro, così soave\nO, com'è bello star sulla nave\nCon questo zeffiro, così soave\nO, com'è bello star sulla nave\nSu passeggeri, venite via\nSanta Lucia, santa Lucia\nSu passeggeri, venite via\nSanta Lucia, santa Lucia\nO dolce Napoli, o suol beato\nOve sorridere volle il creato\nO dolce Napoli, o suol beato\nOve sorridere volle il creato\nTu sei l'impero dell'armonia\nSanta Lucia, santa Lucia\nTu sei l'impero dell'armonia\nSanta Lucia, santa Lucia", "iMbQAOzS9": " 1. Wien diese Stadt da singt ma.\nUnd a klan's Tröpfel trink ma.\nJeder wird fröhlich in  Wien und beim Wein.\nDes woas ma singt traurig zu sein.\n Wien ist a Stadt da küßt mann.\nUnd alle Mädel grüßt mann.\nDa hat das Leben noch wirklich Sinn.\nDenn Wien bleibt Wien.\n\n\n2. Wien diese Stadt da singt ma.\nUnd a klan's Tröpfel trink ma.\nJeder wird fröhlich in Wien und beim Wein.\nDes woas ma singt traurig zu sein.\nWien ist a Stadt da küßt mann.\nUnd alle Mädel grüßt mann.\nDa hat das Leben noch wirklich Sinn.\nDenn Wien bleibt Wien.", "iZMToV3HE": "Du, du, liegst mir am Herzen,\ndu, du, liegst mir im Sinn.\nDu, du, machst mir viel Schmerzen,\nweißt nicht, wie gut ich dir bin.\nDu, du, du, du, du, weißt nicht wie gut ich dir bin!\nSo, so wie ich dich liebe,\nso, so liebe auch mich!\nDie, die zärtlichsten Triebe\nfühl' ich allein nur für dich!\nJa, ja, ja, ja, fühl' ich allein nur für dich!\nDoch, doch darf ich dir trauen,\ndir, dir mit leichtem Sinn?\nDu, du kannst auf mich bauen,\nweißt ja, wie gut ich dir bin.\nJa, ja, ja, ja, weißt ja, wie gut ich dir bin.\nUnd, und wenn in der Ferne\nmir, mir dein Herz erscheint,\ndann, dann wünsch ich so gerne,\ndaß uns die Liebe vereint.\nJa, ja, ja, ja, daß uns die Liebe vereint.", "iJYue4ZbY": "(Verse 1)\n\nMy darling I am dreaming of the days gone by,\nWhen you and I were sweethearts beneath the summer sky;\nYour hair has turned to silver, the gold has faded too;\nBut still I will remember, where I first met you.\n\n(Chorus)\n\nDown by the old mill stream\nWhere I first met you,\nWith your eyes of blue,\nDressed in gingham too,\nIt was there I knew that you loved me true,\nYou were sixteen, my village queen,\nBy the old mill stream.\n\n(Verse 2)\n\nThe old mill wheel is silent and has fallen down,\nThe old oak tree has withered and lies there on the ground;\nWhile you and I are sweethearts the same as days of yore;\nAlthough we've been together, forty years and more.\n\n(Repeat Chorus)", "ilhdnJoWg": "Sing, sing a song\nSing out loud\nSing out strong\nSing of good things not bad\nSing of happy not sad.\nSing, sing a song\nMake it simple to last\nYour whole life long\nDon't worry that it's not\nGood enough for anyone\nElse to hear\nJust sing, sing a song.\nSing, sing a song\nLet the world sing along\nSing of love there could be\nSing for you and for me.\nSing, sing a song\nMake it simple to last\nYour whole life long\nDon't worry that it's not\nGood enough for anyone\nElse to hear\nJust sing, sing a song.", "i-5OMX9zS": "De la Sierra Morena, cielito lindo, vienen bajando\nUn par de ojitos negros, cielito lindo, de contrabando\nDe la Sierra Morena, cielito lindo, vienen bajando\nUn par de ojitos negros, cielito lindo, de contrabando\n\nAy, ay, ay, ay\nCanta y no llores\nPorque cantando se alegran, cielito lindo, los corazones\n\nAy, ay, ay, ay\nCanta y no llores\nPorque cantando se alegran, cielito lindo, los corazones\n\nEse lunar que tienes, cielito lindo, junto a la boca\nNo se lo des a nadie, cielito lindo, que a mí me toca\nEse lunar que tienes, cielito lindo, junto a la boca\nNo se lo des a nadie, cielito lindo, que a mí me toca\n\nAy, ay, ay, ay\nCanta y no llores\nPorque cantando se alegran, cielito lindo, los corazones\n\nAy, ay, ay, ay\nCanta y no llores\nPorque cantando se alegran, cielito lindo, los corazones\n\nSiempre que te enamores\nMira primero, mira primero\nDonde pones los ojos, cielito lindo\nNo llores luego\n\nAy, ay, ay, ay\nCanta y no llores\nPorque cantando se alegran, cielito lindo, los corazones\n\nAy, ay, ay, ay\nCanta y no llores\nPorque cantando se alegran, cielito lindo, los corazones", "iNUw8UcS2": "Mi muñeca me habló\nme dijo cosas\nque no puedo repetir\nporque me habla solo a mí (x2)\n\nMe dijo cosas tan secretas\nque tú no puedes oir\nme confesó algunos pecados\nque prefiero no decir\n\nMe dijo algunas cosas locas\nque no te voy a contar\ntocamos temas muy profundos\nmuy difíciles de hablar\n\nMi muñeca me habló\nme dijo cosas\nque no puedo repetir\nporque me habla solo a mí\n\nSalta a final. \n\nY aunque no creas que ella habla\nde verdad es parlanchina\nse sabe un montón de cuentos\nmuy sucios de la vecina\n\nPone cara de inocente\npero es tan peladora\nmi muñeca sabe todo\nes como una grabadora\n\nTu muñeca te habló\nte dijo cosas que no puedes repetir\nporque te habla sólo a tí\n\nSolo a mí\nSolo a tí", "iZ-aHCx4p": "In the shade of the old apple tree\nWhen the love in your eyes I could see\nWhen the voice that I heard, like the song of the bird\nSeemed to whisper sweet music to me\nI could hear the dull buzz of the bee\nIn the blossoms as you said to me\nWith a heart that is true, I'll be waiting for you\nIn the shade of the old apple tree\nIn the shade of old apple tree\n(Apple tree)\nWhen the love in your eyes I could see\n(I could see)\nMama, when the voice that I heard, like the song of the bird\nSeemed to whisper sweet music to me\n(Music to me)\nI could hear the dull buzz of the bee\n(Buzz of the bee)\nIn the blossoms as you said to me\n(Said to me)\nMama, with a heart that is true, I'll be waiting for you\nYes, shade of the old apple tree", "ipifMod0Z": "Oh, the merry-go-round broke down\nAnd we went round and round\nEach time t'would miss, we'd steal a kiss\nAnd the merry-go-round went\n\"Um-pah-pah, um-pah-pah\nUm-pah! Um-pah! Um-pah-pah-pah!'\nOh, the merry-go-round broke down\nAnd it made the darnedest sound\nThe lights went low, we both said \"Oh!\"\nAnd the merry-go-round went\n\"Um-pah-pah, um-pah-pah\nUm-pah! Um-pah! Um-pah-pah-pah!'\nOh what fun - a wonderful time\nFinding love for only a dime\nOh, the merry-go-round broke down\nBut you don't see me frown\nThings turned out fine and now she's mine\n'Cause the the merry-go-round went\n\"Um-pah-pah, um-pah-pah\nUm-pah! Um-pah! Um-pah-pah-pah!\"\nOh, the merry-go-round broke down\n\nEl sapo no se lava el pie\nno se lava porque no quiere\nel vive en la laguna\ny no se lava el pie porque no quiere. \n", "i-qe6vRCH": "Eres un arco iris de múltiples colores\nTu Valparaíso puerto principal\nTus mujeres son blancas margaritas,\nTodas ellas arrancadas de tu mar\nAl mirarte de Playa Ancha Lindo Puerto\nAllí se ven las naves al salir y al entrar\nEl marino te canta esta canción,\nYo sin ti no vivo puerto de mi amor\nDel Cerro a los placeres yo me pasé al barón\nMe vine a Cordillera en busca de tu amor\nTe fuiste al cerro alegre y yo siempre detrás\nPorteña buena moza no me hagas sufrir más\nLa plaza de la Victoria es un centro social\nAvenida Pedro Mont como tú no hay otra igual\nMas yo quisiera cantarte con todito el corazón\nTorpedera de mi ensueño Valparaíso de mi amor\nEn mis primeros años yo quise descubrir\nLa historia de tus cerros jugando al volantín\nComo las mariposas, que vuelan entre las rosas\nYo recorrí tus cerros hasta el último confín\nYo me alejé de ti, puerto querido\nY al retornar de nuevo, te vuelvo a contemplar\nLa joya del Pacífico te llaman los marinos\nY yo te llamo encanto como Viña del Mar\nDel Cerro a los placeres yo me pasé al barón\nMe vine a Cordillera en busca de tu amor\nTe fuiste al cerro alegre y yo siempre detrás\nPorteña buena moza no me hagas sufrir más\nLa plaza de la Victoria es un centro social\nAvenida Pedro Mont como tú no hay otra igual\nMas yo quisiera cantarte con todito el corazón\nTorpedera de mi ensueño Valparaíso de mi amor\nCon todo mi corazón (hasta el último confín)\nCon todo mi corazón (yo te vuelvo a contemplar)\nCon todo mi corazón (Valparaíso de mi amor)\nCon todo mi corazón (como tú no hay otra igual)\nCon todo mi corazón (Valparaíso de mi amor)\nCon todo mi corazón (Valparaíso de mi amor)\nCon todo mi corazón\nCon todo mi corazón", "iieavcdXn": "Hände\nFüsse\nHaare\npopo", "i7bJ9QnPU": "Die Gedanken sind frei,\nwer kann sie erraten,\nsie fliehen vorbei,\nwie nächtliche Schatten.\nKein Mensch kann sie wissen,\nkein Jäger erschießen.\nEs bleibet dabei:\nDie Gedanken sind frei.\nIch denke, was ich will,\nund was mich beglücket,\ndoch alles in der Still,\nund wie es sich schicket.\nMein Wunsch und Begehren\nkann niemand verwehren,\nes bleibet dabei:\ndie Gedanken sind frei.\n\nIch liebe den Wein,\nmein Mädchen vor allen,\nsie tut mir allein\nam besten gefallen.\nIch bin nicht alleine\nbei meinem Glas Weine,\nmein Mädchen dabei:\ndie Gedanken sind frei.\n\nUnd sperrt man mich ein\nim finsteren Kerker,\ndas alles sind rein\nvergebliche Werke;\ndenn meine Gedanken\nzerreißen die Schranken\nund Mauern entzwei:\ndie Gedanken sind frei.\nDrum will ich auf immer\nden Sorgen entsagen\nund will mich auch nimmer\nmit Grillen mehr plagen.\nMan kann ja im Herzen\nstets lachen und scherzen\nund denken dabei:\ndie Gedanken sind frei. \n", "iSksgfT8e": "Bei der Kaserne\nVor dem grossen Tor\nSteht ′ne Laterne\nUnd steht sie noch davor\nDa wollen wir uns wiedersehen\nBei der Laterne wollen wir stehen\nWie einst Lili Marlen\nWie einst Lili Marlen\n\nUnsere beiden Schatten\nSah'n wie einer aus\nDass wir lieb uns hatten\nDass sah man gleich daraus\nUnd alle Leute sollen es sehen\nWenn wir bei der Laterne steh′n\nWie einst Lili Marlen\nWie einst Lili Marlen\n\n\nDeine Schritte kennt sie\nDeinen schoenen Gang\nAlle Abend brennt sie\nDoch mich vergass sie lang\nUnd sollte mir ein leids geschehen\nWer wird bei der Laterne stehen\nMit dir Lili Marlen?\nMit dir Lili Marlen?\n\nAus dem tiefen Raume\nAus der Erde Grund\nHebt sich wie im Traume\nDein verliebter Mund\nWenn sich die spaeten Nebel dreh'n\nWer wird bei der Laterne stehen\nMit dir Lili Marlen\nMit dir Lili Marlen\n\nWenn sich die spaeten Nebel dreh'n\nWer wird bei der Laterne stehen\nMit dir Lili Marlen\nMit dir Lili Marlen.", "iCY86s-0t": "Häschen in der Grube\nSitzt und schläft\nSitzt und schläft\nArmes Häschen, bist du krank\nDass du nicht mehr hüpfen kannst?\nHäschen hüpf! Häschen hüpf!\nHäschen hüpf!\n\nHäschen in der Grube\nNickt und weint\nNickt und weint\nDoktor kommt geschwind herbei\nUnd verschreibt ihm Arzenei\nHäschen schluck! Häschen schluck!\nHäschen schluck!\n\nHäschen in der Grube\nHüpft und springt\nHüpft und springt\nHäschen, bist du schon kuriert?\nHey, das hüpft und galoppiert!\nHäschen hopp! Häschen hopp!\nHäschen hopp", "iHcESdiaL": "I'm gonna sit right down and write myself a letter\nAnd make believe it came from you\nI'm gonna write words, oh, so sweet\nThey're gonna knock me off my feet\nKisses on the bottom\nI'll be glad I've got 'em\nI'm gonna smile and say \"I hope you're feelin' better\"\nAnd sign \"with love\" the way you do\nI'm gonna sit right down and write myself a letter\nAnd make believe it came from you\nI'm gonna sit right down and write myself a letter\nAnd make believe it came from you\nI'm gonna write words, oh, so sweet\nThey're gonna knock me off my feet\nKisses on the bottom\nI'll be glad I've got 'em\nI'm gonna smile and say \"I hope you're feelin' better\"\nAnd sign \"with love\" the way you do\nI'm gonna sit right down, write myself a letter\nAnd make believe it came from you\nAnd make believe it came from you.", "i04gqb0As": "Ich weiß nicht, was soll es bedeuten\nDass ich so traurig bin\nEin Märchen aus uralten Zeiten\nDas kommt mir nicht aus dem Sinn\nDie Luft ist so kühl und es dunkelt\nUnd ruhig fließt der Rhein\nDer Gipfel des Berges funkelt\nIm Abendsonnenschein\nDie schönste Jungfrau sitzet\nDort oben wunderbar\nIhr goldnes Geschmeide blitzet\nSie kämmt ihr goldenes Haar\nSie kämmt es mit goldenem Kamme\nUnd singt ein Lied dabei\nDas hat eine wundersame\nGewaltige Melodei\nDen Schiffer, im kleinen Schiffe\nErgreift es mit wildem Weh\nEr schaut nicht die Felsenriffe\nEr schaut nur hinauf in die Höh\nIch glaube, die Wellen verschlingen\nAm Ende noch Schiffer und Kahn\nUnd das hat mit ihrem Singen\nDie Loreley getan", "iHDfv1Hoq": "Ah, look at all the lonely people\nAh, look at all the lonely people\nEleanor Rigby\nPicks up the rice in the church\nWhere the wedding has been lives in a dream\nWait's at the window\nWearing the face that she keeps in\nA jar by the door who is it for?\nAll the lonely people\nWhere do they all come from?\nAll the lonely people\nWhere do they all belong?\nFather Mackenziе\nWriting the words of a sermon\nThat no one will hеar no one comes near\nLook at him working\nDarning his socks in the night\nWhen there's nobody there what does he care?\nAll the lonely people\nWhere do they all come from?\nAll the lonely people\nWhere do they all belong?\nAll the lonely people (All the lonely people)\nAll the lonely people (All the lonely people)\nAll the lonely people (All the lonely people)\nEleanor Rigby died in the church and was\nBuried along with her name nobody came\nFather Mackenzie\nWiping the dirt from his hands as\nHe walks from the grave no one was saved\nAll the lonely people all the lonely people", "im99w4_wC": "Tu me fais tourner la tête\nMon manège à moi c'est toi\nJe suis toujours à la fête\nQuand tu me tiens dans tes bras\nJe ferais le tour du monde\nÇa ne tourn'rait pas plus qu'ça\nLa Terre n'est pas assez ronde\nPour m'étourdir autant qu'toi\nQu'est-ce qu'on est bien tous les deux\nQuand on est ensembl' nous deux\nQuelle vie on a tous les deux\nQuand on s'aime comme nous deux\nOn pourrait changer d'planète\nTant qu'j'ai mon cœur près du tien\nJ'entends les flonflons de la fête\nEt la terre n'y est pour rien\nAh oui, parlons-en de la terre\nPour qui elle se prend, la terre?\nMa parole y a qu'elle sur Terre\nY a qu'elle pour faire tant de mystères\nMais pour nous il y a pas de problèmes\nCar c'est pour la vie qu'on s'aime\nEt s'il y avait pas d'vie même\nNous on s'aimerait quand même\nCar\nTu me fais tourner la tête\nMon manège à moi c'est toi\nJe suis toujours à la fête\nQuand tu me tiens dans tes bras\nJe ferais le tour du monde\nÇa ne tourn'rait pas plus qu'ça\nLa Terre n'est pas assez ronde\nPour m'étourdir autant qu'toi\nJe ferais le tour du monde\nÇa ne tourn'rait pas plus qu'ça\nLa Terre n'est pas assez ronde\nMon manège à moi c'est toi!", "iDIzetOAm": "Pasa loco de contento con su cargamento\nPara la ciudad, para la ciudad\nLleva en su pensamiento todo un mundo\nLleno de felicidad, de felicidad\nPiensa remedíar la situación\nDel hogar que es toda su ilusión si\n\nY alegre, el jibarito va pensando así\nDiciendo así, cantando así por el camino:\n\"Si yo vendo la carga, mi dios querido\nUn traje a mi viejita voy a comprar\"\n\nY alegre, también su yegua va\nAl presentir que su cantar\nEs todo un himno de alegría\nEn eso lo sorprende la luz del día\nAl llegar al mercado de la ciudad\n\nPasa la mañana entera sin que nadie quiera\nSu carga comprar ahí, su carga comprar\nTodo, todo esta desierto, y el pueblo esta lleno\nDe necesidad ahí, de necesidad\nSe oyen los lamentos por doquier\nDe su desdichada Borinquen si\nY triste, el jibarito va pensando así\nDiciendo así, llorando así por el camino\n\"Qué sera de Borinquen mi dios querido\nQue sera de mis hijos y de mi hogar\"\nBorinquen, la tierra del Eden\nLa que al cantar, el gran Gautier\nLlamo la perla de los mares\nAhora que tu te encuentras con tus pesares\nDéjame que le cante yo también, yo también", "i_q3zf9RJ": "Man word oll un gries, avver nich klook un wies. \nAs ik noch en lütt Jung weer, hett mien Grootmoder mit mi Platt snackt.\nVondaag schöölt wi darüm en oolt Leed singen, över hunnerd föfftig Jahr oolt:\nDat du meen leevsten büst\nDenn man tau.\n\nDat du min Leevsten büst, dat du woll weeßt.\nKumm bi de Nacht, kumm bi de Nacht, segg wo du heeßt;\nkumm bi de Nacht, kumm bi de Nacht, segg wo du heeßt.\n\nKumm du üm Middernacht, kumm du Klock een!\nVader slöpt, Moder slöpt, ick slap aleen;\nVader slöpt, Moder slöpt, ick slap aleen.\n\nKlopp an de Kammerdör, fat an de Klink!\nVader meent, Moder meent, dat deit de Wind;\nVader meent, Moder meent, dat deit de Wind.\n\n\nKummt denn de Morgenstund, kreiht de ol Hahn.\nLeevster min Leevster min, denn mößt du gahn!\nLeevster min Leevster min, denn mößt du gahn!\n", "iJYeQU82A": "Do you know the way to San Jose?\nI've been away so long\nI may go wrong and lose my way\nDo you know the way to San Jose?\nI'm going back to find some peace of mind in San Jose\nLA is a great big freeway\nPut a hundred down and buy a car\nIn a week, maybe two, they'll make you a star\nWeeks turn into years, how quick they pass\nAnd all the stars that never were\nAre parking cars and pumping gas\nYou can really breathe in San Jose\nThey've got a lot of space\nThere'll be a place where I can stay\nI was born and raised in San Jose\nI'm going back to find some peace of mind in San Jose\nFame and fortune is a magnet\nIt can pull you far away from home\nWith a dream in your heart you're never alone\nDreams turn into dust and blow away\nAnd there you are without a friend\nYou park your car and ride away\nI've got lots of friends in San Jose\nDo you know the way to San Jose?\nOh, LA is a great big freeway\nPut a hundred down and buy a car\nIn a week, maybe two, they'll make you a star\nWeeks turn into years, how quick they pass\nAnd all the stars that never were\nAre parking cars and pumping gas\nI've got lots of friends in San Jose\nOh, do you know the way to San Jose?\nCan't wait to get back to San Jose", "iMy971mp5": "Ich bin schon/seit Tagen\nVerliebt in Rosamunde\nIch denke jede Stunde\nSie muss es/erfahren\nSeh' ich ih/re Lippen\nMit dem frohen Lachen\nMöcht' ich alles machen\nUm sie mal zu küssen\n\nAber heut' bestimmt, geh ich zu ihr (la la la la)\nGründe hab ich ja genug dafür (la la la la)\nIch trete einfach vor sie hin\nUnd sag ihr, wie verliebt ich bin\nSagt sie dann noch nein, ist mir's egal (la la la la)\nDenn ich wart nicht auf ein ander' mal (la la la la)\nIch nehm sie einfach in den Arm\nUnd sage ihr mit meinem Charme\n\nRosamunde, schenk mir dein Herz und sag ja\nRosamunde, frag doch nicht erst die Mama\nRosamunde, glaub mir, auch ich bin dir treu\nDenn zur Stunde, Rosamunde\nIst mein Herz gerade noch frei\n\nSie lässt mich/noch warten\nUnd lächelt nur von ferne\nIch wüsste nur zu gerne\nWie andere es machten\nVerborgen/ als Veilchen\nLeb' ich in ihrer Nähe\nDoch wenn ich sie sehe\nWart' ich noch ein Weilchen\n\nAber heut' bestimmt, geh ich zu ihr (la la la la)\nGründe hab ich ja genug dafür (la la la la)\nIch trete einfach vor sie hin\nUnd sag ihr, wie verliebt ich bin\nSagt sie dann noch nein, ist mir's egal (la la la la)\nDenn ich wart nicht auf ein ander' mal (la la la la)\n\nIch nehm sie einfach in den Arm\nUnd sage ihr mit meinem Charme\nRosamunde, schenk mir dein Herz und sag ja\nRosamunde, frag doch nicht erst die Mama\nRosamunde, glaub mir, auch ich bin dir treu\nDenn zur Stunde, Rosamunde\nIst mein Herz gerade noch frei\n\nRosamunde, schenk mir dein Herz und sag ja\nRosamunde, frag doch nicht erst die Mama\nRosamunde, glaub mir, auch ich bin dir treu\nDenn zur Stunde, Rosamunde\nIst mein Herz gerade noch frei", "iknYMista": "Un día de San Eugenio\nYendo hacia el Pardo, le conoció\nEra el torero de más tronío\nY el más castizo de to Madrid\nIba en calesa\nPidiendo guerra\nY ella al mirarle\nSe estremeció\nY el al notarlo bajó del coche\nY muy garboso se vino a ella\nTiró la capa con gesto altivo\nY descubriéndose, le dijo así\n\n\"Pisa morena\nPisa con garbo\nQue un relicario\nQue un relicario me voy a hacer\nCon el trocito de mi capote\nQue haya pisado\nQue haya pisado tan lindo pie\"\n\nUn lunes abrileño\nÉl toreaba y a verle fue\nNunca lo hiciera\nQue aquella tarde\nDe sentimiento creyó morir\nAl dar un lance\nCayó en la arena\nSe sintió herido\nMiró hacia ella\nY un relicario\nSacó del pecho\nQue ella enseguida reconoció\nCuando el torero\nCaía inerte\nEn su delirio\nDecía así\n\n\"Pisa morena\nPisa con garbo\nQue un relicario\nQue un relicario me voy a hacer\nCon el trocito de mi capote\nQue haya pisado\nQue haya pisado tan lindo pie\"\n", "itLjyLihg": " Pirihuei, Pirihueico Panguipulli\nAllá va, allá va, allá viene, Calafquén también Riñihue (x2)\nSon lagos, son lagos no menos bellos\nAllá va, allá va, allá viene, como el gran lago Llanquihue\nAllá va, allá va, allá viene, Pirihueico Panguipulli.\n\nEl Todos los Santos tiene\nAllá va, verde esperanza\nEl que bebe de sus aguas\nAllá va todo lo alcanza.\nAllá va, allá va, allá viene\nAllá va verde esperanza.\n\nTodo lo alcanza, ay sí\nAllá va el lago Rupanco\nQue está cerca del Puyehue\nAllá va lejos del Ranco.\n\nEl lago Villarrica\nAllá va cosa más rica, ay, mamá. "}
}
async function demo_organtuner_json(){
    return [{"midi_number": 53, "ampdb": -2.234181, "amplist": [21.91025, 12.32274], "centslist": [-9.519940399505522, -6.833307191263827], "name": "F3(53)", "pinname": "gpio.6 bass", "frequency": 174.6, "amplistdb": [-0.08953297, -5.088329], "cents": -8.176623795384675}, {"midi_number": 58, "ampdb": -5.451441, "amplist": [9.141965, 16.22913, 10.08355], "centslist": [4.807522892845252, 4.911153879924959, -2.018967165714563], "name": "Bb3(58)", "pinname": "gpio.7 bass", "frequency": 233.1, "amplistdb": [-7.681687, -2.696575, -6.830206], "cents": 2.5665698690185494}, {"midi_number": 60, "ampdb": -6.228726, "amplist": [7.699389, 13.06796, 11.65234], "centslist": [-11.363477721187916, -6.883251192994779, -10.026282034795114], "name": "C4(60)", "pinname": "gpio.15 bass", "frequency": 261.6, "amplistdb": [-9.173354, -4.578321, -5.574216], "cents": -9.424336982992605}, {"midi_number": 62, "ampdb": -2.93495, "amplist": [9.303156, 16.18934, 21.87688], "centslist": [0.5766231475164227, -2.8614314514111907, 6.9536574202468096], "name": "D4(62)", "pinname": "gpio.16 accomp", "frequency": 293.7, "amplistdb": [-7.529872, -2.717894, -0.1027718], "cents": 1.5562830387840139}, {"midi_number": 63, "ampdb": -5.26268, "amplist": [12.40581, 9.206687, 14.62107], "centslist": [8.437052580079502, -0.8174256904880428, -2.4868142070289543], "name": "Eb4(63)", "pinname": "gpio.17 accomp", "frequency": 311.1, "amplistdb": [-5.029974, -7.620411, -3.602893], "cents": 1.7109375608541686}, {"midi_number": 64, "ampdb": -4.719109, "amplist": [11.98752, 18.92869, 7.657353], "centslist": [7.731685908401117, 4.902863793868493, -4.656706937074786], "name": "E4(64)", "pinname": "gpio.18 accomp", "frequency": 329.6, "amplistdb": [-5.327892, -1.360067, -9.220905], "cents": 2.659280921731608}, {"midi_number": 65, "ampdb": -4.805161, "amplist": [13.21464, 14.41526, 10.56339], "centslist": [2.5951008134687923, 4.392084969597987, -3.0908599794738345], "name": "F4(65)", "pinname": "gpio.8 accomp", "frequency": 349.2, "amplistdb": [-4.48137, -3.726029, -6.426409], "cents": 1.298775267864315}, {"midi_number": 67, "ampdb": -5.236732, "amplist": [8.472091, 15.75589], "centslist": [28.164819357894572, 16.470790459604643], "name": "G4(67)", "pinname": "gpio.9 accomp", "frequency": 392.0, "amplistdb": [-8.342667, -2.953617], "cents": 22.317804908749608}, {"midi_number": 69, "ampdb": -2.919081, "amplist": [19.87902, 11.17028, 16.40669], "centslist": [-3.5956637182793854, 0.29380690006504173, 1.2383636164712901], "name": "A4(69)", "pinname": "gpio.10 accomp", "frequency": 440.0, "amplistdb": [-0.9345771, -5.941195, -2.602058], "cents": -0.6878310672476845}, {"midi_number": 70, "ampdb": -4.645781, "amplist": [18.3905, 7.543221], "centslist": [-26.891419729737567, 7.906594472485635], "name": "Bb4(70)", "pinname": "gpio.11 melody", "frequency": 466.2, "amplistdb": [-1.610606, -9.351341], "cents": -9.492412628625967}, {"midi_number": 72, "ampdb": -1.878331, "amplist": [19.38903, 12.90832, 21.19955], "centslist": [-3.438128484848926, -23.14757859246509, 13.158931931985283], "name": "C5(72)", "pinname": "gpio.12 melody", "frequency": 523.3, "amplistdb": [-1.151356, -4.685081, -0.375947], "cents": -4.475591715109579}, {"midi_number": 74, "ampdb": -3.796632, "amplist": [14.29856], "centslist": [-3.7378816730905804], "name": "D5(74)", "pinname": "gpio.13 melody", "frequency": 587.3, "amplistdb": [-3.796632], "cents": -3.7378816730905804}, {"midi_number": 75, "ampdb": -4.660477, "amplist": [16.95315, 15.29587, 11.44413, 8.086621], "centslist": [-7.786217036695776, -6.024845373321032, -4.366760927076077, -21.6778741992315], "name": "Eb5(75)", "pinname": "gpio.14 melody", "frequency": 622.3, "amplistdb": [-2.317472, -3.210995, -5.730823, -8.747137], "cents": -9.963924384081096}, {"midi_number": 76, "ampdb": -4.105368, "amplist": [17.76862, 14.32531, 9.303822], "centslist": [-9.765103766588087, 2.750562666026939, -11.982550681440706], "name": "E5(76)", "pinname": "gpio.1 melody", "frequency": 659.3, "amplistdb": [-1.909404, -3.780399, -7.52925], "cents": -6.332363927333951}, {"midi_number": 77, "ampdb": -5.835862, "amplist": [9.655732, 14.7205, 10.49136, 10.35868], "centslist": [-2.2001553855100995, 21.285926123704336, -19.023921072362235, -2.537758144676055], "name": "F5(77)", "pinname": "gpio.42 melody", "frequency": 698.5, "amplistdb": [-7.206774, -3.544029, -6.485841, -6.596391], "cents": -0.6189771197110138}, {"midi_number": 79, "ampdb": -5.715511, "amplist": [16.52352, 9.326788, 8.542662], "centslist": [-0.29103609153818866, 16.18624744416239, 14.094952875596455], "name": "G5(79)", "pinname": "gpio.41 melody", "frequency": 784.0, "amplistdb": [-2.540428, -7.507836, -8.270615], "cents": 9.996721409406886}, {"midi_number": 81, "ampdb": -3.753245, "amplist": [11.35959, 19.1818, 17.32752, 14.58393, 9.397964], "centslist": [7.985974071504582, 4.606035952907606, 6.886588857964245, 6.146310713633444, 15.766077529934844], "name": "A5(81)", "pinname": "gpio.40 melody", "frequency": 880.0, "amplistdb": [-5.795227, -1.24469, -2.127749, -3.624984, -7.441803], "cents": 8.278197425188944}, {"midi_number": 82, "ampdb": -4.564897, "amplist": [14.72248, 8.378393, 15.29388, 13.95794], "centslist": [25.6433158030113, -2.6963126378256486, -10.902535270362339, -13.686061591433326], "name": "Bb5(82)", "pinname": "gpio.39 melody", "frequency": 932.3, "amplistdb": [-3.542859, -8.439263, -3.212125, -4.006048], "cents": -0.41039842415250316}, {"midi_number": 84, "ampdb": -4.774168, "amplist": [18.56672, 10.7185, 7.300296, 16.42632, 10.87119], "centslist": [-10.360494353713612, -8.573083041135472, -9.257373424707769, 9.242693786190127, -2.8196538576809678], "name": "C6(84)", "pinname": "gpio.47 melody", "frequency": 1046.5, "amplistdb": [-1.527772, -6.2998, -9.635669, -2.591672, -6.176932], "cents": -4.353582178209539}, {"midi_number": 86, "ampdb": -2.804496, "amplist": [10.84734, 21.81764, 17.64213, 12.76697, 10.96104, 22.13726], "centslist": [3.7752195551500574, -4.6891168464479795, -2.9730858791072112, -10.99401033173116, -6.060420217611692, 6.381370171818335], "name": "D6(86)", "pinname": "gpio.21 melody", "frequency": 1174.7, "amplistdb": [-6.196012, -0.1263234, -1.971458, -4.780721, -6.105443, 0.0], "cents": -2.4266739246549416}]
}
async function demo_tunelib_json(){
    TUNELIB = {"iU-EcW9FT": ["iU-EcW9FT", "Las mananitas tapaties", "song, México", "trad", "", 61946, "Las mananitas tapaties.mid", true, "", "2024-06-01", "", 2544, 0, false], 
 "i9oQcMFpz": ["i9oQcMFpz", "Die Mühle im Schwarzwald, Op 52", "march", "Richard Eilenberg", "1885", 198727, "20_muhle im schwarzwald.mid", true, "", "2023-12-30", "***", 17665, 3, false], 
 "iy8X66_Eg": ["iy8X66_Eg", "Donde estas Yolanda", "bolero", "", "", 199409, "Donde estas Yolanda.mid", true, "", "2024-09-11", "***", 52165, 13, false],  
 "iYgKrXS6H": ["iYgKrXS6H", "Spinach Rag", "games, ragtime", "Nobuo Uematsu", "1990", 129950, "spinachrag-ff6.mid", true, "", "2023-10-20", "", 10175, 3, ""], 
 "iT7STPh0R": ["iT7STPh0R", "Auld Long Syne", "song", "trad/Robert Burns", "1788", 111072, "W150-Auld_Lang_Syne-13107-03.mid", false, "", "2024-08-26", "*", 14501, 4, ""], 
 "iCehQeUiZ": ["iCehQeUiZ", "La valse d'Amelie", "waltz", "", "", 65306, "La valse d'Amelie.mid", false, "", "2024-09-07", "*", 4883, 7, ""], 
 "igJfXzXES": ["igJfXzXES", "Eine Schwarzwaldfahrt", "easy listening, Germany", "H. Jankowsky", "1965", 104155, "A Walk In The Black Forest 2.mid", true, "", "2023-10-20", "***", 8752, 3, ""], 
 "iNUw8UcS2": ["iNUw8UcS2", "Mi muñeca me habló", "kids, song", "Flor Bovina, 31 minutos", "2003", 102868, "Mi muneca me hablo.mid", true, "", "2024-04-23", "***", 22173, 10, true], 
 "iKF9YWudg": ["iKF9YWudg", "Finkenwalzer", "waltz, Germany", " Willibald Quanz", "19xx", 161058, "20_finkenwalzer.mid", true, "", "2023-12-30", "", 13377, 0, ""], 
 "i89gRTOE9": ["i89gRTOE9", "Millicent Waltz", "waltz", "", "", 173424, "W150-Millicent_Waltz-13173-6.mid", true, "", "2024-08-04", "", 18144, 0, ""], 
 "ieITIdKC1": ["ieITIdKC1", "Wedding Of The Winds Waltz", "vals", "John T Hall", "1915", 211572, "W150 Wedding Of The Winds Waltz - 3151-03.mid", true, "This is an old and beautiful tune from over 100 years ago.", "2024-09-14", "***", 31196, 0, ""],  
 "iXmPmbVql": ["iXmPmbVql", "Por una cabeza", "tango", "C. Gardel", "1935", 128586, "por-una-cabeza-piano-solo_gw.mid", false, "", "2023-12-30", "*", 6045, 3, ""], 
 
"isVZZCtdA": ["isVZZCtdA", "Puppet On A String", "song ", "Bill Murray, Phil Coultier", "1967", 116862, "Puppet-On-A-String-Didier--29  orgue bernard.mid", true, "", "2024-06-29", "***", 8879, 3, ""],
 
 "iSjAUw0-i": ["iSjAUw0-i", "King Porter Stomp", "jazz", "Jelly Roll Morton", "1905", 150674, "morton_9595s_king_porter_stomp_(1924)_(nc)smythe.mid", true, "", "2023-10-26", "", 12681, 4, ""], 
 
"ieUWa_EVw": ["ieUWa_EVw", "Donauwalzer", "waltz", "", "", 399882, "W125 Roll Scans On The Beautiful Blue Danube - 3151-01.mid", true, "", "2024-08-06", "***", 34224, 1, ""], 
 
 "iY5da1-n5": ["iY5da1-n5", "Kleine Nachtmusik - Minuett", "classic ", "W. A. Mozart", "", 151350, "mozart menuet-29 orgue bernard.mid", true, "", "2024-06-29", "", 16337, 1, ""], 
 
 "iMy971mp5": ["iMy971mp5", "Barrilito/Rosamunde", "polka", "", "", 141005, "W150-Beer_Barrel_Polka-14300-03.mid", true, "Beer Barrel Polka, Barrilito de cerveza, Rosamunde depending on country", "2024-08-04", "", 20611, 1, true], 
 
 "iakAW3kEW": ["iakAW3kEW", "Baruska Polka", "polka", "", "", 174295, "W150-Baruska_Polka-14300-09.mid", true, "", "2024-08-04", "", 18704, 1, ""],
 "i19PhCiPa": ["i19PhCiPa", "Flötenuhr Hob. 19 12", "classic ", "Joseph Haydn", "1703", 84037, "IMSLP282751-PMLP81899-Haydn_Flotenuhr_Hob_19_12.mid", true, "", "2024-09-18", "***", 7396, 1, ""],
 
 "iknYMista": ["iknYMista", "El Relicario", "paso doble, Spain", "José Padilla", "1914", 308276, "El Relicario Eb v5.mid", true, "", "2024-06-01", "", 32087, 0, true],
 
 "ipifMod0Z": ["ipifMod0Z", "The Merry Go Round Broke Down", "song", "", "", 251611, "20-The_Merry_Go_Round_Broke_Down.MID", true, "", "2023-11-01", "***", 26050, 6, true]
}
    return TUNELIB;
}
demo_tunelib_json();

async function demo_20_note(){
    return [
["description", "20 note Carl Frei scale. GPIO pins only."],
["neopixel", 48],
["microphone", ""],
["tachometer", "", ""],
["touchpad", 5],
["tempo", "", "", ""],

["gpio"],
    ["midi",  6, "", 53, "bass"],
    ["midi",  7, "", 58, "bass"],
    ["midi", 15, "", 60, "bass"],
    ["midi", 16, "", 62, "accomp"],
    ["midi", 17, "", 63, "accomp"],
    ["midi", 18, "", 64, "accomp"],
    ["midi",  8, "", 65, "accomp"],
    ["midi",  9, "", 67, "accomp"],
    ["midi", 10, "", 69, "accomp"],
    ["midi", 11, "", 70, "melody"],
    ["midi", 12, "", 72, "melody"],
    ["midi", 13, "", 74, "melody"],
    ["midi", 14, "", 75, "melody"],
    ["midi",  1, "", 76, "melody"],
    ["midi", 42, "", 77, "melody"],
    ["midi", 41, "", 79, "melody"],
    ["midi", 40, "", 81, "melody"],
    ["midi", 39, "", 82, "melody"],
    ["midi", 47, "", 84, "melody"],
    ["midi", 21, "", 86, "melody"]
]
}
async function demo_get_tuning_stats() {
    return {
        tuned_ok: 15,
        tuned_not_ok: 5,
        not_tested: 0,
        pins: 20,
        avg_frequency: 441.2,
        tuning_frequency: 440,
        tuning_cents: 0,
    };
}

async function demo_get_organtuner_json() {
    return await demo_organtuner_json();
}

async function demo_battery() {
    return {
        operating_seconds: 7230,
        playing_seconds: 3290,
        solenoid_on_seconds: 10340,
        tunes_played: 14,
        date_zero: "2024-09-15 10:33",
        remaining_seconds: null,
        percent_remaining: null,
        tunes_remaining: null,
        low: null
    };
}

async function demo_queue_tune(req) {
    const setlist = getState("CURRENT_SETLIST", []);
    const tuneid = req.tuneid;
    const index = setlist.indexOf(tuneid);

    if (index > -1) {
        setlist.splice(index, 1);
    } else {
        setlist.push(tuneid);
    }

    setState("CURRENT_SETLIST", setlist);
    return await demo_get_progress();
}

async function demo_up_setlist(params) {
    const setlist = getState("CURRENT_SETLIST", []);
    const pos = setlist.indexOf(params.tuneid);
    if (pos > 0) {
        const item = setlist.splice(pos, 1)[0];
        setlist.splice(pos - 1, 0, item);
        setState("CURRENT_SETLIST", setlist);
    }
    return await demo_get_progress();
}

async function demo_down_setlist(params) {
    const setlist = getState("CURRENT_SETLIST", []);
    const pos = setlist.indexOf(params.tuneid);
    if (pos > -1 && pos < setlist.length - 1) {
        const item = setlist.splice(pos, 1)[0];
        setlist.splice(pos + 1, 0, item);
        setState("CURRENT_SETLIST", setlist);
    }
    return await demo_get_progress();
}

async function demo_top_setlist(params) {
    const setlist = getState("CURRENT_SETLIST", []);
    const pos = setlist.indexOf(params.tuneid);
    if (pos > -1) {
        const item = setlist.splice(pos, 1)[0];
        setlist.unshift(item);
        setState("CURRENT_SETLIST", setlist);
    }
    return await demo_get_progress();
}

async function demo_bottom_setlist(params) {
    const setlist = getState("CURRENT_SETLIST", []);
    const pos = setlist.indexOf(params.tuneid);
    if (pos > -1) {
        const item = setlist.splice(pos, 1)[0];
        setlist.push(item);
        setState("CURRENT_SETLIST", setlist);
    }
    return await demo_get_progress();
}

async function demo_drop_setlist(params) {
    const setlist = getState("CURRENT_SETLIST", []);
    const pos = setlist.indexOf(params.tuneid);
    if (pos > -1) {
        setlist.splice(pos, 1);
        setState("CURRENT_SETLIST", setlist);
    }
    return await demo_get_progress();
}

async function demo_save_setlist() {
    const current = getState("CURRENT_SETLIST", []);
    setState("SAVED_SETLIST", current);
    return await demo_get_progress();
}

async function demo_load_setlist() {
    const saved = getState("SAVED_SETLIST", []);
    setState("CURRENT_SETLIST", saved);
    return await demo_get_progress();
}

async function demo_start_tune() {
    const setlist = getState("CURRENT_SETLIST", []);
    const progress = getState("CURRENT_PROGRESS", {});

    if (setlist.length > 0 && progress.status === "waiting") {
        progress.playtime = 0;
        setState("START_TIME", Date.now() / 1000);
        progress.status = "playing";
        progress.tune = setlist.shift();

        setState("CURRENT_SETLIST", setlist);
        setState("CURRENT_PROGRESS", progress);
    }
    return await demo_get_progress();
}

async function add_to_history(tuneid) {
    const startTime = getState("START_TIME", -1);
    if (!tuneid || startTime < 0) return;

    const tuneDuration = TUNELIB[tuneid] ? TUNELIB[tuneid][TLCOL_TIME] : 0;
    let percent = 0;

    if (tuneDuration > 0) {
        percent = ((Date.now() / 1000 - startTime) * 1000 / tuneDuration) * 100;
        percent = Math.max(Math.min(percent, 100), 0);
    }

    let history = getState("HISTORY_LOG", []);
    history.push([tuneid, Math.round(startTime - 946684800), Math.round(percent), false]);
    setState("HISTORY_LOG", history);
}

async function demo_stop_tune_setlist() {
    const setlist = getState("CURRENT_SETLIST", []);
    const progress = getState("CURRENT_PROGRESS", {});

    if (progress.status === "waiting" && setlist.length > 0) {
        setlist.shift();
        setState("CURRENT_SETLIST", setlist);
    }
    if (progress.status === "playing") {
        await add_to_history(progress.tune);
    }

    progress.status = "waiting";
    progress.playtime = -1;
    progress.tune = null;
    setState("CURRENT_PROGRESS", progress);

    return await demo_get_progress();
}

async function demo_back_setlist() {
    const setlist = getState("CURRENT_SETLIST", []);
    const progress = getState("CURRENT_PROGRESS", {});

    if (progress.tune && !setlist.includes(progress.tune)) {
        setlist.unshift(progress.tune);
        progress.status = "waiting";
        progress.playtime = -1;

        setState("CURRENT_SETLIST", setlist);
        setState("CURRENT_PROGRESS", progress);
    }
    return await demo_get_progress();
}

async function demo_clear_setlist() {
    setState("CURRENT_SETLIST", []);
    return await demo_get_progress();
}

async function demo_shuffle_set_list() {
    const setlist = getState("CURRENT_SETLIST", []);
    setlist.sort(() => Math.random() - 0.5);
    setState("CURRENT_SETLIST", setlist);
    return await demo_get_progress();
}

async function demo_shuffle_all_tunes() {
    const setlist = Object.keys(TUNELIB);
    setlist.sort(() => Math.random() - 0.5);
    setState("CURRENT_SETLIST", setlist);
    return await demo_get_progress();
}

async function demo_shuffle_3stars() {
    const setlist = [];
    for (const [tuneid, tune] of Object.entries(TUNELIB)) {
        if (tune[10] && tune[10].includes("***")) {
            setlist.push(tuneid);
        }
    }
    setlist.sort(() => Math.random() - 0.5);
    setState("CURRENT_SETLIST", setlist);
    return await demo_get_progress();
}

async function demo_get_progress() {
    const progress = getState("CURRENT_PROGRESS", {});
    const setlist = getState("CURRENT_SETLIST", []);
    const startTime = getState("START_TIME", -1);
    const velocity = getState("CURRENT_VELOCITY", 50);

    if (progress.status === "playing") {
        const tuneid = progress.tune;
        if (tuneid && TUNELIB[tuneid]) {
            const elapsedTime = (Date.now() / 1000) - startTime;
            if (elapsedTime > TUNELIB[tuneid][TLCOL_TIME] / 1000) {
                // Tune ended
                await add_to_history(tuneid);
                progress.status = "waiting";
                progress.playtime = -1;
                progress.tune = null;
            } else {
                progress.playtime = elapsedTime * 1000;
            }
        }
    }

    progress.setlist = setlist;
    progress.velocity = velocity;

    if (setlist.length > 0 && progress.status === "waiting") {
        progress.tune = setlist[0];
    }

    setState("CURRENT_PROGRESS", progress);
    progress.boot_session = "BOOT_SESSION";
    progress.tunelib_signature = "TUNELIB_SIGNATURE";
    progress.playback_enabled = true;   
    return progress;
}

async function demo_get_index_page_info() {
    return { servernode: "", serverlink: "" };
}

async function demo_note() {
    window.location = "/demo/note.html";
    return {}
}

async function demo_filemanager() {
    alert("Filemanager not implemented in demo, sorry");
    return {};
}

async function demo_listdir() {
    return [
        { name: "lib", isDirectory: true, size: 0, path: "/lib", date: "2024/09/10" },
        { name: "software", isDirectory: true, size: 0, path: "/software", date: "2024/09/10" },
        { name: "data", isDirectory: true, size: 0, path: "/data", date: "2024/09/10" },
        { name: "tunelib", isDirectory: true, size: 0, path: "/tunelib", date: "2024/09/10" },
        { name: "main.py", isDirectory: false, size: 157, path: "/main.py", date: "2024/09/10" }
    ];
}

async function demo_used_flash() {
    return {
        total_flash: 14043002,
        used_flash: 2342004
    };
}

async function demo_start_tunelib_sync() {
    return { progress: "***end***" };
}

async function demo_get_config() {
    return await demo_config_json();
}

async function demo_be_silent() {
    return {};
}

async function demo_get_setlist_titles() {
    return "[]";
}

async function demo_download() {
    throw new Error("405: Not allowed");
}

async function errorlog() {
    return "Error log empty";
}

async function demo_pinout_list() {
    return [
        ["/data/20_note_Carl_Frei.json", "20 note Carl Frei scale"],
        ["/data/26_note_Alderman_Wright.json", "25 Note Alderman/Wright scale"],
        ["/data/31_note_Raffin.json", "31 note Raffin scale"],
        ["/data/48_note_custom.json", "48 note custom scale"]
    ];
}

async function demo_get_pinout_filename() {
    return {
        pinout_filename: "/data/20_note_Carl_Frei.json",
        pinout_description: "20 note Carl Frei scale"
    };
}

async function demo_pinout_detail() {
    return await demo_20_note();
}

async function demo_set_velocity_relative(params) {
    let velocity = getState("CURRENT_VELOCITY", 50);
    velocity += parseInt(params.rel, 10);
    velocity = Math.max(Math.min(velocity, 100), 0);
    setState("CURRENT_VELOCITY", velocity);
    return await demo_get_progress();
}

async function demo_get_used_pins() {
    const ESP32_S3_RESERVED_PINS = [0, 19, 20, 43, 44, 45, 46, ...Array.from({ length: 16 }, (_, i) => i + 22)];
    const ESP32_S3_ADC1_PINS = Array.from({ length: 10 }, (_, i) => i + 1);
    const ESP32_S3_TOUCHPAD_PINS = Array.from({ length: 14 }, (_, i) => i + 1);
    const ESP32_GPIO_PINS = Array.from({ length: 49 }, (_, i) => i).filter(p => !ESP32_S3_RESERVED_PINS.includes(p));

    const used = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 39, 40, 41, 42, 47, 48];
    const availableGPIO = ESP32_GPIO_PINS.filter(p => !used.includes(p));
    const availableADC = ESP32_S3_ADC1_PINS.filter(p => !used.includes(p));
    const availableTouch = ESP32_S3_TOUCHPAD_PINS.filter(p => !used.includes(p));

    return {
        usedGPIO: used,
        availableGPIO: availableGPIO,
        reservedGPIO: ESP32_S3_RESERVED_PINS,
        availableADC1: availableADC,
        availableTouchpad: availableTouch,
        usedGPIOcount: used.length,
        availableGPIOcount: availableGPIO.length,
        reservedGPIOcount: ESP32_S3_RESERVED_PINS.length,
        availableADC1count: availableADC.length,
        availableTouchpadcount: availableTouch.length
    };
}

async function demo_diag() {
    return {
        description: "Das Orgelinchen",
        name: "orgelinchen",
        mp_version: [1, 22, 2],
        mp_bin: "MicroPython v1.22.2 on 2024-02-22; Generic ESP32S3 module with Octal-SPIRAM with ESP32S3",
        last_refresh: "2024/09/14",
        reboot_mins: 13,
        free_flash: 14043002,
        used_flash: 2342004,
        free_ram: 7544332,
        used_ram: 283203,
        gc_collect_time: 31,
        solenoid_devices: "no",
        midi_files: 220,
        tunelib_folder: "/tunelib",
        logfilename: "error34.log",
        errors_since_reboot: 0,
        compile_date: "2024/09/14",
        crank_installed: false
    };
}

async function demo_get_wifi_status() {
    return {
        sta_if_status: "",
        sta_if_ssid: "home_router",
        sta_if_connected: true,
        sta_if_ip: "192.168.0.1",
        sta_if_active: true,
        ap_if_connected: true,
        ap_if_ip: "192.168.144.1",
        ap_if_ssid: "my_ap_ssid",
        ap_if_active: false,
        hostname: "orgelinchen",
        description: "Das Orgelinchen",
        client_IPs: ""
    };
}

async function demo_wifi_scan() {
    return [];
}

async function demo_get_description() {
    return { description: "Das Orgelinchen" };
}
async function demo_set_time_zone(){
    return await demo_get_progress();
}

// --- URI to Function Mapping ---

const routes = [
    ["data/tunelib.json", demo_tunelib_json],
    ["data/config.json", demo_config_json],
    ["data/organtuner.json", demo_organtuner_json],
    ["data/lyrics.json", demo_lyrics_json],
    ["data/history.json", demo_history_json],
    ["data/20_note_Carl_Frei.json", demo_20_note],
    ["/get_tuning_stats", demo_get_tuning_stats],
    ["/get_organtuner_json", demo_get_organtuner_json],
    ["/battery", demo_battery],
    ["/battery_zero", demo_battery],
    ["/record_battery_level", demo_battery],
    ["/queue_tune", demo_queue_tune],
    ["/up_setlist/:tuneid", demo_up_setlist],
    ["/down_setlist/:tuneid", demo_down_setlist],
    ["/top_setlist/:tuneid", demo_top_setlist],
    ["/bottom_setlist/:tuneid", demo_bottom_setlist],
    ["/drop_setlist/:tuneid", demo_drop_setlist],
    ["/save_setlist", demo_save_setlist],
    ["/load_setlist", demo_load_setlist],
    ["/start_tune", demo_start_tune],
    ["/stop_tune_setlist", demo_stop_tune_setlist],
    ["/back_setlist", demo_back_setlist],
    ["/clear_setlist", demo_clear_setlist],
    ["/shuffle_set_list", demo_shuffle_set_list],
    ["/shuffle_all_tunes", demo_shuffle_all_tunes],
    ["/shuffle_3stars", demo_shuffle_3stars],
    ["/get_progress", demo_get_progress],
    ["/get_index_page_info", demo_get_index_page_info],
    ["/note/0", demo_note],
    ["/note/1", demo_note],
    ["/note/3", demo_note],
    ["/note/4", demo_note],
    ["/note/5", demo_note],
    ["/note/6", demo_note],
    ["/note/7", demo_note],
    ["/note/8", demo_note],
    ["/note/9", demo_note],
    ["/note/10", demo_note],
    ["/note/11", demo_note],
    ["/note/12", demo_note],
    ["/note/13", demo_note],
    ["/note/14", demo_note],
    ["/note/16", demo_note],
    ["/note/17", demo_note],
    ["/note/18", demo_note],
    ["/note/19", demo_note],
    ["/note/20", demo_note],
    ["/filemanager", demo_filemanager],
    ["/listdir", demo_listdir],
    ["/used_flash", demo_used_flash],
    ["/start_tunelib_sync", demo_start_tunelib_sync],
    ["/tunelib_sync_progress", demo_start_tunelib_sync],
    ["/get_stored_config", demo_get_config],
    ["/get_current_config", demo_get_config],
    ["/revoke_credentials", demo_be_silent],
    ["/save_config", demo_be_silent],
    ["/save_tunelib", demo_be_silent],
    ["/show_file", demo_be_silent],
    ["/upload", demo_be_silent],
    ["/delete_file", demo_be_silent],
    ["/reset", demo_be_silent],
    ["/deep_sleep", demo_be_silent],
    ["/show_midi", demo_be_silent],
    ["/save_pinout_filename", demo_be_silent],
    ["/list_pinout_by_midi_note", demo_be_silent],
    ["/tune_all", demo_be_silent],
    ["/all_pin_test", demo_be_silent],
    ["/scale_test", demo_be_silent],
    ["/clear_tuning", demo_be_silent],
    ["/stop_tuning", demo_be_silent],
    ["/register_comment", demo_be_silent],
    ["/set_playback_disabled", demo_be_silent],
    ["/set_time_zone", demo_set_time_zone],
    ["/check_flash_full", demo_be_silent],
    ["/get_spectator_name", demo_be_silent],
    ["/test_pin", demo_be_silent],
    ["/start_tuning/:note", demo_be_silent],
    ["/sound_note/:note", demo_be_silent],
    ["/sound_repetition/:note", demo_be_silent],
    ["/save_pinout_detail/*path", demo_be_silent],
    ["/list_pinout_by_midi_note/*path", demo_be_silent],
    ["/get_setlist_titles", demo_get_setlist_titles],
    ["/download", demo_download],
    ["/errorlog", errorlog],
    ["/pinout_list", demo_pinout_list],
    ["/get_pinout_filename", demo_get_pinout_filename],
    ["/pinout_detail", demo_pinout_detail],
    ["/set_velocity_relative/:rel", demo_set_velocity_relative],
    ["/get_used_pins/%2Fdata%2F20_note_Carl_Frei.json", demo_get_used_pins],
    ["/diag", demo_diag],
    ["/get_wifi_status", demo_get_wifi_status],
    ["/wifi_scan", demo_wifi_scan],
    ["/get_description", demo_get_description]
];

// --- Simple Client-side Dispatcher/Router ---
function matchRoute(routePattern, targetPath) {
    const patternParts = routePattern.split("/").filter(Boolean);
    const pathParts = targetPath.split("/").filter(Boolean);

    if (patternParts.length !== pathParts.length && !routePattern.includes("*")) {
        return null;
    }

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(":")) {
            const paramName = patternParts[i].slice(1);
            params[paramName] = pathParts[i];
        } else if (patternParts[i].startsWith("*")) {
            const paramName = patternParts[i].slice(1);
            params[paramName] = pathParts.slice(i).join("/");
            return params;
        } else if (patternParts[i] !== pathParts[i]) {
            return null;
        }
    }
    return params;
}

/**
 * Dispatch function to simulate calling backend routes directly from frontend UI
 * @param {string} uri - Request URI (e.g., "/demo/queue_tune")
 * @param {Object} [payload] - Optional JSON body/data
 */
async function fetch_json(uri, payload = {}) {
    initSessionState();
    console.log(">>>>fetch json for", uri);
    await sleep_ms(300);
    for (const [pattern, fn] of routes) {
        const params = matchRoute(pattern, uri);
        if (params !== null) {
            const requestArg = Object.keys(params).length > 0 ? params : payload;
            return await fn(requestArg);
        }
    }
    console.error("404 Not Found:", uri);
    return { error: "404 Not Found" };
}
fetch_json.isConnected = ()=>{return true};
// Automatically load runtime setup when included in browser page
