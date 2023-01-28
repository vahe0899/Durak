import {BEAT, START, USER_TURN, AI_TURN} from "./types";

export function beat() {
    return {
        type: BEAT
    }
};

export function start() {
    return {
        type: START
    }
};

export function userTurn(id) {
    return {
        type: USER_TURN,
        id: id
    }
};

export function aiTurn(id) {
    return {
        type: AI_TURN,
        id: id
    }
};