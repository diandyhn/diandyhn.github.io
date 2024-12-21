// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Create scene manager
    const sceneManager = new SceneManager();
    
    // Create model loader
    const modelLoader = new ModelLoader(
        sceneManager.scene,
        document.getElementById('loading-info')
    );

    // Load your model (replace with your model paths)
    modelLoader.loadModel(
        './models/frozz.mtl',
        './models/frozz.obj'
    );

    // Start animation loop
    sceneManager.animate();
});
