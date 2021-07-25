'use strict'

/**
 * スプライトに関してのクラス
 */
class Sprite {

    /**
     * 引数
     * img : 画像ファイルまでのパス
     * width : 画像の表示する範囲（横幅）
     * height : 画像の表示する範囲（縦幅）
     */
    constructor(img, width, height) {
        //this.imgに、あなたは画像ですよ、と教える
        this.img = new Image();
        //this.img.srcに画像ファイルまでのパスを代入
        this.img.src = img;
        //画像の初期位置
        this.x = this.y = 0;

        //画像を表示する範囲の横幅。引数widthが指定されていない場合、this.widthに32を代入
        this.width = width || 32;
        //画像を表示する範囲の縦幅。引数heightが指定されていない場合、this.heightに32を代入
        this.height = height || 32;
        //何番目の画像を表示するか
        this.frame = 0;
    } //constructor() 終了

    /**Gameクラスのメインループからずっと呼び出され続ける
     *
     * 引数
     * canvas : 紙（キャンバス）
     */
    update(canvas) {
        //画像などを画面に表示するためのメソッドを呼び出す
        this.render(canvas);
        //スプライトを動かしたり、なにかのきっかけでイベントを発生させたりするために使うメソッドを呼び出す
        this.onenterframe();
    } //update() 終了

    /**
     * 画像などを画面に表示するためのメソッド
     *
     * 引数
     * canvas : 紙（キャンバス）
     */
    render(canvas) {
        //キャンバスの外にスプライトがあるとき、ここでこのメソッドを終了する
        if (this.x < -1 * this.width || this.x > canvas.width) return;
        if (this.y < -1 * this.height || this.y > canvas.height) return;

        //X,Y方向に、何番目の画像か
        const _frameX = this.frame % (this.img.width / this.width);
        const _frameY = ~~(this.frame / (this.img.width / this.width));//「~~」少数切り捨て

        //画家さん（コンテキスト）を呼ぶ
        const _ctx = canvas.getContext('2d');
        //画家さんに、絵を描いてとお願いする
        _ctx.drawImage(
            this.img,
            this.width * _frameX,
            this.height * _frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    } //render() 終了
    /**
         * 常に呼び出され、スプライトの移動やイベントの発生などに使うメソッド。空なのはオーバーライド（上書き）して使うため
         */
    onenterframe() { }
}