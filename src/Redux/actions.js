import {BEAT, START, USER_TURN, AI_TURN, TAKE} from "./types";

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

export function take() {
    return {
        type: TAKE
    }
};

export function userTurn(id, name) {
    return {
        type: USER_TURN,
        id,
        name
    }
};

export function aiTurn(id) {
    return {
        type: AI_TURN,
        id
    }
};