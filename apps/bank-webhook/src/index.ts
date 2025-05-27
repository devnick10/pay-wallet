import express from "express";
import db from "@repo/db/client";
import { onRampValidationSchema } from "@repo/common/common";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const result = onRampValidationSchema.safeParse(req.body)
    if (!result.success) {
        res.status(411).json({
            message: "Verify inputs"
        })
        return
    }
    const {
        token, amount, user_identifier
    } = result.data;

    const transactionStatus = await db.onRampTransaction.findUnique({
        where: {
            token
        }
    })

    if (transactionStatus?.status == "Success") {
        res.json({
            message: "Invalid token"

        })
        return
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(user_identifier)
                },
                data: {
                    locked: {
                        decrement: Number(amount)
                    },
                    amount: {
                        increment: Number(amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);