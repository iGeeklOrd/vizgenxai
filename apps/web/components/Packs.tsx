

import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { PacksClient } from "./PackClient";
import { TPack } from "./PackCard";


async function getPacks(): Promise<TPack[]> {
    const res = await axios.get(`${BACKEND_URL}/pack/bulk`)

    return res.data.packs ?? []
}

export async function Packs(){
    const packs = await getPacks()

    return <PacksClient packs={packs} />
}