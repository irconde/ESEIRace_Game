
var		player_gameobject  : GameObject;	// the Player helicopter object	// the image to be used as the altimeter
var 	texturasCK 		   : Texture2D[];	// the set of images to be used for the throttle Because you can not
	
var fondoMapa		: Texture2D;
var posicionesCar 	: Texture2D[];
var posicionesEnemy	: Texture2D[];
												
private var v : float;												
private var indexImg : int = 0;

private var estiloPosCar   : GUIStyle = GUIStyle();
private var estiloPosEnemy : GUIStyle = GUIStyle();
private var indexCar   : int = 0;
private var indexEnemy : int = 0;

private var helicopter_throttle :float;

var auxCoche :Car;

function OnGUI () {

	// GESTIÓN DEL CUENTAKILÓMETROS ---------------------------------------------
	
	var estilo : GUIStyle = GUIStyle();	
	estilo.normal.background = fondoMapa;
	
	
	// Necesitamos el módulo de la velocidad del coche en valor absoluto
	
	auxCoche = player_gameobject.GetComponent( "Car" );
	
	v = auxCoche.speedCar;		
	if(v < 0.0)	helicopter_throttle = - v;	
	
	
	// En función de la velocidad del coche mostraremos 
	
	// Al ser un juego de estilo arcade,exageramos la velocidad																			
	
	if ( v >= 0.0 && v<= 1.0) indexImg = 0;
	
	else if ( v>0.0 && v<2.8) indexImg = 1;
	
	else if (v>2.8 && v<5.6) indexImg = 2;
	
	else if (v>5.6 && v<8.4) indexImg = 3;
	
	else if (v>8.4 && v<11.2) indexImg = 4;
	
	else if (v>11.2 && v<14.0) indexImg = 5;
	
	else if (v>14 && v<16.8) indexImg = 6;
	
	else if (v>16.8 && v<19.6) indexImg = 7;
	
	else if (v>19.6 && v<22.4) indexImg = 8;
	
	else if (v>22.4 && v<25.2) indexImg = 9;
	
	else if (v>25.2 && v<28) indexImg = 10;
	
	else if (v>28 && v<30.8) indexImg = 11;
	
	else if (v>30.8 && v<33.6) indexImg = 12;
	
	else if (v>33.6 && v<36.4) indexImg = 13;
	
	else if (v>36.4 && v<39.2) indexImg = 14;
	
	else if (v>39.2 && v<42) indexImg = 15;
	
	else if (v>42 && v<44.8) indexImg = 16;
	
	else if (v>44.8 && v<47.6) indexImg = 17;
	
	else if (v>=47.6) indexImg = 18;
	
	
	var altoMapa = 0.17 * Screen.height * 1.25;
	var anchoMapa = 2.2 * altoMapa;
	
	var altoCK = 0.25 * Screen.height * 1.35;
	var anchoCK = altoCK;
	
	
	//CuentaKilómetros	
	GUI.Label( Rect( Screen.width - 0.9 *anchoCK, Screen.height - 0.8*altoCK, anchoCK, altoCK ), texturasCK[ indexImg ]);		
	
	
	//GESTIÓN DEL MINIMAPA ------------------------------------------------
	
	
	//Minimapa
	GUI.Label( new Rect( 0, Screen.height - altoMapa , anchoMapa, altoMapa ), "", estilo);
	
	switch(WayPoint.actual)
	{
		case 0 : indexCar = 0;
				 break;
		case 1 : indexCar = 1;
				 break;
		case 8 : indexCar = 2;
				 break;
		case 9 : indexCar = 3;
				 break;
		case 11: indexCar = 4;
				 break;
		case 12: indexCar = 5;
				 break;
		case 15: indexCar = 6;
				 break;
		case 17: indexCar = 7;
				 break;
		case 19: indexCar = 8;
				 break;
		case 23: indexCar = 9;
				 break;
		case 26: indexCar = 10;
				 break;
		case 28: indexCar = 11;
				 break;
		case 29: indexCar = 12;
				 break;
		case 33: indexCar = 13;
				 break;
		case 35: indexCar = 14;
				 break;
		case 36: indexCar = 15;
				 break;
		case 37: indexCar = 16;
				 break;
		case 40: indexCar = 17;
				 break;
		case 42: indexCar = 18;
				 break;
		case 46: indexCar = 19;
				 break;
		case 49: indexCar = 20;
				 break;
		case 50: indexCar = 21;
				 break;
		case 53: indexCar = 22;
				 break;
		case 55: indexCar = 23;
				 break;
		case 57: indexCar = 24;
				 break;
		case 59: indexCar = 25;
				 break;
		case 62: indexCar = 26;
				 break;
		case 66: indexCar = 27;
				 break;
		case 69: indexCar = 28;
				 break;
	};
	
	
	switch(WayPoint.actualEnemy)
	{
		case 0 : indexEnemy = 0;
				 break;
		case 1 : indexEnemy = 1;
				 break;
		case 8 : indexEnemy = 2;
				 break;
		case 9 : indexEnemy = 3;
				 break;
		case 11: indexEnemy = 4;
				 break;
		case 12: indexEnemy = 5;
				 break;
		case 15: indexEnemy = 6;
				 break;
		case 17: indexEnemy = 7;
				 break;
		case 19: indexEnemy = 8;
				 break;
		case 23: indexEnemy = 9;
				 break;
		case 26: indexEnemy = 10;
				 break;
		case 28: indexEnemy = 11;
				 break;
		case 29: indexEnemy = 12;
				 break;
		case 33: indexEnemy = 13;
				 break;
		case 35: indexEnemy = 14;
				 break;
		case 36: indexEnemy = 15;
				 break;
		case 37: indexEnemy = 16;
				 break;
		case 40: indexEnemy = 17;
				 break;
		case 42: indexEnemy = 18;
				 break;
		case 46: indexEnemy = 19;
				 break;
		case 49: indexEnemy = 20;
				 break;
		case 50: indexEnemy = 21;
				 break;
		case 53: indexEnemy = 22;
				 break;
		case 55: indexEnemy = 23;
				 break;
		case 57: indexEnemy = 24;
				 break;
		case 59: indexEnemy = 25;
				 break;
		case 62: indexEnemy = 26;
				 break;
		case 66: indexEnemy = 27;
				 break;
		case 69: indexEnemy = 28;
				 break;
	};
	
	
	
	estiloPosCar.normal.background = posicionesCar[indexCar];
	estiloPosEnemy.normal.background = posicionesEnemy[indexEnemy];
	
	
	//Posiciones del coche enemigo en el minimapa
	GUI.Label( new Rect(0, Screen.height - altoMapa , anchoMapa, altoMapa ),"", estiloPosEnemy);
	
	//Posiciones del coche en el minimapa
	GUI.Label( new Rect(0, Screen.height - altoMapa , anchoMapa, altoMapa ),"", estiloPosCar);
	
	
		
}
