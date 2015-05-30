var newSkin : GUISkin;
var logoTexture : Texture2D;

var backTexture : Texture2D;

function theCreditsMenu() {
		
		var script8 : MainMenuScript;
		var script9 : CreditsMenuScript;
		
		GUI.Label(Rect(0, 0, Screen.width, Screen.height), backTexture);
	
	
		GUI.BeginGroup(Rect(Screen.width / 2 - 220, Screen.height / 2 - 205, 430, 410));
		
			
		//Logo ----------------------------------------------------
		
		GUI.Label(Rect(20, 40, 429, 70), logoTexture);
		
		//Información ---------------------------------------------
		
		GUI.Label(Rect(40, 155, 480, 380), "GAME ARTIST:                   Ivan Rodriguez Conde\n\nGAME DESIGNER:            Ivan Rodriguez Conde\n\nGAME PROGRAMMER:    Ivan Rodriguez Conde\n\nLEVEL DESIGNER:           Ivan Rodriguez Conde\n\nSOUNDTRACK:                 Pain - Jimmy Eat World");
		
		
		//BOTON REGRESO AL MENU PRINCIPAL
		
		if(GUI.Button(Rect(250, 350, 180, 40), "Back")) {
		script8 = GetComponent("MainMenuScript"); 
		script8.enabled = true;
		script9 = GetComponent("CreditsMenuScript"); 
		script9.enabled = false;
		}
		
		GUI.EndGroup(); 
}

function OnGUI () {
		//load GUI skin 
		GUI.skin = newSkin;
		
		//execute theMapMenu function
		theCreditsMenu();
}