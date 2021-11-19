import nextConnect from "next-connect";
import database from "./database";

export default function createHandler() {
    return nextConnect().use(database);
}