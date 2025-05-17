import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ground')
export class ground extends Component {

    @property({
        type: Node,
        tooltip: "Ground 1 is here",
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: "Ground 2 is here",
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: "Ground 3 is here",
    })
    public ground3: Node;

    // create ground width variables

    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    public gameSpeed: number = 50;

    protected onLoad(): void {
        this.startUp();
    }

    private initGroundWidths() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;
    }

    private setInitialGroundPositions() {
        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    startUp() {
        this.initGroundWidths();
        this.setInitialGroundPositions();
    }

    start() {

    }

    private updateGroundPositions(deltaTime: number) {
        this.tempStartLocation1 = this.ground1.getPosition();
        this.tempStartLocation2 = this.ground2.getPosition();
        this.tempStartLocation3 = this.ground3.getPosition();
        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    private resetGroundIfNeeded() {
        if (this.tempStartLocation1.x <= -this.groundWidth1) {
            this.tempStartLocation1.x = this.tempStartLocation3.x + this.groundWidth3;
            this.ground1.setPosition(this.tempStartLocation1);
        }
        if (this.tempStartLocation2.x <= -this.groundWidth2) {
            this.tempStartLocation2.x = this.tempStartLocation1.x + this.groundWidth1;
            this.ground2.setPosition(this.tempStartLocation2);
        }
        if (this.tempStartLocation3.x <= -this.groundWidth3) {
            this.tempStartLocation3.x = this.tempStartLocation2.x + this.groundWidth2;
            this.ground3.setPosition(this.tempStartLocation3);
        }
    }

    update(deltaTime: number) {
        this.updateGroundPositions(deltaTime);
        this.resetGroundIfNeeded();
    }
}

