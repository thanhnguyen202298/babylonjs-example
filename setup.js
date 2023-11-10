
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function (canvas) {
    return new BABYLON.Engine(canvas, true,
        { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
};

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}
 
createScene = function () { return Playground.CreateScene(engine, engine.getRenderingCanvas()); }
        
window.initFunction = async function (canvas) {



    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine(canvas);
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine(canvas);
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
    sceneToRender = scene;
};