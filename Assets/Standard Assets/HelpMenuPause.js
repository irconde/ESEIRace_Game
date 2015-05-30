var newSkin : GUISkin;
var buttons: Texture2D;
var spacer: Texture2D;
var fondo: Texture2D;

function theHelpMenu() {
		
		var script8: PauseMenuScript;
		var script9: HelpMenuPause;
		
		GUI.BeginGroup(Rect(Screen.width / 2 - 215, Screen.height / 2 - 205, 430, 410));
		
		//GUI.BeginGroup(Rect(Screen.width / 2 - 250, 50, 500, 485));
		
		
		
		//GUI.Button(Rect(50, 30, 300, 300), "hola");
		
		GUI.Box(Rect(0, 50, 430, 360),"");
		
		// Imágenes de los botones
		
		GUI.Label(Rect(90, 120, 256, 128), buttons);
		GUI.Label(Rect(90, 240, 256, 128), spacer);
		
		// Información de los botones
		
		GUI.Label(Rect(177, 95, 480, 380), "SpeedUp");
		GUI.Label(Rect(133, 155, 480, 380), "Left");
		GUI.Label(Rect(256, 155, 480, 380), "Right");
		GUI.Label(Rect(160, 247, 480, 380), "SpeedDown");
		GUI.Label(Rect(190, 325, 480, 380), "Skid");
		
		//BOTON REGRESO AL MENU PRINCIPAL
		
		if(GUI.Button(Rect(290, 360, 130, 40), "Back")) {
		script8 = GetComponent("PauseMenuScript"); 
		script8.enabled = true;
		script9 = GetComponent("HelpMenuPause"); 
		script9.enabled = false;
		}
		
		GUI.EndGroup(); 
		
			
}

function OnGUI () {
		//load GUI skin 
		GUI.skin = newSkin;
		
		//execute theMapMenu function
		theHelpMenu();
}