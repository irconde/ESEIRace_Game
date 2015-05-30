# ESEIRace_Game

  ..:: INTRODUCCIÓN ::..


   ESEI Race es un juego de carreras ambientado en el Campus de Ourense
   de la Universidade de Vigo.
   El proyecto fue iniciado durante la asignatura "Videojuegos 3D" del
   Posgrado de Diseño y Programación de Videojuegos de la UOC.
   El desarrollo ha sido realizado con el motor de videojuegos multi-
   plataforma Unity3, en su versión 3.3. Inicialmente dirigido su produc-
   ción a equipos informáticos PC o Mac, finalmente ha sido portado a
   Android.



   ..:: COMPILACIÓN ::..


   Para compilar el proyecto es necesario disponer de cualquiera de las
   modalidades de Unity 3-5, ya sea la versión gratuita o la Pro, y de uno de
   los dos complementos disponibles para desarrollar para Android con Unity.
   Además, es indispensable tener correctamente instalado el SDK de Android
   en nuestro equipo.

   Una vez descargado y lanzado Unity3, basta con ir al menú File
   y hacer click sobre la opción Open Project para abrir un proyecto.
   En caso de que queramos abrir un nuevo proyecto por primera vez es
   preciso pulsar sobre el botón Open Other... y desde el explorador
   de archivos seleccionar el directorio donde están almacenados todos
   los archivos fuente del proyecto.

   En el proceso de carga del nuevo proyecto, la suite se encarga de
   compilarlo automáticamente. Este comportamiento será una constante
   durante todo el desarrollo: con cualquier cambio que hagamos en el
   proyecto, éste será compilado de nuevo automáticamente.

   En general, cada proyecto contiene varias escenas. En nuestro caso,
   ESEI Race consta de tres escenas: la escena del menú principal, la escena
   de precarga del juego, y la escena principal del juego. Para poder hacer
   debug y testear cada escena, basta con hacer doble click sobre la escena
   deseada en la ventana Project y una vez cargada, pulsar sobre el botón de
   play situado bajo la barra de menús. En caso de implementar alguna fun-
   cionalidad que demande el uso de ciertos elementos hardware que Unity no
   puede simular(en nuestro caso, la pantalla multitácticl y el acelerómetro)
   podemos hacer uso de Unity Remote. Unity Remote es una aplicación que
   podemos descargar desde el Android Market en nuestro dispositivo móvil
   y que nos permite utilizar dicho dispositivo como un control remoto.
   Una vez instalado Unity Remote, debemos conectar el dispositivo en modo
   Debug mediante un cable USB y pulsar de nuevo el botón de play para
   lanzar la escena y finalmente testearla.           .

   Finalmente, para construir el proyecto y crear el ejecutable, basta
   con hacer click sobre la opción Build & Run o sobre la opción Build del menú
   File. En caso de ser la primera vez que lanzamos el proceso de creación del
   .apk final, el propio Unity nos solicitará la ubicación del SDK Android.
   Basta con navegar por el explorador de archivos de nuestro sistema operativo
   y localizar el directorio de instalación del SDK. Por último, y en caso de
   haber pulsado sobre la opción Build & Run, debemos cerciorarnos de que hemos
   conectado a nuestro equipo el dispositivo sobre el que queremos lanzar la
   aplicación y éste se encuentra en modo Debug.
