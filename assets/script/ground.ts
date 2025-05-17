import { _decorator, Component, Node } from 'cc';
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

    start() {

    }

    update(deltaTime: number) {

    }
}

