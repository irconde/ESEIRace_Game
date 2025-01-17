private var wheelRadius : float = 0.4;
var suspensionRange : float = 0.1;
var suspensionDamper : float = 50;
var suspensionSpringFront : float = 18500;
var suspensionSpringRear : float = 9000;

public var brakeLights : Material;

var dragMultiplier : Vector3 = new Vector3(2, 5, 1);

var throttle : float = 0; 
private var steer : float = 0;
private var handbrake : boolean = false;

var centerOfMass : Transform;

var frontWheels : Transform[];
var rearWheels : Transform[];

private var wheels : Wheel[];
wheels = new Wheel[frontWheels.Length + rearWheels.Length];

private var wfc : WheelFrictionCurve;

var topSpeed : float = 160;
var numberOfGears : int = 5;

var maximumTurn : int = 15;
var minimumTurn : int = 10;

var resetTime : float = 5.0;


private var resetTimer : float = 0.0;

private var accelerationTimer  : float = 0.0;

private var engineForceValues : float[];
private var gearSpeeds : float[];

private var currentGear : int;
var currentEnginePower : float = 0.0;

private var handbrakeXDragFactor : float = 0.5;
private var initialDragMultiplierX : float = 10.0;
private var handbrakeTime : float = 0.0;
private var handbrakeTimer : float = 1.0;

private var canSteer : boolean;
private var canDrive : boolean;

private var oneShot : boolean;

private var totalWayPointsEnemy : int = 0;
//---------------- PARA LA CREACI�N DEL HUD ------------------

var fondoLabel : Texture2D;

var fuente : Font;

private var ellapsedTime : float;

private var bestTime : float;

private var startTime : float;

public var speedCar : float;

private var firstTime : boolean;

private var lap : int;

static var sigPunto : int;

private var totalWayPoints : int;

private var posCarrera : int;

private var lightGrey : Color = Color(0.8, 0.8, 0.8);

private var eggYellow : Color = Color(0.945, 0.656, 0.14);

private var redColor : Color = Color(0.82, 0.137, 0.21);


private var steerMaxAngle =  40.0;


private var menuFinal : FinalRaceMenu;

private var cadPos : String;

private var wheel : Wheel;


class Wheel
{
	var collider : WheelCollider;
	var wheelGraphic : Transform;
	var tireGraphic : Transform;
	var driveWheel : boolean = false;
	var steerWheel : boolean = false;
	var wheelVelo : Vector3 = Vector3.zero;
	var groundSpeed : Vector3 = Vector3.zero;
}
private var normPower : float;

function Start()
{	
	totalWayPointsEnemy = 0;
	
	cadPos = "-";
		
	// Measuring 1 - 60
	accelerationTimer = Time.time;
	
	SetupWheelColliders();
	
	SetupCenterOfMass();
	
	topSpeed = Convert_Miles_Per_Hour_To_Meters_Per_Second(topSpeed);
	
	SetupGears();
	
	initialDragMultiplierX = dragMultiplier.x;
	
	//------------- PARA EL DIBUJADO DEL HUD -------------
	
	ellapsedTime = 0.0;
	
	bestTime = 0.0;

	startTime = Time.time;
	
	speedCar = 0.0; 
	
	firstTime = true;
	
	lap = 1;
	
	sigPunto = 0;
	
	totalWayPoints = 0;
	
	posCarrera = 1;
	
	
	oneShot = false;
}

