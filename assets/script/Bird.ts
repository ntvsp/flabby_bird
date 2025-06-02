import { _decorator, Component, Node } from 'cc';
import { GameControl } from './GameControl';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: Node,
        tooltip: "Bird node",
    })
    public birdNode: Node;


    @property({
        type: GameControl,
        tooltip: "Reference to the GameControl script instance",
    })
    public gameControl: GameControl;

    public isFlying = false;

    public velocity: number = 0;
    public gravityUp: number = 0; // Sẽ tính lại mỗi lần nhảy
    public gravityDown: number = -2000; // Tăng gravity để rơi nhanh hơn
    public isRising: boolean = false;
    public jumpDuration: number = 0.1; // Thời gian bay lên (giây)
    private jumpTimer: number = 0;
    public jumpHeight: number = 200; // Độ cao bird sẽ đạt được mỗi lần nhảy

    onLoad() {
        // Đăng ký sự kiện touch trên Canvas thay vì node Bird
        const canvas = this.node.scene.getChildByName('Canvas');
        if (canvas) {
            canvas.on('touch-end', this.onTapScreen, this);
        }
    }

    onDestroy() {
        const canvas = this.node.scene.getChildByName('Canvas');
        if (canvas) {
            canvas.off('touch-end', this.onTapScreen, this);
        }
    }

    private onTapScreen() {
        if (this.gameControl.gameRunning) {
            // Nếu đang bay lên, chỉ reset lại jumpTimer và velocity, không cộng dồn
            this.isRising = true;
            this.jumpTimer = 0;
            this.gravityUp = -2 * this.jumpHeight / (this.jumpDuration * this.jumpDuration);
            this.velocity = -this.gravityUp * this.jumpDuration;
        }
    }

    public gameStart() {

    }

    private checkIfDead() {
        if (!this.gameControl.isGameOver) {
            // Check if bird touches the ground
            if (this.birdNode.y <= -582.737) {
                this.birdNode.y = 0;
                this.gameControl.endGame(100);
            }
        }

    }

    update(deltaTime: number) {
        if (this.gameControl.gameRunning) {
            if (this.isRising) {
                this.velocity += this.gravityUp * deltaTime;
                this.jumpTimer += deltaTime;
                if (this.jumpTimer >= this.jumpDuration) {
                    this.isRising = false;
                    // Khi kết thúc bay lên, set velocity về 0 để tránh cộng dồn vận tốc rơi
                    this.velocity = 0;
                }
            } else {
                this.velocity += this.gravityDown * deltaTime;
            }
            this.birdNode.y += this.velocity * deltaTime;
            this.checkIfDead();
        }
    }
}

