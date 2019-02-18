/* -- A listener to ensure the fonts we need to use have been loaded */

if (document.documentElement.className.indexOf( "fonts-loaded" ) < 0 ) {
    var fontello = new FontFaceObserver("fontello", {
    });
    var AganeExtraBold = new FontFaceObserver("Agane Extra Bold", {
        weight: 900,
    });
    var AganeBold = new FontFaceObserver("Agane Bold", {
        weight: 'bold',
    });
    var AganeRegular = new FontFaceObserver("Agane Regular", {
    });
    var AganeLight = new FontFaceObserver("Agane Light", {
        weight: 300,
    });

    Promise.all([
        fontello.load(),
        AganeExtraBold.load(),
        AganeBold.load(),
        AganeRegular.load(),
        AganeLight.load(),
    ]).then(function() {

      document.documentElement.className += " fonts-loaded";
      Cookie.set('fonts-loaded', 1, { expires: '7D', secure: true });
    });
}
