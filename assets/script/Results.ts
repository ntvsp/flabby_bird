import { _decorator, CCInteger, Component, Label, math, Node } from 'cc';
import { GameControl } from './GameControl';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type: Label,
        tooltip: "scrore label",

    })
    public scoreLabel: Label;

    @property({
        type: GameControl,
        tooltip: "Reference to the GameControl script instance",
    })
    public gameControl: GameControl;

    // bird component



    @property({
        type: Label,
        tooltip: "high score label",

    })
    public highScoreLabel: Label;

    @property({
        type: Label,
        tooltip: "play again label",

    })
    public playAgain: Label;


    time: number = 0;

    updateScore(score: number) {
        if (!this.playAgain.node.active) {
            this.gameControl.currentScore += score;
            this.scoreLabel.string = this.gameControl.currentScore.toString();
        }


    }

    resetScore() {
        this.gameControl.currentScore = 0;
        this.hiddenResults();
    }

    showResults() {

        // show the results node
        this.scoreLabel.node.active = true;
        this.highScoreLabel.node.active = true;
        this.playAgain.node.active = true;

        // set the score label
        this.updateScore(this.gameControl.currentScore);
        this.scoreLabel.string = "Score: " + this.gameControl.currentScore;
        this.highScoreLabel.string = "High Score: " + this.gameControl.maxScore
    }

    hiddenResults() {
        // hidden the results node
        this.highScoreLabel.node.active = false;
        this.playAgain.node.active = false;
    }

    onLoad() {
        if (this.playAgain && this.playAgain.node) {
            this.playAgain.node.on('touch-end', this.onPlayAgainClicked, this);
        }
    }

    onDestroy() {
        if (this.playAgain && this.playAgain.node) {
            this.playAgain.node.off('touch-end', this.onPlayAgainClicked, this);
        }
    }

    onPlayAgainClicked() {
        this.resetScore();
        this.hiddenResults();
        this.gameControl.startGame();
    }

    start() {

    }

    update(deltaTime: number) {
        if (this.gameControl.isGameOver) {
            this.showResults()
        }
    }
}
