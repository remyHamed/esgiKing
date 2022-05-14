import {CommandDocument, CommandModel, CommandProps} from "../model";

export class CommandController {
    private static instance?: CommandController;

    public static getInstance(): CommandController {
        if(CommandController.instance === undefined) {
            CommandController.instance = new CommandController();
        }

        return CommandController.instance;
    }

    public async createCommand(command: CommandProps): Promise<CommandDocument|null> {
        command.settled = false;
        if(!command.productList.length) {
            throw "Incorrect number of items";
        }else if(!command.restaurant) {
            throw "Missing restaurant id";
        }else if(!command.client) {
            throw "Missing client id";
        }

        return await new CommandModel(command).save();
    }


}
