//画面に画像を表示する
document.getElementById("gzo").innerHTML = '<img src="rico.png" id="rico">';

//省略
const rico_gzo = document.getElementById('rico');

//画像の移動

//ricoオブジェクトを作る
let rico = new Object;
//移動位置を入れる変数
rico.y = 0;//上下。ricoオブジェクトように変更。letを取る
rico.x = 0;//左右
rico.move = 0;

//押されたキーを一時的に代入しておく変数。ゆっくりになった移動が終わる前にキーが離されても大丈夫なように
let pressed_key = '';

//キーボードオブジェクトを作る
let key = new Object;
key.up = false;//false=ボタンを押していない状態
key.down = false;
key.right = false;
key.left = false;



function main() {
    //キーボードが押された時、keydownfunc関数（かんすう）を呼び出す
    addEventListener("keydown", keydownfunc);
    //キーボードがはなされた時、keyupfunc関数（かんすう）を呼び出す
    addEventListener("keyup", keyupfunc);

    //rico.moveが0のとき、りこちゃんが移動する準備（じゅんび）をする
    if (rico.move === 0) {
        if (key.left === true) {
            rico.move = 32;//どれだけ動くか覚える
            pressed_key = 'left';//キーを覚える
        }
        if (key.up === true) {
            rico.move = 32;
            pressed_key = 'up';
        }
        if (key.right === true) {
            rico.move = 32;
            pressed_key = 'right';
        }
        if (key.down === true) {
            rico.move = 32;
            pressed_key = 'down';
        }
    }

    //rico.moveが0より大きいとき、りこちゃんが移動（いどう）する
    if (rico.move > 0) {
        rico.move -= 4;//32になるまで4ずつ移動
        if (pressed_key === 'left') rico.x -= 4;//実際に移動させる
        if (pressed_key === 'up') rico.y -= 4;
        if (pressed_key === 'right') rico.x += 4;
        if (pressed_key === 'down') rico.y += 4;
    }


    //りこちゃんの画像の位置（いち）を反映（はんえい）させる
    document.getElementById('rico').style.top = rico.y + "px";
    document.getElementById('rico').style.left = rico.x + "px";

    //main関数（かんすう）、つまり自分自身の関数を呼び出すことでループさせる。
    requestAnimationFrame(main);
}
requestAnimationFrame(main);

//キーボードが押されたときに呼び出される関数（かんすう）
function keydownfunc(event) {
    let key_code = event.keyCode;
    if (key_code === 37) key.left = true;//「左ボタン」が押されたとき、key.leftをtrueにする
    if (key_code === 38) key.up = true;//「上ボタン」が押されたとき、key.upをtrueにする
    if (key_code === 39) key.right = true;//「右ボタン」が押されたとき、key.rightをtrueにする
    if (key_code === 40) key.down = true;//「下ボタン」が押されたとき、key.downをtrueにする
}

//キーボードがはなされたときに呼び出される関数
function keyupfunc(event) {
    let key_code = event.keyCode;
    if (key_code === 37) key.left = false;//「左ボタン」がはなされたとき、key.leftをfalseにする
    if (key_code === 38) key.up = false;//「上ボタン」がはなされたとき、key.upをfalseにする
    if (key_code === 39) key.right = false;//「右ボタン」がはなされたとき、key.rightをfalseにする;
    if (key_code === 40) key.down = false;//「下ボタン」がはなされたとき、key.downをfalseにする
}

