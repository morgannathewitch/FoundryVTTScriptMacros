async function gamble(actor, bumph, money) {
    let actor_roll = await new Roll(`2d12`).evaluate();
    let house_roll = await new Roll(`2d12`).evaluate();

    console.log(`Actor rolled ${actor_roll.total}`);
    console.log(`House rolled ${house_roll.total}`);

    await actor_roll.toMessage({speaker: {actor: actor}});
    await house_roll.toMessage({speaker: {actor: house}});

    setTimeout(() => {
        if (actor_roll.total > 21) {
            ChatMessage.create({
                speaker: {actor: actor},
                content: `<span style="color:red"><h2>Fail!</h2><i> Ouch you lose!</i>`,
            });
        }
        else if (actor_roll.total < 22 && house_roll.total > 21) {
            ChatMessage.create({
                speaker: {actor: actor},
                content: `<span style="color:green"><h2>House strikes out!</h2><i>You win 100 Cr!</i>`,
            });
            actor.update({"system.currency.gp": money + 100});
        }
        else if (actor_roll.total <= house_roll.total) {
            ChatMessage.create({
                speaker: {actor: house},
                content: `<span style="color:red"><h2>Fail!</h2>Tough luck, wanna play again?`,
            });
        }
        else {
            ChatMessage.create({
                speaker: {actor: house},
                content: `<span style="color:green"><h2>You win!</h2><i>Your coin pouch is 100 Cr heavier!</i>`,
            });
            actor.update({"system.currency.gp": money + 100});
        }
    }, "3000");

    return;
}

async function main() {
    let actor = game.actors.getName("Actor");
    let house = game.actors.getName("House");
    let money = actor.system.currency.gp;
    console.log(money);

    if (money < 50) {
        ChatMessage.create({
            speaker: {actor: house},
            content: "Try again when you have more money!",
        });
    }
    else {
        ChatMessage.create({
            speaker: {actor: actor},
            content: "<i> You slide over 50 Cr to the dealer and take a seat.</i>",
        });
        actor.update({"system.currency.gp": money - 50});
        await gamble(actor, house, money);
    }
}

main();