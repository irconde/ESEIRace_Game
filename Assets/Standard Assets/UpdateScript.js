import System.IO;

static var lapsToRun: int;

static var gameMode = "singleplayer";//File.ReadAllText(Path.GetDirectoryName("/Program Files/CarEdu/Settings/Mode.txt") + "/Mode.txt");
static var menuActivo: boolean;

static var graphicQuality: float;

private var touch1: Touch;
private var touch2: Touch;

private var difx: float;
private var dify: float;

private var fileName : String;
private var file	 : String;

private var t : FileInfo;

private var fileReader : StreamReader;
private var line 	   : String;

//public var dataFile : TextAsset;

//static var numMaxLaps : int;

static var isOver : boolean;

private var script3 : PauseMenuScript;

var skinPause : GUISkin;

function Start() {
	
	isOver = false;

	Time.timeScale = 1.0;
	
	file = "config.dat";
	
	fileName = Application.persistentDataPath + "/" + file;
	
	t = new FileInfo(fileName);
	
	if(t.Exists)
	{
		fileReader = t.OpenText();
		//Debug.Log("Exite el fichero");
		
		// Número de vueltas a correr
		
		line = fileReader.ReadLine();
		
		//Debug.Log(line);
		
		lapsToRun = parseInt(line) + 1;
		
		//Debug.Log(lapsToRun);
		
		// Volumen de la música de fondo
		
		line = fileReader.ReadLine();
		
		SoundController.BackgroundMusicVolume = parseFloat(line);
		
		// Volumen de los efectos de sonido
		
		line = fileReader.ReadLine();
		
		SoundController.FXVolume = parseFloat(line);
		
		// Calidad gráfica
		
		line = fileReader.ReadLine();
		
		graphicQuality = parseFloat(line);
		
		fileReader.Close();
		
		switch(graphicQuality)
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

	}
	
		
}



function OnGUI (){
	
	GUI.skin = skinPause;
	
	if(!isOver)
	{
		
	if(GUI.Button(Rect(0, 20, 96, 96), "") && !menuActivo) {
		
		//pause the game
		Time.timeScale = 0;
		
		SoundController.backgroundMusic.Pause();
		//show the pause menu
		script3 = GetComponent("PauseMenuScript"); 
		script3.enabled = true;		
		menuActivo = true;

	}
	
	}
}
