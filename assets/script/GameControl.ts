import { _decorator, CCInteger, Component, ConeCollider, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './ground';
import { Results } from './Results';

@ccclass('GameControl')
export class GameControl extends Component {

    // import ground component from './ground';


    public isGameOver: boolean = true;
    public gameRunning: boolean = false;

    public maxScore: number = 0;
    public currentScore: number = 0;

    @property({
        type: CCInteger,
        tooltip: "Game speed",
    })
    public gameSpeed: number = 10;

    currentTime: number = 0;

    @property({
        type: CCInteger,
        tooltip: "Game speed",
    })
    public pipeSpeed: number = 200;

    private initListeners() {
        // this.ground = this.node.getComponent(Ground);
        // this.ground.initGroundWidths();
        // this.ground.setInitialGroundPositions();     

    }

    public startGame() {
        this.isGameOver = false;
        this.gameRunning = true;
        this.currentScore = 0;
    }

    public endGame(score: number) {
        this.currentScore = score;
        this.maxScore = Math.max(score, this.maxScore);
        this.isGameOver = true;
        this.gameRunning = false;
    }

    async start() {

    }

    update(deltaTime: number) {
        // update results 3 seconds add 1 score
        if (this.currentTime > 1) {

            this.currentTime = 0;
        }
        this.currentTime += deltaTime;
    }
}

