'use strict'

//ブラウザがページを完全に読みこむまで待つ
addEventListener('load', () => {

    //変数gameに、あなたはゲームですよ、と教える
    const game = new Game();//コンストラクタに引数を渡すと、画面のサイズを変える

    //マップの作成
    const map = [
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        [11, 10, 10, 10, 10, 10, 10, 10, 10, 11],
        [11, 4, 4, 4, 4, 4, 4, 4, 4, 11],
        [11, 4, 11, 4, 4, 11, 11, 11, 4, 11],
        [11, 4, 11, 11, 11, 11, 10, 10, 4, 11],
        [11, 4, 11, 10, 10, 11, 4, 4, 4, 11],
        [11, 4, 11, 4, 4, 11, 11, 11, 4, 11],
        [11, 4, 9, 4, 4, 9, 10, 11, 4, 11],
        [11, 4, 4, 4, 4, 4, 4, 11, 4, 11],
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
    ];
    //タイルのサイズ
    const TILE_SIZE = 32;
    //歩く速さ
    const WALKING_SPEED = 4;
    //変数sceneに、あなたはシーンですよ、と教える
    const scene = new Scene();

    //変数tilemapに、あなたはタイルマップですよ、と教える
    const tilemap = new Tilemap('img/tile.png');
    //tilemap.dataに、どんなマップなのか教える
    tilemap.data = map;
    //マップ全体の位置をずらす
    tilemap.x = TILE_SIZE * 4 - TILE_SIZE / 2;//タイル４つ分から半分を引いた分、マップを右に
    tilemap.y = TILE_SIZE * 3 - TILE_SIZE / 2;//タイル３つ分から半分を引いた分、マップを下に
    //移動できないタイルを指定する
    tilemap.obstacles = [0, 3, 6, 7, 8, 9, 10, 11];
    //マップを登録する
    scene.add(tilemap);

    //変数startに、あなたはスタートのタイルですよ、と教える
    const start = new Tile('img/start.png');
    //マップ左上からの座標を指定する
    start.x = TILE_SIZE;
    start.y = TILE_SIZE * 2;
    //スタートのタイルを、tilemapに追加して、とお願いする
    tilemap.add(start);

    //変数goalに、あなたはゴールのタイルですよ、と教える
    const goal = new Tile('img/goal.png');
    //マップ左上からの座標を指定する
    goal.x = TILE_SIZE * 8;
    goal.y = TILE_SIZE * 8;
    //ゴールのタイルを、tilemapに追加して、とお願いする
    tilemap.add(goal);

    //変数yamadaに、あなたは山田先生のスプライト画像ですよ、と教える
    //const yamada = new Sprite('img/yamada.png');
    //常に呼び出される。Spriteクラスのメソッドonenterframeをオーバーライド
    //yamada.onenterframe = () => {
    //キーが押されたとき、山田先生が移動する
    //if ( game.input.left ) yamada.x -= WALKING_SPEED;
    //if ( game.input.right ) yamada.x += WALKING_SPEED;
    //if ( game.input.up ) yamada.y -= WALKING_SPEED;
    //if ( game.input.down ) yamada.y += WALKING_SPEED;
    //} //yamada.onenterframe 終了
    //gameに、山田先生のスプライト画像を表示して、とお願いする
    //game.add(yamada);
    //sceneに、山田先生のスプライト画像を追加して、とお願いする
    //変数yamadaに、あなたは山田先生のタイルですよ、と教える
    //const yamada = new Tile('img/yamada.png');
    //変数yamadaに、あなたは山田先生のキャラクタータイルですよ、と教える
    const yamada = new CharacterTile('img/yamada.png');
    //山田先生を画面の中央に配置。キャンバス全体に表示できるタイルの数は＝縦横10枚→タイル5つ分から半分を引いた位置＝キャンバスの中心
    yamada.x = yamada.y = TILE_SIZE * 5 - TILE_SIZE / 2;
    //sceneに、山田先生のタイルを追加して、とお願いする
    //scene.add(yamada);
    //タイルマップの動きと同期させない
    yamada.isSynchronize = false;
    //tilemapに、山田先生のタイルを追加して、とお願いする
    tilemap.add(yamada);

    //キャラクターのアニメーションのための変数。足が動いているように見せるための変数
    let toggleForAnimation = 0;
    //ゴールのテキストが表示されているかどうかの変数
    let hasDisplayedGoalText = false;
    //移動可能かどうかの変数。ゴールしたら、移動不可に
    let isMovable = true;

    //ループから常に呼び出される
    scene.onenterframe = () => {
        //タイルマップの位置がタイルのサイズで割り切れるとき＝タイルのサイズ分だけ移動(スクロール)
        if ((tilemap.x - TILE_SIZE / 2) % TILE_SIZE === 0 && (tilemap.y - TILE_SIZE / 2) % TILE_SIZE === 0) {

            //キーが押されたとき、山田先生が移動する
            //if (game.input.left) yamada.x -= WALKING_SPEED;
            //if (game.input.right) yamada.x += WALKING_SPEED;
            //if (game.input.up) yamada.y -= WALKING_SPEED;
            //if (game.input.down) yamada.y += WALKING_SPEED;
            //キーが押されたとき、山田先生（マップ）が移動する
            //if ( game.input.left ) tilemap.x += WALKING_SPEED;
            //if ( game.input.right ) tilemap.x -= WALKING_SPEED;
            //if ( game.input.up ) tilemap.y += WALKING_SPEED;
            //if ( game.input.down ) tilemap.y -= WALKING_SPEED;
            //タイルマップの移動速度に0を代入する。キーが押されてないときの移動速度は0
            tilemap.vx = tilemap.vy = 0;
            //山田先生の画像を切り替える
            yamada.animation = 1;

            //山田先生のタイルがゴールのタイルと重なっているとき、イベントを発生させる
            if (yamada.isOverlapped(goal)) {
                //ゴールのテキストが表示されていないとき
                if (!hasDisplayedGoalText) {
                    //変数goalTextに、あなたは「ゴールだべ！」というテキストだよ、と教える
                    const goalText = new Text('ゴールだべ！');
                    //テキストサイズを変更
                    goalText.size = 50;
                    //テキストの位置
                    //goalText.x = 15;
                    //goalText.y = 135;
                    //テキストを上下左右中央の位置にする
                    goalText.center().middle();
                    //シーンにテキストを追加
                    scene.add(goalText);
                    //ゴールのテキストが表示されているかどうかの変数にtrueを代入
                    hasDisplayedGoalText = true;
                    //移動ができないようにする
                    isMovable = false;
                }
            }
            //if ( yamada.isOverlapped( goal ) ) console.log( 'ゴールだべ！' );

            //移動可能なとき
            if (isMovable) {
                //方向キーが押されているときは、タイルマップの移動速度と、山田先生の向きに、それぞれの値を代入する
                if (game.input.left) {
                    tilemap.vx = WALKING_SPEED;
                    yamada.direction = 1;//足を揃えている状態
                }
                else if (game.input.right) {
                    tilemap.vx = -1 * WALKING_SPEED;
                    yamada.direction = 2;
                }
                else if (game.input.up) {
                    tilemap.vy = WALKING_SPEED;
                    yamada.direction = 3;
                }
                else if (game.input.down) {
                    tilemap.vy = -1 * WALKING_SPEED;
                    yamada.direction = 0;
                }
                //キーが押されたとき、山田先生（マップ）が移動する。else ifでつなげることで、斜めに移動できなくする
                //if (game.input.left) tilemap.vx = WALKING_SPEED;
                //else if ( game.input.right ) tilemap.vx = -1 * WALKING_SPEED;
                //else if ( game.input.up ) tilemap.vy = WALKING_SPEED;
                //else if ( game.input.down ) tilemap.vy = -1 * WALKING_SPEED;
                //if (game.input.right) tilemap.vx = -1 * WALKING_SPEED;
                //if (game.input.up) tilemap.vy = WALKING_SPEED;
                //if (game.input.down) tilemap.vy = -1 * WALKING_SPEED;
                //移動後のマップ座標を求める
                const yamadaCoordinateAfterMoveX = yamada.mapX - tilemap.vx / WALKING_SPEED;
                const yamadaCoordinateAfterMoveY = yamada.mapY - tilemap.vy / WALKING_SPEED;
                //もし移動後のマップ座標に障害物があるならば、移動量に0を代入する
                if (tilemap.hasObstacle(yamadaCoordinateAfterMoveX, yamadaCoordinateAfterMoveY)) tilemap.vx = tilemap.vy = 0;

                //コンソールにマップ座標を表示
                //console.log( `${yamada.mapX} ${yamada.mapY}` );
            }
        }
        //タイルマップのXとY座標両方がタイルのサイズで割り切れるとき以外で、タイルの半分のサイズで割り切れるとき
        else if ((tilemap.x + TILE_SIZE / 2) % (TILE_SIZE / 2) === 0 && (tilemap.y + TILE_SIZE / 2) % (TILE_SIZE / 2) === 0) {
            //0と1を交互に取得できる
            toggleForAnimation ^= 1;
            //toggleForAnimationの数値によって、山田先生の画像を切り替える
            if (toggleForAnimation === 0) yamada.animation = 2;
            else yamada.animation = 0;
        }
    } //scene.onenterframe 終了

    //gameに、シーンを追加して、とお願いする
    game.add(scene);

    //gameに、ゲームをスタートして、とお願いする
    game.start();

});