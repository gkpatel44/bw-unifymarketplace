import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

let PUBLIC_KEY = "pk_test_JqWErj18ywwTmifQ7Ifu__es"; // when push code
// let PUBLIC_KEY = "pk_dev_KORYEfRtM_26701WjT-f4y8_"; // when develop

if (!/^pk_(live|test)/.test(PUBLIC_KEY)) {
    console.warn(
        `Replace "${PUBLIC_KEY}" by your public key from https://liveblocks.io/dashboard/apikeys.\n` +
        `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/react-dashboard#getting-started.`
    );
}

overrideApiKey();

const client = createClient({
    publicApiKey: PUBLIC_KEY,
});


type Presence = {
    cursor: { x: number, y: number } | null;
    model: {
        id: string,
        positon: { x: number, y: number, z: number }
    } | null;
    currentPage: number | null
}

export const {
    useMyPresence,
    useMap,
    useHistory,
    useCanUndo,
    useCanRedo,
    useBatch,
    useRoom,
    useOthers,
    RoomProvider,
    useUpdateMyPresence
} = createRoomContext<Presence>(client);

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function overrideApiKey() {
    const query = new URLSearchParams(window?.location?.search);
    const apiKey = query.get("apiKey");

    if (apiKey) {
        PUBLIC_KEY = apiKey;
    }
}