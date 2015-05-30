// Variables defined outside of functions appear in the inspector
// and can be changed there without having to change the script
var frontLeftWheel : Transform;
var frontRightWheel : Transform;
var backLeftWheel : Transform;
var backRightWheel : Transform;
var wheelForce = 120.0;

var resetTime : float = 5.0;
var resetTimer : float = 0.0;

var resetTime2 : float = 6.0;
var resetTimer2 : float = 0.0;

// All these variables are only used internally, thus we make them private
private var hasWheelContact = false;
private var steerMaxAngle =  40.0;
private var activeWayPoint : WayPoint;

var lapEnem 			: int;
var totalWayPointsEnem	: int;
static var sigPuntoEnem		: int;

private var menuFinal :FinalMenuLose; 

private var oneShot : boolean;

private var relativeTarget : Vector3;

private var targetPosition : Vector3;

private var targetAngle : float;

private var currentEnginePower : int = 0;

function Start () {

	activeWayPoint = WayPoint.start;


	GetComponent.<Rigidbody>().centerOfMass = Vector3 (0, 0, 0);
	GetComponent.<Rigidbody>().inertiaTensorRotation = Quaternion.identity;
	GetComponent.<Rigidbody>().inertiaTensor = Vector3 (1, 1, 2) * GetComponent.<Rigidbody>().mass;
	
	lapEnem = 1;
	totalWayPointsEnem  = 0;
	sigPuntoEnem = 0;
	
	resetTimer = 0.0;
	resetTimer2 = 0.0;
	
	oneShot = false;
}

function UpdateWithTargetPosition (target : Vector3) {
	

	
	relativeTarget = transform.InverseTransformPoint (target);
	targetAngle = Mathf.Atan2 (relativeTarget.x, relativeTarget.z);
	targetAngle *= Mathf.Rad2Deg;
	targetAngle = Mathf.Clamp (targetAngle, -steerMaxAngle, steerMaxAngle);
	
	frontLeftWheel.localEulerAngles = Vector3 (0, targetAngle, 0);
	frontRightWheel.localEulerAngles = Vector3 (0, targetAngle, 0);

	GetComponent.<Rigidbody>().drag = 0;
	
	if (hasWheelContact)
	{

		GetComponent.<Rigidbody>().AddRelativeForce (0, 0, wheelForce);
		
		
		if (Mathf.Abs (targetAngle) > 15 && GetComponent.<Rigidbody>().velocity.magnitude > 10) {
			
			GetComponent.<Rigidbody>().drag = 10;
		}
	}
	

	hasWheelContact = false;
}

function FixedUpdate () {
	
	var hit : RaycastHit;
	var hasHit = false;
	
	
	Check_If_Car_Is_Flipped();
	
		
	
	// Calculate the position the ai car should drive towards
	targetPosition = activeWayPoint.CalculateTargetPosition (transform.position);
	// Apply forces, steer the wheels
	UpdateWithTargetPosition (targetPosition);
	
	//El vector de direccion hacia el objetivo
	var dir = ( targetPosition - transform.position).normalized;
	
	
	if(Physics.Raycast(transform.position, transform.forward, hit, 20))
	{
		if(hit.transform != transform && hit.collider.name == "Cube"){
			Debug.DrawLine(transform.position, hit.point, Color.red);
		
			dir += hit.normal * 20;
			hasHit = true;
		}
	}
	
	var leftR = transform.position;
	var rightR = transform.position;
	
	leftR.x -= 2;
	rightR.x += 2;
	
		
	if(Physics.Raycast(leftR, transform.forward, hit, 20)){
		
		if(hit.transform != transform && hit.collider.name == "Cube"){
			Debug.DrawLine(leftR, hit.point, Color.red);
			dir += hit.normal * 20;
			hasHit = true;
		}
	}
	
	if(Physics.Raycast(rightR, transform.forward, hit, 20)){
		
		if(hit.transform != transform && hit.collider.name == "Cube"){
			Debug.DrawLine(rightR, hit.point, Color.red);
			dir += hit.normal * 20;
			hasHit = true;
		}
	}
	
	
		
	var rot = Quaternion.LookRotation(dir);
	
	transform.rotation = Quaternion.Slerp(transform.rotation,rot, Time.deltaTime);

	if(hasHit)transform.position += transform.forward * 20 * Time.deltaTime;

	
	
	
}


function OnTriggerEnter (triggerWaypoint : Collider) {

	if (activeWayPoint.GetComponent.<Collider>() == triggerWaypoint) {
		activeWayPoint = activeWayPoint.next;
	}

	if(oneShot) oneShot = false;

}

function OnTriggerExit (triggerWaypoint : Collider){
	

	if(!oneShot)
	{
	totalWayPointsEnem = (lapEnem - 1) * 71 + WayPoint.actualEnemy + 1;
	
	
	
         
    if (/*WayPoint.start.collider == triggerWaypoint &&*/ sigPuntoEnem == 0 && WayPoint.actualEnemy == 70) 
    {
    	
    	lapEnem += 1;
    
    }
    
    if(lapEnem == UpdateScript.lapsToRun)
    {
    	Time.timeScale = 0.0;  
    	SoundController.BackgroundMusicVolume = 0.0;
    	SoundController.FXVolume = 0.0;
    	
    	UpdateScript.isOver = true;
    	
    	menuFinal = GetComponent("FinalMenuLose"); 
		menuFinal.enabled = true;

    	
    }
    
    oneShot = true;
    
	}
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

 function Check_If_Car_Is_Blocked()
{
	if(GetComponent.<Rigidbody>().velocity.magnitude >= 0.0 && GetComponent.<Rigidbody>().velocity.magnitude <= 0.1 )
			
			resetTimer2 += Time.deltaTime;
	
	else resetTimer2 = 0.0;
	
	if(resetTimer2 > resetTime2)
		return true;
	else
		return false;
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
