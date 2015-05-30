var newSkin : GUISkin;

function thePauseMenu() {
	
		var script3 : PauseMenuScript;
		var script10 : PauseMenuScript;
		var script11 : OptionsMenuPause;
		var script12 : PauseMenuScript;
		var script13 : HelpMenuPause;
		
		//Dimensiones Menú Principal
		GUI.BeginGroup(Rect(Screen.width / 2 - 215, Screen.height / 2 - 205, 430, 410));
		
		//Botones del Menú Principal------------------------------
		
		// BOTON RESUME
		
		if(GUI.Button(Rect(50, 100, 329, 35), "Resume")) {
		
			//resume the game
			Time.timeScale = 1.0;
			
			SoundController.backgroundMusic.Play();
			
			//disable pause menu
			script3 = GetComponent("PauseMenuScript"); 
			script3.enabled = false;			
			UpdateScript.menuActivo = false;
		}
		
		// BOTON OPTIONS
		
		if(GUI.Button(Rect(50, 145, 329, 35), "Options")) {
		script10 = GetComponent("PauseMenuScript"); 
		script10.enabled = false;
		script11 = GetComponent("OptionsMenuPause"); 
		script11.enabled = true;
		}
		
		
		// BOTON MAIN MENU
		
		if(GUI.Button(Rect(50, 190, 329, 35), "Main Menu")) {
		Time.timeScale = 1.0;
		UpdateScript.menuActivo = false;
		Application.LoadLevel(0);
		}
		
		// BOTON RESTART
		
		if(GUI.Button(Rect(50, 235, 329, 35), "Restart")) {
		Time.timeScale = 1.0;
		UpdateScript.menuActivo = false;
		Application.LoadLevel(2);
		}
		
		// BOTON QUIT
		
		if(GUI.Button(Rect(50, 280, 329, 35), "Quit")) {
		Application.Quit();
		}
		
		GUI.EndGroup();

		
}

function OnGUI () {
		//load GUI skin
		GUI.skin = newSkin;
		
		//run the pause menu script
		thePauseMenu();
}