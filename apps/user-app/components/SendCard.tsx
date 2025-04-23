"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export default function SendCard() {

    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState(0)

    return <div className="">

        <Card title="Send">
            <div className="  ">
                <div className="">
                    <TextInput label="Number" placeholder="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput label="Amount" placeholder="Amount" onChange={(value) => {
                        setAmount(Number(value))
                    }} />
                    <div className="py-2 flex justify-center items-center">
                        <Button onClick={async () => {
                            await p2pTransfer(number, amount * 100)
                        }}>Send Money</Button >
                    </div>
                </div>
            </div>
        </Card>
    </div>
}