function Update()
{	
	
	var relativeVelocity : Vector3 = transform.InverseTransformDirection(GetComponent.<Rigidbody>().velocity);
	
	var enemigo : EnemyCar;
	
	GetInput();
	
	Check_If_Car_Is_Flipped();
	
	UpdateWheelGraphics(relativeVelocity);
	
	UpdateGear(relativeVelocity);
	
	speedCar = relativeVelocity.magnitude;
	
	
	if(!firstTime)
   		ellapsedTime = Time.time - startTime;
   	
   	 	
   	
   	enemigo = GameObject.Find("EnemyCar").GetComponent("EnemyCar");
   	
   	totalWayPointsEnemy = enemigo.totalWayPointsEnem;
   	
   	if(totalWayPointsEnemy != totalWayPoints) 
   	{
   		if(totalWayPointsEnemy > totalWayPoints)
   			posCarrera = 2;
   		else posCarrera = 1;
   	}
   	else 
   	{
   		
   		var posCoche = this.transform.position;
   		var posEnemigo = GameObject.Find("EnemyCar").transform.position;
   		
   		if(WayPoint.actualWaypoint != null)
		var posPuntoControlSig = WayPoint.actualWaypoint.next.transform.position;
		
		var distCoche = Vector3.Distance(posPuntoControlSig, posCoche);
		var distEnemy = Vector3.Distance(posPuntoControlSig, posEnemigo);
		
		if(distCoche > distEnemy) posCarrera = 2;
		else posCarrera = 1;
		
   	}
   	
   	
   	// Reseteamos la posici�n del coche al ultimo punto de control alcanzado y en direccion al siguiente punto de control
   	/*
   	if (Input.GetKeyUp("r"))
    {
       transform.position = WayPoint.actualWaypoint.transform.position;
       
      var dir = ( WayPoint.actualWaypoint.next.transform.position - transform.position).normalized;
      
      var rot = Quaternion.LookRotation(dir);
	
	  transform.rotation = rot;
       
    }

	*/
}

function FixedUpdate()
{	
	// The rigidbody velocity is always given in world space, but in order to work in local space of the car model we need to transform it first.
	var relativeVelocity : Vector3 = transform.InverseTransformDirection(GetComponent.<Rigidbody>().velocity);
	
	CalculateState();	
	
	UpdateFriction(relativeVelocity);
	
	UpdateDrag(relativeVelocity);
	
	CalculateEnginePower(relativeVelocity);
	
	ApplyThrottle(canDrive, relativeVelocity);
	
	ApplySteering(canSteer, relativeVelocity);
}

/**************************************************/
/* Functions called from Start()                  */
/**************************************************/

function SetupWheelColliders()
{
	SetupWheelFrictionCurve();
		
	var wheelCount : int = 0;
	
	for (var t : Transform in frontWheels)
	{
		wheels[wheelCount] = SetupWheel(t, true);
		wheelCount++;
	}
	
	for (var t : Transform in rearWheels)
	{
		wheels[wheelCount] = SetupWheel(t, false);
		wheelCount++;
	}
}

function SetupWheelFrictionCurve()
{
	wfc = new WheelFrictionCurve();
	wfc.extremumSlip = 1;
	wfc.extremumValue = 50;
	wfc.asymptoteSlip = 2;
	wfc.asymptoteValue = 25;
	wfc.stiffness = 1;
}

function SetupWheel(wheelTransform : Transform, isFrontWheel : boolean)
{
	var go : GameObject = new GameObject(wheelTransform.name + " Collider");
	go.transform.position = wheelTransform.position;
	go.transform.parent = transform;
	go.transform.rotation = wheelTransform.rotation;
		
	var wc : WheelCollider = go.AddComponent(typeof(WheelCollider)) as WheelCollider;
	wc.suspensionDistance = suspensionRange;
	var js : JointSpring = wc.suspensionSpring;
	
	if (isFrontWheel)
		js.spring = suspensionSpringFront;
	else
		js.spring = suspensionSpringRear;
		
	js.damper = suspensionDamper;
	wc.suspensionSpring = js;
		
	wheel = new Wheel(); 
	wheel.collider = wc;
	wc.sidewaysFriction = wfc;
	wheel.wheelGraphic = wheelTransform;
	wheel.tireGraphic = wheelTransform.GetComponentsInChildren(Transform)[1];
	
	wheelRadius = wheel.tireGraphic.GetComponent.<Renderer>().bounds.size.y / 2;	
	wheel.collider.radius = wheelRadius;
	
	if (isFrontWheel)
	{
		wheel.steerWheel = true;
		
		go = new GameObject(wheelTransform.name + " Steer Column");
		go.transform.position = wheelTransform.position;
		go.transform.rotation = wheelTransform.rotation;
		go.transform.parent = transform;
		wheelTransform.parent = go.transform;
	}
	else
		wheel.driveWheel = true;
		
	return wheel;
}

