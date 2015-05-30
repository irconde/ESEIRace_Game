var newSkin : GUISkin;
var msn : Texture2D;

function theEndingMenu() {
	
	//Dimensiones Menú Principal
	GUI.BeginGroup(Rect(Screen.width / 2 - 370, Screen.height / 2 - 225, 768, 410));
	
	
	// BOTONES  ----------------------------------------------------
	
	// BOTON MAIN MENU
	
	if(GUI.Button(Rect(230, 260, 280, 40), "Main Menu")) {
	Time.timeScale = 1.0;
	Application.LoadLevel(0);
	}


	// MENSAJE  ----------------------------------------------------
		
	GUI.Label(Rect(125,150, 512, 100), msn);
	
	
		
		
	GUI.EndGroup();

}

function OnGUI () {
		//load GUI skin
		GUI.skin = newSkin;
		
		//run the pause menu script
		theEndingMenu();
}