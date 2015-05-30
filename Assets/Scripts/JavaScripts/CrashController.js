var sound : SoundController;
sound = transform.root.GetComponent(SoundController);

private var car : Car;

car = transform.GetComponent(Car);

private var volumeFactor : float;

private var soundAux : SoundController;

function OnCollisionEnter(collInfo : Collision)
{
	if(enabled && collInfo.contacts.Length > 0)
	{
		
		soundAux = this.GetComponent( "SoundController" );
		
		if(soundAux.effectsPlaying)
		{
		
		volumeFactor = Mathf.Clamp01(collInfo.relativeVelocity.magnitude * 0.08);
		volumeFactor *= Mathf.Clamp01(0.3 + Mathf.Abs(Vector3.Dot(collInfo.relativeVelocity.normalized, collInfo.contacts[0].normal)));
		volumeFactor = volumeFactor * 0.5 + 0.5;
		}
		
		else
		volumeFactor = 0.0;
		
		sound.Crash(volumeFactor);
	}
}


