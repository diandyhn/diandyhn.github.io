// Scene setup and configuration
class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x333333);
        
        // Setup camera
        this.setupCamera();
        
        // Setup renderer
        this.setupRenderer();
        
        // Setup lights
        this.setupLights();
        
        // Setup controls
        this.setupControls();
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near plane
            1000 // Far plane
        );
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Directional light (sun-like)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point light
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, 3, -5);
        this.scene.add(pointLight);

        // Optional: Add helpers for debugging
        // this.scene.add(new THREE.DirectionalLightHelper(directionalLight));
        // this.scene.add(new THREE.PointLightHelper(pointLight));
    }

    // Add this check before using OrbitControls
setupControls() {
    if (typeof THREE.OrbitControls === 'function') {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 50;
        this.controls.maxPolarAngle = Math.PI / 2;
    } else {
        console.warn('OrbitControls not loaded');
    }
}

// And modify the animate method to check for controls
animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.controls) {
        this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
}

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

 
}
