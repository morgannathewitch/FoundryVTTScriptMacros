async function fudge(AC, mod, prof) {
    // Define the roll
    let roll = await new Roll(`1d20 + ${mod}`).evaluate();

    // Roll until outcome is below AC
    while (roll.total > AC) {
        roll = await new Roll(`1d20 + ${mod} + ${prof}`).evaluate();
        console.log(`Reroll ${roll.total}`);
    }
    // Return fudged roll result
    return roll;
}

async function main() {
    // Choose selected token
    let actr = canvas.tokens.controlled[0].actor;

    // Find selected token's Dex mod
    let mod = actr.system.abilities.dex.mod;

    // Find selected token's proficiency bonus
    let prof = actr.system.attributes.prof;

    // Set an AC to roll below
    const AC = 15

    // Roll fudged roll
    let r = await fudge(AC, mod, prof);

    // Print chat message of fudged roll result
    await r.toMessage({speaker: {actor: actr}});
}

main();