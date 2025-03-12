import prisma from "@repo/db/client";
import express from "express";
const app = express()

app.post("/hdfcWebhook", async (req, res) => {

    //TODO: add zod validation here 
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {

        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),

            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])


        res.status(200).json({
            message: "captured"
        })

    } catch (error) {
        res.status(411).json({
            message: "Error while capturing webhook"
        })
       
    }

})


app.listen(3002)