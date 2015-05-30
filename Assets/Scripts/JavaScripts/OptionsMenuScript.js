import System.IO;
import System;

var newSkin : GUISkin;
var logoTexture : Texture2D;

static var musicVolumeSlider : float = 0.4;
static var fxVolumeSlider : float = 0.6;
static var graphicsQFloat : float = 0.6;

//volumeSlider = audio.volume;
//var windowMode = true;

static var lapsToReach : String = "1";

var backTexture : Texture2D;

function Awake()
{
	/*
	 lapsToReach = '1';
	 musicVolumeSlider = 0.4;
	 fxVolumeSlider = 0.6;
	 graphicsQFloat = 0.6;
	*/
}

function theOptionsMenu() {
		
		
		var script8 : MainMenuScript;
		var script9 : OptionsMenuScript;
		
		GUI.Label(Rect(0, 0, Screen.width, Screen.height), backTexture);
		
		GUI.BeginGroup(Rect(Screen.width / 2 - 220, Screen.height / 2 - 205, 430, 410));
		
		//Logo ----------------------------------------------------
		
		GUI.Label(Rect(20, 40, 429, 70), logoTexture);
		
		// Opciones de configuracion -------------------------------
		
		// NUMERO DE VUELTAS
		
		GUI.Label(Rect(25, 140, 170, 25), "NUMBER OF LAPS: ");
		lapsToReach = GUI.TextField(Rect(195, 130, 30, 25), lapsToReach, 2);
		
		
		// SLIDER MUSIC VOLUMEN
		
		GUI.Label(Rect(25, 190, 150, 25), "MUSIC VOLUME: ");
		musicVolumeSlider = GUI.HorizontalSlider (Rect (170, 187, 200, 25), musicVolumeSlider, 0.0, 1.0);
		
		// SLIDER FX VOLUMEN
		
		GUI.Label(Rect(25, 230, 150, 25), "FX VOLUME: ");
		fxVolumeSlider = GUI.HorizontalSlider (Rect (170, 227, 200, 25), fxVolumeSlider, 0.0, 1.0);
		
		// GRAPHICS QUALITY
		
		GUI.Label(Rect(25, 280, 150, 25), "GRAPHICS: ");
		graphicsQFloat = GUI.HorizontalSlider (Rect (150, 277, 250, 25), graphicsQFloat, 0.0, 1.0);
		
		GUI.Label(Rect(130, 305, 150, 25), "Worst");
		GUI.Label(Rect(190, 305, 150, 25), "Fast");
		GUI.Label(Rect(230, 305, 150, 25), "Norm");
		GUI.Label(Rect(280, 305, 150, 25), "Fine");
		GUI.Label(Rect(320, 305, 150, 25), "Great");
		GUI.Label(Rect(380, 305, 150, 25), "Exc.");
		
		if(graphicsQFloat >= 0 && graphicsQFloat <= 0.1) graphicsQFloat = 0.0;
		
		if(graphicsQFloat > 0.1 && graphicsQFloat <= 0.2) graphicsQFloat = 0.2;
		
		if(graphicsQFloat > 0.2 && graphicsQFloat <= 0.3) graphicsQFloat = 0.2;
		
		if(graphicsQFloat > 0.3 && graphicsQFloat <= 0.4) graphicsQFloat = 0.4;
		
		if(graphicsQFloat > 0.4 && graphicsQFloat <= 0.5) graphicsQFloat = 0.4;
		
		if(graphicsQFloat > 0.5 && graphicsQFloat <= 0.6) graphicsQFloat = 0.6;
		
		if(graphicsQFloat > 0.6 && graphicsQFloat <= 0.7) graphicsQFloat = 0.6;
		
		if(graphicsQFloat > 0.7 && graphicsQFloat <= 0.8) graphicsQFloat = 0.8;
		
		if(graphicsQFloat > 0.8 && graphicsQFloat <= 0.9) graphicsQFloat = 0.8;
		
		if(graphicsQFloat > 0.9 && graphicsQFloat <= 1.0) graphicsQFloat = 1.0;
		
				
		//BOTON REGRESO AL MENU PRINCIPAL
		
		if(GUI.Button(Rect(250, 350, 180, 40), "Back")) {
		script8 = GetComponent("MainMenuScript"); 
		script8.enabled = true;
		script9 = GetComponent("OptionsMenuScript"); 
		script9.enabled = false;
		}
		
		
		GUI.EndGroup(); 
}

function OnGUI () {
		
		GUI.skin = newSkin;
	
		theOptionsMenu();
}
