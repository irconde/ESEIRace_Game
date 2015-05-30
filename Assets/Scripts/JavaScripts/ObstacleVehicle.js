// Variables defined outside of functions appear in the inspector
// and can be changed there without having to change the script
var frontLeftWheel : Transform;
var frontRightWheel : Transform;
var backLeftWheel : Transform;
var backRightWheel : Transform;

var frontRightWheel_Disc : Transform;
var frontLeftWheel_Disc : Transform;

var numWaypoints = 3;

var wheelForce = 120.0;

private var estadoInicial : Transform;


var resetTime : float = 5.0;
private var resetTimer : float = 0.0;

// All these variables are only used internally, thus we make them private
private var hasWheelContact = false;
private var steerMaxAngle =  40.0;

var firstWayPoint : WayPoint;

private var activeWayPoint : WayPoint;

var obstaculo : GameObject;

private var inicioMov : boolean;

private var idIni : int;
private var idActual : int;

private var relativeTarget : Vector3;

private var targetAngle : float;

private var currentEnginePower : int;

private var targetPosition : Vector3;

function Start () {
	
	idIni = firstWayPoint.id;
	
	activeWayPoint = firstWayPoint;
	
	estadoInicial = this.transform;
	
	inicioMov = false;
}

function UpdateWithTargetPosition (target : Vector3) {
	

	
	relativeTarget = transform.InverseTransformPoint (target);
	// Calculate the target angle for the wheels, so they point towards the target
	targetAngle = Mathf.Atan2 (relativeTarget.x, relativeTarget.z);
	// Atan returns the angle in radians, convert to degrees
	targetAngle *= Mathf.Rad2Deg;
	// The wheels have a maximum rotation angle
	targetAngle = Mathf.Clamp (targetAngle, -steerMaxAngle, steerMaxAngle);
	
	
	frontLeftWheel.localEulerAngles = Vector3 (0, targetAngle, 0);
	frontRightWheel.localEulerAngles = Vector3 (0, targetAngle, 0);
	frontLeftWheel_Disc.localEulerAngles = Vector3 (0, targetAngle, 0);
	frontRightWheel_Disc.localEulerAngles = Vector3 (0, targetAngle, 0);


	if (hasWheelContact)
	{

		GetComponent.<Rigidbody>().AddRelativeForce (0, 0, wheelForce);
		
		// We are too fast and need to turn too much. Slow down!
		if (Mathf.Abs (targetAngle) > 15 && GetComponent.<Rigidbody>().velocity.magnitude > 10) {
			// We are too fast
			GetComponent.<Rigidbody>().drag = 25;
		}
	}
	

	hasWheelContact = false;
}

function Check_If_Car_Is_Flipped()
{
	if(transform.localEulerAngles.z > 80 && transform.localEulerAngles.z < 280)
		resetTimer += Time.deltaTime;
	else
		resetTimer = 0;
	
	if(resetTimer > resetTime)
		FlipCar();
}

function FlipCar()
{
	transform.rotation = Quaternion.LookRotation(transform.forward);
	transform.position += Vector3.up * 0.5;
	GetComponent.<Rigidbody>().velocity = Vector3.zero;
	GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	resetTimer = 0;
	currentEnginePower = 0;
}

function Update () {
	
	
	Check_If_Car_Is_Flipped();
	
	var idActual = activeWayPoint.id;
	
	if( WayPoint.actual > (idIni+3) && WayPoint.actualEnemy > (idIni + 3) )
	{
	
	    transform.position = firstWayPoint.transform.position;
		var relativePos = firstWayPoint.before.transform.position - transform.position;
		transform.rotation = Quaternion.LookRotation(relativePos);
		GetComponent.<Rigidbody>().velocity = Vector3.zero;
		GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
		activeWayPoint = firstWayPoint.before;
			  
	  inicioMov = false;
	  
	}
	else if((WayPoint.actual + 8) == idIni)
	{
	  
	  
	  inicioMov = true;
	  transform.position = firstWayPoint.transform.position;
	  transform.rotation = estadoInicial.rotation;
	  	GetComponent.<Rigidbody>().velocity = Vector3.zero;
		GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
    }

	if(!inicioMov)
	{
			GetComponent.<Rigidbody>().velocity = Vector3.zero;
		GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	}
	
	if(inicioMov)
	{
		  targetPosition = activeWayPoint.CalculateReverseTargetPosition (transform.position);
		
		UpdateWithTargetPosition (targetPosition);
	}
	
	
}

// Whenever we hit a waypoint, skip forward to the next way point
function OnTriggerEnter (triggerWaypoint : Collider) {


	
	if (activeWayPoint.GetComponent.<Collider>() == triggerWaypoint) {
		activeWayPoint = activeWayPoint.before;
	}


}


// Track if we the wheels are grounded
function OnCollisionStay (collision : Collision) {
	for (var p : ContactPoint in collision.contacts) {
		if (p.thisCollider.transform == frontLeftWheel)
			hasWheelContact = true;
		if (p.thisCollider.transform == frontRightWheel)
			hasWheelContact = true;
		if (p.thisCollider.transform == backLeftWheel)
			hasWheelContact = true;
		if (p.thisCollider.transform == backRightWheel)
			hasWheelContact = true;
	}
}
