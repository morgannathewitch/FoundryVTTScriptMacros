async function main() {
    stats = "Your stats are: "
    for (let j = 0; j < 6; j++) {
        let roll = await new Roll("4d6kh3").evaluate();
        for (let i = 0; i < 4; i++){
            if (roll.terms[0].results[i].result == 1 && roll.terms[0].results[i].active == true) {
                let reroll = await new Roll("1d6").evaluate();
                roll.terms[0].results[i].result = reroll.total;
            }
        }
        stats = stats.concat(" ", `${roll.total},`);
        console.log(stats);
    }
    ChatMessage.create({content: stats});
}
    
main();