import { ItemType } from "./ItemType";
import { Station } from "./Station";

export type Mission = DeliveryMission | SupplyMission | MercenaryMission | MoneyMission;

type DeliveryMission = {
    type: "delivery";
    reward: MissionReward;
    unit: number;
    item: ItemType;
    location: Station;
}

type SupplyMission = {
    type: "supply";
    reward: MissionReward;
    unit: number;
    item: ItemType;
    location: Station;
}

type MercenaryMission = {
    type: "mercenary";
    reward: MissionReward;
    unit: number;
    faction: string;
    location: Station;
    distance: number;
}

type MoneyMission = {
    type: "money";
    reward: MissionReward;
    unit: number;
    location: Station;
}

type MissionReward = {
    type: "money" | "cargo";
    amount: number;
} | {
    type: "trust";
    amount: number;
    unit: string;
    trustFaction: string;
}