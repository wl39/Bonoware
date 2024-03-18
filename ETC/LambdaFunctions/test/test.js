let rightNow = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
rightNow = rightNow.split("-")

if ((rightNow[1]).length === 1) {
    rightNow[1] = '0' + rightNow[1];
}

rightNow[2] = rightNow[2].split(" ")[0];
if ((rightNow[2]).length === 1) {
    console.log("true")
    rightNow[2] = '0' + rightNow[2];
}
rightNow = rightNow[0] + "-" + rightNow[1] + "-" + (rightNow[2]);

console.log(rightNow);