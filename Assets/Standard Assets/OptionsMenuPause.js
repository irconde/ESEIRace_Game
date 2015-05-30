var newSkin : GUISkin;
var fondo: Texture2D;


 var fxVolumeSlider : float = 1.0;
 var graphicsQFloat : float = 1.0;


function theOptionsMenu() {
		
		var script8 : PauseMenuScript;
		var script9 : OptionsMenuPause;
		
		GUI.BeginGroup(Rect(Screen.width / 2 - 215, Screen.height/2 - 280, 430, 410));
		
		
		GUI.Box(Rect(0, 160, 430, 260),"");
		
				
		// SLIDER MUSIC VOLUMEN
		
		GUI.Label(Rect(25, 197, 150, 25), "MUSIC VOLUME:");
		SoundController.BackgroundMusicVolume = GUI.HorizontalSlider (Rect (170, 197, 200, 25), SoundController.BackgroundMusicVolume, 0.0, 1.0);
		
		// SLIDER FX VOLUMEN
		
		GUI.Label(Rect(25, 237, 150, 25), "FX VOLUME:");
		SoundController.FXVolume = GUI.HorizontalSlider (Rect (170, 237, 200, 25), SoundController.FXVolume, 0.0, 1.0);

		// GRAPHICS QUALITY
		
		GUI.Label(Rect(25, 277, 150, 25), "GRAPHICS:");
		UpdateScript.graphicQuality = GUI.HorizontalSlider (Rect (150, 277, 250, 25), UpdateScript.graphicQuality, 0.0, 1.0);
		
		
		GUI.Label(Rect(130, 305, 150, 25), "Worst");
		GUI.Label(Rect(190, 305, 150, 25), "Fast");
		GUI.Label(Rect(230, 305, 150, 25), "Norm");
		GUI.Label(Rect(280, 305, 150, 25), "Fine");
		GUI.Label(Rect(320, 305, 150, 25), "Great");
		GUI.Label(Rect(380, 305, 150, 25), "Exc.");
		
		
		
		if(UpdateScript.graphicQuality >= 0 && UpdateScript.graphicQuality <= 0.1) UpdateScript.graphicQuality = 0.0;
		
		if(UpdateScript.graphicQuality > 0.1 && UpdateScript.graphicQuality <= 0.2) UpdateScript.graphicQuality = 0.2;
		
		if(UpdateScript.graphicQuality > 0.2 && UpdateScript.graphicQuality <= 0.3) UpdateScript.graphicQuality = 0.2;
		
		if(UpdateScript.graphicQuality > 0.3 && UpdateScript.graphicQuality <= 0.4) UpdateScript.graphicQuality = 0.4;
		
		if(UpdateScript.graphicQuality > 0.4 && UpdateScript.graphicQuality <= 0.5) UpdateScript.graphicQuality = 0.4;
		
		if(UpdateScript.graphicQuality > 0.5 && UpdateScript.graphicQuality <= 0.6) UpdateScript.graphicQuality = 0.6;
		
		if(UpdateScript.graphicQuality > 0.6 && UpdateScript.graphicQuality <= 0.7) UpdateScript.graphicQuality = 0.6;
		
		if(UpdateScript.graphicQuality > 0.7 && UpdateScript.graphicQuality <= 0.8) UpdateScript.graphicQuality = 0.8;
		
		if(UpdateScript.graphicQuality > 0.8 && UpdateScript.graphicQuality <= 0.9) UpdateScript.graphicQuality = 0.8;
		
		if(UpdateScript.graphicQuality > 0.9 && UpdateScript.graphicQuality <= 1.0) UpdateScript.graphicQuality = 1.0;
		
		
		switch(UpdateScript.graphicQuality)
		{
			case 0.0 : QualitySettings.currentLevel = QualityLevel.Fastest;
						break;
			
			case 0.2 : QualitySettings.currentLevel = QualityLevel.Fast;
						break;		
			
			case 0.4 : QualitySettings.currentLevel = QualityLevel.Simple;
						break;
			
			case 0.6 : QualitySettings.currentLevel = QualityLevel.Good;
						break;
			
			case 0.8 : QualitySettings.currentLevel = QualityLevel.Beautiful;
						break;
			
			case 1.0 : QualitySettings.currentLevel = QualityLevel.Fantastic;
						break;
		}

		
		//BOTON REGRESO AL MENU PRINCIPAL
		
		if(GUI.Button(Rect(278, 355, 137, 40), "Back")) {
		script8 = GetComponent("PauseMenuScript"); 
		script8.enabled = true;
		script9 = GetComponent("OptionsMenuPause"); 
		script9.enabled = false;
		}
		
		GUI.EndGroup(); 
		
			
}

function OnGUI () {
		//load GUI skin 
		GUI.skin = newSkin;
		
		//execute theMapMenu function
		theOptionsMenu();
}