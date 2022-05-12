import {CommandDocument, CommandModel, CommandProps} from "../model";

export class CommandeService {
    private static instance?: CommandeService;

    public static getInstance(): CommandeService {
        if(CommandeService.instance === undefined) {
            CommandeService.instance = new CommandeService();
        }
        return CommandeService.instance;
    }

    public async createCommand(command: CommandProps): Promise<CommandDocument|null> {

        const model = new CommandModel(command);

        if(command.menuList.length <= 0 && command.productList.length <= 0 )
            throw "Incorrect no menu or product";

        if(command.payed)
            throw "Incorrect can't be already payed";

        if(command.total <= 0)
            throw "Incorrect can't be under 0";

        if(command.restaurantId.length <= 0)
            throw "Incorrect missingRestaurant";

        if(command.author.length <= 0)
            throw "Incorrect missingRestaurant";

        return await model.save();
    }


}
