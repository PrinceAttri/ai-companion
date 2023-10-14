import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import { CompanionForm } from "./components/companion-form";

interface companionIdPageProps {
    params: {
        companionId: string;
    };
};

const companionIdPage = async ({
    params
}: companionIdPageProps) => {
    const { userId } = auth();

    //todo: check subscription

    if (!userId) {
        return redirectToSignIn();
    }

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId,
            userId
        }
    });

    const categories = await prismadb.category.findMany();
    
    return (
        <CompanionForm 
            initialData = {companion}
            categories = {categories}
        />
    );
}

export default companionIdPage;