async function main(){
    console.log("Tokens controlled: ", canvas.tokens.controlled);
        if (canvas.tokens.controlled.length != 1){
            ui.notifications.error("Please select a single token");
            return;
        }
    let token = canvas.tokens.controlled[0];
    let actor = token.actor;

    let torch = actor.items.find(item => item.name == "Torch");
    if (torch == null || torch == undefined){
            ui.notifications.error("No torches found");
            return;
        }
    colour = token.document.light.color;
    if (colour != "#fba732"){
        await torch.update({"system.quantity": torch.system.quantity - 1});
        if (torch.system.quantity < 1){
            torch.delete();
        }
        await token.document.update({"light.dim": 6, "light.bright": 0, "light.color": "#fba732"});
    }
    else {
        await token.document.update({"light.dim": 0, "light.bright": 0, "light.color": "#000000"});
    }
}

main()