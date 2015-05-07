function log(message) {
    var p = document.createElement('p');
    p.textContent = message;
    document.body.appendChild(p);
}

(function generateClearDown(){
    log("MATCH ()-[r]-() DELETE r;");
    log("MATCH (n) DELETE n;");
})();

(function generateElements() {
    for (var score=2; score<=501; score++) {
        log ("CREATE (S" + score + ":Score { value: " + score + " });");
    }
    log ("CREATE (S0:Score { value: 0 });");
})();

(function generateSingleThrowRelationships() {
    var singleThrows = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    singleThrows.forEach(function(singleThrow){
        for (var score=501; score>1+ singleThrow; score--) {
            log ('MATCH (a:Score { value: ' + score.toString() + ' }), (b:Score { value: ' + (score-singleThrow).toString() + ' }) CREATE (a)-[:THROW { value: ' + singleThrow + ', type: "single", segment:' + singleThrow + ' }]->(b);');

        }
    });
})();

(function generateDoubleThrowRelationshipsToFinishGame(){
    var doubleThrows = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    doubleThrows.forEach(function(doubleThrow){
        var startScore = doubleThrow*2;
        log ('MATCH (a:Score { value: ' + startScore.toString() + ' }), (b:Score { value: 0 }) CREATE (a)-[:THROW { value: ' + startScore + ', type: "double", segment:' + doubleThrow + ' }]->(b);');
    });
})();

(function generateDoubleThrowRelationships() {
    var doubleThrows = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    doubleThrows.forEach(function(doubleThrow){
        var doubleScore = doubleThrow*2;
        for (var score=501; score>doubleScore+1; score--) {
            log ('MATCH (a:Score { value: ' + score.toString() + ' }), (b:Score { value: ' + (score-doubleScore).toString() + ' }) CREATE (a)-[:THROW { value: ' + doubleScore + ', type: "double", segment:' + doubleThrow + ' }]->(b);');

        }
    });
})();

(function generateTrebleThrowRelationships() {
    var trebleThrows = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    trebleThrows.forEach(function(trebleThrow){
        var trebleValue = trebleThrow*3;
        for (var score=501; score>trebleValue+1; score--) {
            log ('MATCH (a:Score { value: ' + score.toString() + ' }), (b:Score { value: ' + (score-trebleValue).toString() + ' }) CREATE (a)-[:THROW { value: ' + trebleValue + ', type: "treble", segment:' + trebleThrow + ' }]->(b);');

        }
    });
})();

(function generate25ThrowRelationships(){
    for (var score=501; score>=27; score--) {
        log ('MATCH (a:Score { value: ' + score.toString() + ' }), (b:Score { value: ' + (score-25).toString() + ' }) CREATE (a)-[:THROW { value: 25, type: "outer bull" }]->(b);');

    }
})();

(function generateBullseyeThrowRelationships(){
    for (var score=501; score>=52; score--) {
        log ('MATCH (a:Score { value: ' + score.toString() + ' }), (b:Score { value: ' + (score-50).toString() + ' }) CREATE (a)-[:THROW { value: 50, type: "inner bull" }]->(b);');
    }
    var score=50;
    log ('MATCH (a:Score { value: ' + score.toString() + ' }), (b:Score { value: ' + (score-50).toString() + ' }) CREATE (a)-[:THROW { value: 50, type: "inner bull" }]->(b);');
})();