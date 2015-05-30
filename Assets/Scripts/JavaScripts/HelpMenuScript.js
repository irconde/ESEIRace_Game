var newSkin : GUISkin;
var logoTexture : Texture2D;
var buttons: Texture2D;
var spacer: Texture2D;

var backTexture : Texture2D;
var controls : Texture2D;

function theHelpMenu() {
		
		
		var script8 : MainMenuScript;
		var script9 : HelpMenuScript;
		
		
		GUI.Label(Rect(0, 0, Screen.width, Screen.height), backTexture);
	
	
		GUI.BeginGroup(Rect(Screen.width / 2 - 275, Screen.height / 2 - 205, 800, 410));
		
		//Logo ----------------------------------------------------
		GUI.Label(Rect(75, 40, 429, 70), logoTexture);
		
		// Imágenes de los botones
		
		GUI.Label(Rect(75, 120, 399, 281), controls);
		
		
		// Información de los botones
		
		GUI.Label(Rect(300, 170, 480, 380), "SPEED UP");
		GUI.Label(Rect(0, 155, 480, 380), "TURN LEFT");
		GUI.Label(Rect(450, 155, 480, 380), "TURN RIGHT");
		GUI.Label(Rect(140, 170, 480, 380), "SPEED DOWN");
		
		//BOTON REGRESO AL MENU PRINCIPAL
		
		if(GUI.Button(Rect(305, 350, 180, 40), "Back")) {
		script8 = GetComponent("MainMenuScript"); 
		script8.enabled = true;
		script9 = GetComponent("HelpMenuScript"); 
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