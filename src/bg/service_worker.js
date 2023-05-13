chrome.commands.onCommand.addListener(function(command) {
  if (command === 'mi_comando') {
    // Constantes
    const googleStart = "https://www.google.com/search?q="

    // Variables
    var openInNewTab = false

    // Obtener la pestaña activa
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Obtener la URL de la pestaña activa
      var url = tabs[0].url;

      // Si NO es una búsqueda de google
      if (! url.startsWith(googleStart)){
        // Hacerlo una búsqueda de google
        url = googleStart + encodeURIComponent(url)

        // Indicar que se deberá abrir en una nueva pestaña
        openInNewTab = true
      }
      
      // Agregar el sufijo deseado a la URL
      var nuevaUrl = url + '&tbs=cdr:1,cd_min:1/1/0';
      
      // Crear o Actualizar Tab
      if (openInNewTab){
        chrome.tabs.create({url: nuevaUrl})
      }
      else {
        // Actualizar la URL de la pestaña activa
        chrome.tabs.update(tabs[0].id, {url: nuevaUrl});
      }
      

    });
  }
});