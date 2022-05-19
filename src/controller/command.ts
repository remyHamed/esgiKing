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

    public async getCommands(): Promise<CommandDocument[]> {
        return CommandModel.find();
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

    public async getById(commandId: string): Promise<CommandDocument> {
        const document = await CommandModel.findById(commandId);
        if (!document) {
            throw "Command not found";
        }
        return document;
    }

    public async delete(commandId: string): Promise<CommandDocument> {
        const document = await CommandModel.findOneAndRemove({_id: commandId});
        if (!document) {
            throw "Product not found";
        }
        return document;
    }


}
