window.addEventListener ("load", function () {
  var camera = document.getElementById ("camera");
  var play = document.getElementById ("play");
  var pause = document.getElementById ("pause");
  var stop = document.getElementById ("stop");
  var constraints = {audio:false, video:true};

  function success (stream) {
    camera.srcObject = stream;
    camera.play ();
  }

  function failure (error) {
    if (error.name === "NotAllowedError") {
      alert ("Permission to access camera was denied. Please allow access to use this feature.");
    } else {
      alert (JSON.stringify (error));
    }
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia (constraints).then(success).catch(failure);
  } else {
    alert ("Your browser does not support getUserMedia ()");
  }

  camera.play()

  play.addEventListener ("click", function () {
    camera.play ();
  }, false);

  pause.addEventListener ("click", function () {
    camera.pause ();
  }, false);

  stop.addEventListener ("click", function () {
    camera.pause ();
    camera.src = "";
  }, false);

});