import { SceneManager } from './sceneSetup.js';
import { ModelLoader } from './modelLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    const sceneManager = new SceneManager();
    
    const modelLoader = new ModelLoader(
        sceneManager.scene,
        document.getElementById('loading-info')
    );

    // Update these paths to match your file structure
    modelLoader.loadModel(
        './models/frozz.mtl',
        './models/frozz.obj'
    );

    sceneManager.animate();
});