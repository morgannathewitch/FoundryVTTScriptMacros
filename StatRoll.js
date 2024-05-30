async function main() {

    let stats = "Your stats are: ";
    
    for (let i = 0; i < 6; i++) {
       let roll = await new Roll("4d6kh3").evaluate();
       if (i == 5) {
          stats = stats.concat("", `${roll.result}.`);
       }
       else {
          stats = stats.concat("", `${roll.result}, `);
       }
    }
    ChatMessage.create({content: stats});
    }
    
    main();