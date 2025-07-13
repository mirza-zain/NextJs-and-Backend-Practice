import { NextResponse } from "next/server";

const user = {
    id: '107',
    name: 'Mirza Zain',
    title: 'Full Stack Developer'
};

export async function GET(request) {
    return NextResponse.json(user);
}