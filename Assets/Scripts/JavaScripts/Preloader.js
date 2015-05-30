var fondo : Texture2D;

var fuente : Font;

private var lightGrey : Color = Color(0.8, 0.8, 0.8);

public var async : AsyncOperation;


private var cont : int;

private var msn : String;

function Start () {
	
	cont = 0;
	
	msn = "Loading"; 
	
    DontDestroyOnLoad(this);
    
    yield LoadLevelWithProgress ("AI");
    
}

function LoadLevelWithProgress (levelToLoad : String) {
    async = Application.LoadLevelAsync(levelToLoad);
    while (!async.isDone) {
       
        yield;
    }
}

public function Update()
{
	
	if(async.isDone == false)
	{
	Debug.Log(cont);
	
	if(cont == 0) msn = "Loading";
	if(cont == 20) msn = "Loading.";	
	if(cont == 40) msn = "Loading..";	
	if(cont == 60) msn = "Loading...";	
	
 	if(cont == 60)cont = 0;
 	else cont++;
	}
	
}

public function OnGUI()
{
	
	
	var offset : RectOffset = RectOffset(10, 0, 5, 0);
	 
	var estilo1 : GUIStyle = GUIStyle();
   	estilo1.normal.textColor = lightGrey;
   	
   	estilo1.padding = offset;
   	estilo1.font = fuente;
	 
	var estilo2 : GUIStyle = GUIStyle();
	
	estilo2.normal.background = fondo;
	 
	 
 if (async != null && async.isDone == false)
 {
    
    
    GUI.Label(new Rect(0, 0, Screen.width, Screen.height), "", estilo2);
    
    GUI.Label(new Rect(Screen.width * 0.5 - 140, Screen.height *0.5 - 40, 320, 80), msn, estilo1);
    
    
 }
} 