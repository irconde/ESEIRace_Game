using UnityEngine;
using System.Collections;
using System.IO;


public class GestionFichero : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
		StreamWriter fileWriter;
		
		string fileName = "";
		
		string file = "prueba.dat"; 
		
		#if UNITY_IPHONE			
			string fileNameBase = Application.dataPath.Substring(0, Application.dataPath.LastIndexOf('/'));
			fileName = fileNameBase.Substring(0, fileNameBase.LastIndexOf('/')) + "/Documents/" + file;
		
		#elif UNITY_ANDROID
			fileName = Application.persistentDataPath + "/" + file ;
		
		#else
			fileName = Application.dataPath + "/" + file;
		#endif
		
		fileWriter = File.CreateText(fileName);
		fileWriter.WriteLine("Hello world");
		fileWriter.Close();
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
