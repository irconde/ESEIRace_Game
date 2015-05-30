// The start waypoint, this is initialized in Awake.
// This variable is static thus all instances of the waypoint script share it.
static var start : WayPoint;
static var actualWaypoint : WayPoint;
static var actualEnemyWaypoint : WayPoint;

static var actual : int;
static var actualEnemy : int;

static var idMaxAlcanzado : int;

var id: int;

// The next waypoint, this variable needs to be assigned in the inspector.
// You can select all waypoints to see the full waypoint path.
var next : WayPoint;

var before : WayPoint;

// This is used to determine where the start waypoint is.
var isStart = false;

// Returns where the AI should drive towards.
// position is the current position of the car.
function CalculateTargetPosition (position : Vector3) {

	// If we are getting close to the waypoint, we return the next waypoint.
	// This gives us better car behaviour when cars don't exactly hit the waypoint
	if (Vector3.Distance (transform.position, position) < 6) {
		return next.transform.position;
	}
	// We are still far away from the next waypoint, just return the waypoints position
	else {
		return transform.position;
	}
}

function CalculateReverseTargetPosition (position : Vector3) {
	
	if (Vector3.Distance (transform.position, position) < 6) {
		return before.transform.position;
	}
	
	else {
		
		return transform.position;
	}
}

// This initializes the start and goal static variables.
// We have to do this inside Awake because the waypoints need 
// to be initialized before the AI scripts use it.
// All Awake function are always called before all Start functions.
function Awake () {
	if (!next)
		Debug.Log ("This waypoint is not connected, you need to set the next waypoint!", this);
		
	if (isStart)
		start = this;
		
		
	actualWaypoint = null;
	actualEnemyWaypoint = null;
	
	actual = 0;
	actualEnemy = 0;
	
	idMaxAlcanzado = 0;
	
}

// Draw the waypoint pickable gizmo
function OnDrawGizmos () {
	Gizmos.DrawIcon (transform.position, "Waypoint.tif");
}

// Draw the waypoint lines only when you select one of the waypoints
function OnDrawGizmosSelected () {
	if (next) {
		Gizmos.color = Color.green;
		Gizmos.DrawLine (transform.position, next.transform.position);
		Gizmos.DrawLine (transform.position, before.transform.position);
	}
}

function OnTriggerEnter( elementoColision : Collider){

	
	
	var car = GameObject.Find("Car/Body");
	var enemy = GameObject.Find("EnemyCar/Body");
	
	if(car != 0 && car.GetComponent.<Collider>() == elementoColision)
	{
   
		   actual = this.id;
		  
		  
		  if(actual != 0 && actual > idMaxAlcanzado && actual == Car.sigPunto && Car.sigPunto == idMaxAlcanzado + 1 ) idMaxAlcanzado = actual;
		  
		  else if(actual == 0 && idMaxAlcanzado == 70)idMaxAlcanzado = actual;
		  
		   actualWaypoint = this;
		   
		  if (actual == 70)
    	  {
    		Car.sigPunto = 0;
    	  }
    	 else Car.sigPunto = actual + 1;
		
		   
	}   
	  
	if(enemy.GetComponent.<Collider>() == elementoColision)
	{
	   actualEnemy = this.id;
	   actualEnemyWaypoint = this; 
	   
	   if(actualEnemy == 70)
	   {
	   		EnemyCar.sigPuntoEnem = 0;
	   }
	   else EnemyCar.sigPuntoEnem = actualEnemy + 1;
	}
}