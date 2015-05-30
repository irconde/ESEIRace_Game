import System.IO;
import System;

var newSkin : GUISkin;
var logoTexture : Texture2D;
var backTexture : Texture2D;



private var fileName : String;

private var file : String;

private var t : FileInfo;

private var fileWriter : StreamWriter;

function Awake()
{
	
	file = "config.dat";
	
	//#if UNITY_ANDROID
	
		fileName = Application.persistentDataPath + "/" + file;
		
	//#else 
	
	//
	//	fileName = Application.dataPath + "/" + file;
		
	//#endif
	
}

function showMenuPrincipal() {
	
	
		var script10 : MainMenuScript;
		var script11 : OptionsMenuScript;
		var script12 : MainMenuScript;
		var script13 : HelpMenuScript;
		var script8 : MainMenuScript;
		var script9 : CreditsMenuScript;
		
		t = new FileInfo(fileName);
		
		fileWriter = t.CreateText();
		fileWriter.WriteLine(OptionsMenuScript.lapsToReach);
		fileWriter.WriteLine(OptionsMenuScript.musicVolumeSlider);
		fileWriter.WriteLine(OptionsMenuScript.fxVolumeSlider);
		fileWriter.WriteLine(OptionsMenuScript.graphicsQFloat);
		fileWriter.Close();
	
		GUI.Label(Rect(0, 0, Screen.width, Screen.height), backTexture);
	
		//Dimensiones Menú Principal
		GUI.BeginGroup(Rect(Screen.width / 2 - 220, Screen.height / 2 - 205, 430, 410));
		
		
		//Logo ----------------------------------------------------
		
		GUI.Label(Rect(20, 40, 429, 70), logoTexture);
		
		//Botones del Menú Principal------------------------------
		
		// BOTON START
		
		if(GUI.Button(Rect(0, 150, 429, 35), "Start")) {
		
			
			Application.LoadLevel(1);

		
		}
		
		// BOTON OPTIONS
		
		if(GUI.Button(Rect(0, 195, 429, 35), "Options")) {
		script10 = GetComponent("MainMenuScript"); 
		script10.enabled = false;
		script11 = GetComponent("OptionsMenuScript"); 
		script11.enabled = true;
		}
		
		// BOTON CONTROLS
		
		if(GUI.Button(Rect(0, 240, 429, 35), "Controls")) {
		script12 = GetComponent("MainMenuScript"); 
		script12.enabled = false;
		script13 = GetComponent("HelpMenuScript"); 
		script13.enabled = true;
		}
		
		// BOTON CREDITS
		
		if(GUI.Button(Rect(0, 285, 429, 35), "Credits")) {
		script8 = GetComponent("MainMenuScript"); 
		script8.enabled = false;
		script9 = GetComponent("CreditsMenuScript"); 
		script9.enabled = true;
		}
		
		// BOTON QUIT
		
		if(GUI.Button(Rect(0, 330, 429, 35), "Quit")) {
		Application.Quit();
		}
	
		//layout end
		GUI.EndGroup(); 
}

function OnGUI () {
		
		GUI.skin = newSkin;
		
		showMenuPrincipal();
}