to_english=(
("Busca organillo", "Find my crank organ"),
("El organillo debe estar energizado.","The crank organ must be switched on."),
("Información obtenida ", "Information date/time "),
("El organillo está intentando conectarse a la red WiFi <b>${ssid}</b>. Verifique que esa red esté activada y cerca. ", "The crank organ is trying to connect to the WiFi network <b>${ssid}</b>. Check that that network is active and near by. "),
(" Si no resulta, el organillo automáticamente probará conectarse a la red Wifi <b>${ssid_other}</b>. ", "If this doesn't work, the crank organ will automatically try to connect to the WiFi network<b>${ssid_other}</b>. "),
("El organillo está correctamente conectado a la red Wifi <b>${ssid}</b>. Asegúrese que su celular ofrece esta red como hotspot, o que su celular o PC está conectado a esta red. Si es así, haga click ", "The crank organ is now connected to the WiFi network <b>${ssid}</b>. Check that your cell phone offers that netork as hotspot, or that your cell phone or PC is connected to that netowkr. If that is the case, click "),
("aquí para llegar al organillo","here to navigate to the crank organ"),
("(red 1 no definida)","(network 1 not defined)"),
("(red 2 no definida)","(network 2 not defined)"),
("Ninguna de las redes WiFi ${ssid1} o ${ssid2} están activadas ni visibles. Intente de nuevo.","None of the WiFi networks ${ssid1} o ${ssid2} are active nor visible. Try again."),
("Si no hay forma de conectarse a través ${ssid1} ni ${ssid2}, puede conectarse a la red WiFI propia del organillo <b>${apssid}</b>. Una vez conectado a ese WiFi, haga click ","If there is no way to connect with ${ssid1} nor ${ssid2}, you can connect to the crank organ's own network <b>${apssid}</b>. Once connected, click "),
("El WiFi propio del organillo no está disponible.","The crank organ's own network is not available."),
("En este browser no funciona bluetooth, use Chrome", "This browser doesn't support bluetooth, use Chrome"),
("Esperando por bluetooth","Waiting for bluetooth" ),
("Problema al conectar con bluetooth","There is a problem connecting via bluetooth"),
("Esta página no registra ninguna información en internet ni se conecta a ningún servidor.","This page does not store any information on the internet nor does it send any information to a server."),
# This must be last
("Intente de nuevo.","Try again."),
            )
with open("busca_organillo.html") as input:
    inp = input.read()
    for sp, en in to_english:
        inp = inp.replace(sp,en)
    with open("find_my_crank_organ.html", "w") as output:
        output.write(inp)
print("Translation done.")