function SetupCenterOfMass()
{
	if(centerOfMass != null)
		GetComponent.<Rigidbody>().centerOfMass = centerOfMass.localPosition;
}

function SetupGears()
{
	engineForceValues = new float[numberOfGears];
	gearSpeeds = new float[numberOfGears];
	
	var tempTopSpeed : float = topSpeed;
		
	for(var i = 0; i < numberOfGears; i++)
	{
		if(i > 0)
			gearSpeeds[i] = tempTopSpeed / 4 + gearSpeeds[i-1];
		else
			gearSpeeds[i] = tempTopSpeed / 4;
		
		tempTopSpeed -= tempTopSpeed / 4;
	}
	
	var engineFactor : float = topSpeed / gearSpeeds[gearSpeeds.Length - 1];
	
	for(i = 0; i < numberOfGears; i++)
	{
		var maxLinearDrag : float = gearSpeeds[i] * gearSpeeds[i];// * dragMultiplier.z;
		engineForceValues[i] = maxLinearDrag * engineFactor;
	}
}



/**************************************************/
/* Functions called from Update()                 */
/**************************************************/

function GetInput()
{
	
	if(Input.touchCount > 0)
	{
    	
    	var touch: Touch = Input.touches[0]; 

	
    	if (touch.position.x > Screen.width * 0.5 && touch.phase != TouchPhase.Ended &&  touch.phase != TouchPhase.Canceled)

    	{
       			if(throttle < 1.0) throttle += 0.1;
       			
       			
    	} 
    	
    	else if (touch.position.x < Screen.width * 0.5 && touch.phase != TouchPhase.Ended &&  touch.phase != TouchPhase.Canceled)

    	{
       			if(throttle > -1.0 )throttle -= 0.1;
    	}
    	
    	
    	if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled) 
    	{
    		
    		throttle = 0.0;
    	}
    	
    	
    	
	}
	
	
	steer = -Input.acceleration.y;
	
		
	CheckHandbrake();
}

function CheckHandbrake()
{
	if(Input.GetKey("space"))
	{
		if(!handbrake)
		{
			handbrake = true;
			handbrakeTime = Time.time;
			dragMultiplier.x = initialDragMultiplierX * handbrakeXDragFactor;
		}
	}
	else if(handbrake)
	{
		handbrake = false;
		StartCoroutine(StopHandbraking(Mathf.Min(5, Time.time - handbrakeTime)));
	}
}

