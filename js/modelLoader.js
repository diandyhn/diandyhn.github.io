class ModelLoader {
    constructor(scene, loadingInfoElement) {
        this.scene = scene;
        this.loadingInfo = loadingInfoElement;
    }

    loadModel(mtlPath, objPath) {
        const mtlLoader = new THREE.MTLLoader();
        
        mtlLoader.load(
            mtlPath,
            (materials) => {
                materials.preload();
                this.loadOBJ(objPath, materials);
            },
            (xhr) => {
                this.loadingInfo.textContent = `Loading materials: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`;
            },
            (error) => {
                this.loadingInfo.textContent = 'Error loading materials';
                console.error('MTL loading error:', error);
            }
        );
    }

    loadOBJ(objPath, materials) {
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load(
            objPath,
            (object) => {
                // Center the object
                const box = new THREE.Box3().setFromObject(object);
                const center = box.getCenter(new THREE.Vector3());
                object.position.sub(center);

                // Optionally scale the object if it's too big or small
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 10) {
                    const scale = 10 / maxDim;
                    object.scale.set(scale, scale, scale);
                }

                // Add shadow casting/receiving to all meshes
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                this.scene.add(object);
                this.loadingInfo.textContent = 'Model loaded successfully!';
                setTimeout(() => this.loadingInfo.style.display = 'none', 2000);
            },
            (xhr) => {
                this.loadingInfo.textContent = `Loading model: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`;
            },
            (error) => {
                this.loadingInfo.textContent = 'Error loading model';
                console.error('OBJ loading error:', error);
            }
        );
    }
}
