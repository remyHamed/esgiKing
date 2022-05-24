import { CommandDocument, CommandProps } from "../model";
export declare class Command {
    private static instance?;
    static getInstance(): Command;
    getCommands(): Promise<CommandDocument[]>;
    createCommand(command: CommandProps): Promise<CommandDocument>;
    getById(commandId: string): Promise<CommandDocument>;
    delete(commandId: string): Promise<CommandDocument>;
    acceptDelivery(commandId: string): Promise<CommandDocument>;
}
