import {CommandDocument, CommandModel, CommandProps} from "../model";
import {IncorrectArgumentException} from "../lib";

export class Command {
    private static instance?: Command;

    public static getInstance(): Command {
        if (Command.instance === undefined) {
            Command.instance = new Command();
        }

        return Command.instance;
    }

    public async createCommand(command: CommandProps): Promise<CommandDocument> {
        command.settled = false;
        if (!command.productList.length) {
            throw new IncorrectArgumentException("Missing products in command");
        } else if (!command.restaurant) {
            throw new IncorrectArgumentException("Missing restaurant id");
        } else if (!command.client) {
            throw new IncorrectArgumentException("Missing client id");
        }

        return await new CommandModel(command).save();
    }


}
