class Playground {
    static CreateScene(engine, canvas) {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 25, 0), scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
        // Our built-in 'sphere' shape. Params: name, options, scene
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
        // Move the sphere upward 1/2 its height
        sphere.position.y = -2;
        // Our built-in 'ground' shape. Params: name, options, scene
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

        var groundMat = new BABYLON.StandardMaterial("Ground Material", scene);
        groundMat.diffuseColor = BABYLON.Color3.Gray();
        ground.material = groundMat;

        BABYLON.SceneLoader.ImportMesh("",
            Assets.meshes.Yeti.rootUrl,
            Assets.meshes.Yeti.filename, scene, function (newMeshes) {
                newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)

            }
        )

        var sound = new BABYLON.Sound("birds-river-nature-ambient.mp3", "sound/birds-river-nature-ambient.mp3",
            scene, function () {
                sound.play()
            })

        this.createHouse(scene)
       

        return scene;
    }


    static createHouse(scene){
        const roof = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
        roof.position.z = -5;

        const boxHouse = BABYLON.MeshBuilder.CreateBox("boxHouse", { height: 1.3, width: 1.2, deep: 1.3});
        boxHouse.position.y = 0.4
        boxHouse.position.z = -5;


        const roofMat = new BABYLON.StandardMaterial("woodMat");
        var woodTexture = new BABYLON.WoodProceduralTexture("woodTex", 1024, scene);
        woodTexture.ampScale = 80.0;
        roofMat.diffuseTexture = woodTexture;
        roofMat.specularTexture = woodTexture; //new BABYLON.Color3.FromHexString("#f6dea6").toLinearSpace();


        const houseMat = new BABYLON.StandardMaterial("brickMat");
        houseMat.diffuseTexture =  new BABYLON.BrickProceduralTexture("brickTex", 512, scene);

        boxHouse.material = houseMat
        roof.material = roofMat
    }
}
