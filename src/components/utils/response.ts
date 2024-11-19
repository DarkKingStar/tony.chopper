import { NextResponse } from "next/server";
import { HttpStatusCode } from "./StatusCode";

export function ResponseEntity(data: any, status: HttpStatusCode) {
    return NextResponse.json({ status: status.code, message: status.message, data }, { status: status.code });
}