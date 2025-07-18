import type {Friend} from "./Friend.ts";

export type Event = {
    eventType: string;
    FIOEventOwner: string;
    emailEventOwner: string;
    phoneEventOwner: string;
    friends: Friend[] | [];
    connectionType: string;
};