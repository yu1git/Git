// //マスを作る関数
// const makeMasu = () => {
//     const masu = document.createElement("div");
//     masu.textContent = 1
//     document.querySelector(".bingocard").appendChild(masu)
// }
// //マスを作る関数を25回呼び出す
// for (let i = 0; i < 25; i++) {
//     makeMasu();
// }

// //上を改良。マスにランダムな数字が入るように変更。
// //マスを作る関数
// const makeMasu = () => {
//     const masu = document.createElement("div");
//     masu.textContent = Math.floor(Math.random()*100)
//     document.querySelector(".bingocard").appendChild(masu)
// }
// //マスを作る関数を25回呼び出す
// for (let i = 0; i < 25; i++) {
//     makeMasu();
// }

// //上を改良。マスをクリックすると〇が表示される
// //マスを作る関数
// const makeMasu = () => {
//     const masu = document.createElement("div");
//     masu.textContent = Math.floor(Math.random()*100)
//     masu.addEventListener("click",(evt)=>{//("click",function(){)
//         evt.target.textContent = "◯";//this.textContent="〇"
//     })
//     document.querySelector(".bingocard").appendChild(masu)
// }
// //マスを作る関数を25回呼び出す
// for (let i = 0; i < 25; i++) {
//     makeMasu();
// }

// //上を改良
// //空の配列
// checkList = [];
// //マスを作る関数
// const makeMasu = () => {
//     const masu = document.createElement("div");
       //ランダムな値を配列に追加して覚えさせる
//     const randomNumber = Math.floor(Math.random()*100);
//     checkList.push(randomNumber);
//     masu.textContent =randomNumber;

//     masu.addEventListener("click",(evt)=>{
//         evt.target.textContent = "◯";
//     })
//     document.querySelector(".bingocard").appendChild(masu);
// }
// //マスを作る関数を25回呼び出す
// for (let i = 0; i < 25; i++) {
//     makeMasu();
// }

// //上を改良
// //空の配列
// checkList = [];
// //マスを作る関数
// const makeMasu = (i) => {//forループからiを引数として受け取る＝マスをクリックしたときに対応している配列の要素を変更できるように
//     const masu = document.createElement("div");
//     //ランダムな値を配列に追加して覚えさせる
//     const randomNumber = Math.floor(Math.random()*100);
//     checkList.push(randomNumber);
//     masu.textContent =randomNumber;

//     masu.addEventListener("click",(evt)=>{
//         evt.target.textContent = "◯";
//         checkList[i] = "◯"
//         // 期待通りにcheckListが動いているか確認
//         console.log(checkList)
//     })
//     document.querySelector(".bingocard").appendChild(masu);
// }
// //マスを作る関数を25回呼び出す
// for (let i = 0; i < 25; i++) {
//     makeMasu(i);
// }

// //別解
// checkList = new Array(25).fill(0)

// const makeMasu = (i) => {
//     const masu = document.createElement("div");

//     const randomNumber = Math.floor(Math.random()*100);
//     checkList[i] = randomNumber;
//     masu.textContent =randomNumber;

//     // (以下略)
// }

//二つ上を改良
//一列目は1-15、二列目16-30、三列目31-45、四列目46-60、五列目61-75
checkList = []
//マスを作る関数
const makeMasu = (i) => {
    const masu = document.createElement("div");

    // コマの番号を５で割った余りからどの列かを出す
    const col = i % 5;//一列目は0、二列目1、三列目2、四列目3、五列目4
    const randomNumber = Math.floor(Math.random() * 15/*範囲（最小値から+15までの値をランダムにする）*/ + col * 15 + 1/*最小値 一列目は1、二列目16、三列目31、四列目46、五列目61*/);
    
    //ランダムな値を配列に追加して覚えさせる
    
    checkList.push(randomNumber);
    masu.textContent = randomNumber;
     

    //クリックすると数値→〇
    masu.addEventListener("click", (evt) => {
        evt.target.textContent = "◯";
        checkList[i] = "◯"
        // 期待通りにcheckListが動いているか確認
        console.log(checkList)
    })
    document.querySelector(".bingocard").appendChild(masu);
}
//マスを作る関数を25回呼び出す
for (let i = 0; i < 25; i++) {
    makeMasu(i);
}