function StopHandbraking(seconds : float)
{
	var diff : float = initialDragMultiplierX - dragMultiplier.x;
	handbrakeTimer = 1;
	
	// Get the x value of the dragMultiplier back to its initial value in the specified time.
	while(dragMultiplier.x < initialDragMultiplierX && !handbrake)
	{
		dragMultiplier.x += diff * (Time.deltaTime / seconds);
		handbrakeTimer -= Time.deltaTime / seconds;
		yield;
	}
	
	dragMultiplier.x = initialDragMultiplierX;
	handbrakeTimer = 0;
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

var wheelCount : float;
function UpdateWheelGraphics(relativeVelocity : Vector3)
{
	wheelCount = -1;
	
	for(var w : Wheel in wheels)
	{
		wheelCount++;
		var wheel : WheelCollider = w.collider;
		var wh : WheelHit = new WheelHit();
		
		
		
		if(wheel.GetGroundHit(wh))
		{
			w.wheelVelo = GetComponent.<Rigidbody>().GetPointVelocity(wh.point);
			w.groundSpeed = w.wheelGraphic.InverseTransformDirection(w.wheelVelo);
			
			
		}
		else
		{
						
			if(w.steerWheel)
				w.wheelVelo *= 0.9;
			else
				w.wheelVelo *= 0.9 * (1 - throttle);
			

		}
		
		
		if(w.steerWheel)
		{
			var ea : Vector3 = w.wheelGraphic.parent.localEulerAngles;
			ea.y = steer * maximumTurn;
			w.wheelGraphic.parent.localEulerAngles = ea;
			w.tireGraphic.Rotate(Vector3.right * (w.groundSpeed.z / wheelRadius) * Time.deltaTime * Mathf.Rad2Deg);
		}
		else if(!handbrake && w.driveWheel)
		{
			
			w.tireGraphic.Rotate(Vector3.right * (w.groundSpeed.z / wheelRadius) * Time.deltaTime * Mathf.Rad2Deg);
		}
	}
}

function UpdateGear(relativeVelocity : Vector3)
{
	currentGear = 0;
	for(var i = 0; i < numberOfGears - 1; i++)
	{
		if(relativeVelocity.z > gearSpeeds[i])
			currentGear = i + 1;
	}
}

/**************************************************/
/* Functions called from FixedUpdate()            */
/**************************************************/

function UpdateDrag(relativeVelocity : Vector3)
{
	var relativeDrag : Vector3 = new Vector3(	-relativeVelocity.x * Mathf.Abs(relativeVelocity.x), 
												-relativeVelocity.y * Mathf.Abs(relativeVelocity.y), 
												-relativeVelocity.z * Mathf.Abs(relativeVelocity.z) );
	
	var drag = Vector3.Scale(dragMultiplier, relativeDrag);
		
	if(initialDragMultiplierX > dragMultiplier.x) // Handbrake code
	{			
		drag.x /= (relativeVelocity.magnitude / (topSpeed / ( 1 + 2 * handbrakeXDragFactor ) ) );
		drag.z *= (1 + Mathf.Abs(Vector3.Dot(GetComponent.<Rigidbody>().velocity.normalized, transform.forward)));
		drag += GetComponent.<Rigidbody>().velocity * Mathf.Clamp01(GetComponent.<Rigidbody>().velocity.magnitude / topSpeed);
	}
	else // No handbrake
	{
		drag.x *= topSpeed / relativeVelocity.magnitude;
	}
	
	if(Mathf.Abs(relativeVelocity.x) < 5 && !handbrake)
		drag.x = -relativeVelocity.x * dragMultiplier.x;
		

	GetComponent.<Rigidbody>().AddForce(transform.TransformDirection(drag) * GetComponent.<Rigidbody>().mass * Time.deltaTime);
}

function UpdateFriction(relativeVelocity : Vector3)
{
	var sqrVel : float = relativeVelocity.x * relativeVelocity.x;
	
	// Add extra sideways friction based on the car's turning velocity to avoid slipping
	wfc.extremumValue = Mathf.Clamp(300 - sqrVel, 0, 300);
	wfc.asymptoteValue = Mathf.Clamp(150 - (sqrVel / 2), 0, 150);
		
	for(var w : Wheel in wheels)
	{
		w.collider.sidewaysFriction = wfc;
		w.collider.forwardFriction = wfc;
	}
}

function CalculateEnginePower(relativeVelocity : Vector3)
{
	if(throttle == 0)
	{
		currentEnginePower -= Time.deltaTime * 200;
	}
	else if( HaveTheSameSign(relativeVelocity.z, throttle) )
	{
		normPower = (currentEnginePower / engineForceValues[engineForceValues.Length - 1]) * 2;
		currentEnginePower += Time.deltaTime * 200 * EvaluateNormPower(normPower);
	}
	else
	{
		currentEnginePower -= Time.deltaTime * 300;
	}
	
	if(currentGear == 0)
		currentEnginePower = Mathf.Clamp(currentEnginePower, 0, engineForceValues[0]);
	else
		currentEnginePower = Mathf.Clamp(currentEnginePower, engineForceValues[currentGear - 1], engineForceValues[currentGear]);
}

function CalculateState()
{
	canDrive = false;
	canSteer = false;
	
	for(var w : Wheel in wheels)
	{
		if(w.collider.isGrounded)
		{
			if(w.steerWheel)
				canSteer = true;
			if(w.driveWheel)
				canDrive = true;
		}
	}
}

function ApplyThrottle(canDrive : boolean, relativeVelocity : Vector3)
{
	if(canDrive)
	{
		var throttleForce : float = 0;
		var brakeForce : float = 0;
		
		if (HaveTheSameSign(relativeVelocity.z, throttle))
		{
			if (!handbrake)
				throttleForce = Mathf.Sign(throttle) * currentEnginePower * GetComponent.<Rigidbody>().mass;
		}
		else
			brakeForce = Mathf.Sign(throttle) * engineForceValues[0] * GetComponent.<Rigidbody>().mass;
		
		GetComponent.<Rigidbody>().AddForce(transform.forward * Time.deltaTime * (throttleForce + brakeForce));
	}
}

function ApplySteering(canSteer : boolean, relativeVelocity : Vector3)
{
	if(canSteer)
	{
		var turnRadius : float = 3.0 / Mathf.Sin((90 - (steer * 30)) * Mathf.Deg2Rad);
		var minMaxTurn : float = EvaluateSpeedToTurn(GetComponent.<Rigidbody>().velocity.magnitude);
		var turnSpeed : float = Mathf.Clamp(relativeVelocity.z / turnRadius, -minMaxTurn / 10, minMaxTurn / 10);
		
		transform.RotateAround(	transform.position + transform.right * turnRadius * steer, 
								transform.up, 
								turnSpeed * Mathf.Rad2Deg * Time.deltaTime * steer);
		
		var debugStartPoint = transform.position + transform.right * turnRadius * steer;
		var debugEndPoint = debugStartPoint + Vector3.up * 5;
		
		Debug.DrawLine(debugStartPoint, debugEndPoint, Color.red);
		
		if(initialDragMultiplierX > dragMultiplier.x) // Handbrake
		{
			var rotationDirection : float = Mathf.Sign(steer); // rotationDirection is -1 or 1 by default, depending on steering
			if(steer == 0)
			{
				if(GetComponent.<Rigidbody>().angularVelocity.y < 1) // If we are not steering and we are handbraking and not rotating fast, we apply a random rotationDirection
					rotationDirection = Random.Range(-1.0, 1.0);
				else
					rotationDirection = GetComponent.<Rigidbody>().angularVelocity.y; // If we are rotating fast we are applying that rotation to the car
			}
			// -- Finally we apply this rotation around a point between the cars front wheels.
			transform.RotateAround( transform.TransformPoint( (	frontWheels[0].localPosition + frontWheels[1].localPosition) * 0.5), 
																transform.up, 
																GetComponent.<Rigidbody>().velocity.magnitude * Mathf.Clamp01(1 - GetComponent.<Rigidbody>().velocity.magnitude / topSpeed) * rotationDirection * Time.deltaTime * 2);
		}
	}
}

/**************************************************/
/*               Utility Functions                */
/**************************************************/

function Convert_Miles_Per_Hour_To_Meters_Per_Second(value : float) : float
{
	return value * 0.44704;
}

function Convert_Meters_Per_Second_To_Miles_Per_Hour(value : float) : float
{
	return value * 2.23693629;	
}

function HaveTheSameSign(first : float, second : float) : boolean
{
	if (Mathf.Sign(first) == Mathf.Sign(second))
		return true;
	else
		return false;
}

function EvaluateSpeedToTurn(speed : float)
{
	if(speed > topSpeed / 2)
		return minimumTurn;
	
	var speedIndex : float = 1 - (speed / (topSpeed / 2));
	return minimumTurn + speedIndex * (maximumTurn - minimumTurn);
}

function EvaluateNormPower(normPower : float)
{
	if(normPower < 1)
		return 10 - normPower * 9;
	else
		return 1.9 - normPower * 0.9;
}

function GetGearState()
{
	var relativeVelocity : Vector3 = transform.InverseTransformDirection(GetComponent.<Rigidbody>().velocity);
	var lowLimit : float = (currentGear == 0 ? 0 : gearSpeeds[currentGear-1]);
	return (relativeVelocity.z - lowLimit) / (gearSpeeds[currentGear - lowLimit]) * (1 - currentGear * 0.1) + currentGear * 0.1;
}



function TimerStart(){

  startTime = Time.time;  
        
}


function OnTriggerEnter (triggerWaypoint : Collider) {

		
	if(oneShot)oneShot = false;

}

function OnTriggerExit (triggerWaypoint : Collider){
	
	if(!oneShot)
	{
	
		totalWayPoints = (lap - 1) * 71 + WayPoint.actual + 1;
	
	
	if(firstTime) firstTime = false;
         
    if (sigPunto == 0 && WayPoint.actual == 70 && WayPoint.idMaxAlcanzado == 70) 
    {
    	TimerStart();
    	lap += 1;
    	
    	if(firstTime){ 
        	
        	
        	bestTime = 0.0; 
        }
        
        else if (bestTime == 0 || ellapsedTime < bestTime) bestTime = ellapsedTime;
		
    
    }
    
    //En caso de que pase por meta el primero tras recorrer el n�mero de vueltas
    
    if(lap == UpdateScript.lapsToRun)
    {
    	Time.timeScale = 0.0;  
    	SoundController.BackgroundMusicVolume = 0.0;
    	SoundController.FXVolume = 0.0;
    	
    	UpdateScript.isOver = true;
    	
    	menuFinal = GetComponent("FinalRaceMenu"); 
		menuFinal.enabled = true;
	
    }
    
     oneShot = true;
       
	}
}



function OnGUI()
{
	
	 
	var separacion = 0.03 * Screen.height * 1.5;
   	var altoLabel = 0.055 * Screen.height * 1.5;
   	
   	var anchoLabelLTime = altoLabel * 8.43;
   	var anchoLabelBTime = altoLabel * 7.4;
   	

	var offset : RectOffset = RectOffset(10, 0, 5, 0);
	var offset_2 : RectOffset = RectOffset(10, 0.25 * altoLabel, 5, 0.15 * altoLabel);
    
    var estilo1 : GUIStyle = GUIStyle();
   	estilo1.normal.textColor = lightGrey;
   	estilo1.normal.background = fondoLabel;
   	estilo1.padding = offset;
   	estilo1.font = fuente;
   	
   	
   	var estilo2 : GUIStyle = GUIStyle();
   	estilo2.normal.textColor = eggYellow;
   	estilo2.normal.background = fondoLabel;
   	estilo2.padding = offset_2;
   	estilo2.font = fuente;
   	
   	var estilo3 : GUIStyle = GUIStyle();
   	estilo3.normal.textColor = redColor;
   	estilo3.normal.background = fondoLabel;
   	estilo3.padding = offset;
   	estilo3.font = fuente;
   	
  
   	 GUI.Label(Rect(Screen.width - anchoLabelLTime, 1.25*separacion + altoLabel, anchoLabelLTime, altoLabel), "LAP TIME: " + System.TimeSpan.FromMinutes(ellapsedTime).ToString(), estilo2); 
   	GUI.Label(Rect(Screen.width - anchoLabelBTime, separacion, anchoLabelBTime, altoLabel), "BEST TIME: " + System.TimeSpan.FromMinutes(bestTime).ToString(), estilo1);
   	 
   	if(WayPoint.actual != WayPoint.idMaxAlcanzado) cadPos = "-";
   	else cadPos = posCarrera.ToString();
   	
   	GUI.Label(Rect(Screen.width - 105, 2 * altoLabel + 1.5 * separacion, 105, altoLabel), "POS " + cadPos, estilo3);
   	GUI.Label(Rect(Screen.width - 95, 3 * altoLabel + 1.75 * separacion, 95, altoLabel), "LAP "+ lap.ToString(), estilo1);
   	 
	
}


