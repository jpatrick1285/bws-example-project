import Highway from '@dogstudio/highway';
import MainController from './MainController';

class DefaultRenderer extends Highway.Renderer {
    constructor(properties) {
        super(properties);
        this.mainController = new MainController();
    }
    // Hooks/methods
    onEnter() {
        this.mainController.init();
    }
    onLeave() {
        this.mainController.destroy();
    }
    onEnterCompleted() {
        
    }
    onLeaveCompleted() {
        
    }
}

// Don`t forget to export your renderer
export default DefaultRenderer;