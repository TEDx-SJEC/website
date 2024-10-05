"use server";

import { FormDataInterface } from "@/components/registration-form";
import { getServerSideSession } from "@/lib/get-server-session";
import prisma from "@/server/db";

export async function submitForm(data: FormDataInterface, amount: number) {
    const session = await getServerSideSession();
    if (!session) {
        return;
    }

    return await prisma.form.create({
        data: {
            name: data.name,
            usn: data.usn,
            email: data.email,
            contact: data.phone,
            designation: data.designation,
            paidAmount: amount,
            photo: data.photo,
            collegeIdCard: data.idCard,
            createdById: session.user.id,
            entityName: data.name,
        },
    });
}
