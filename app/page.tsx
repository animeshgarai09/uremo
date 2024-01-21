import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PurchaseFormCard } from "@/components/purchaseFormCard"
import PurchaseDetailsCard from "@/components/purchaseDetailsCard"
export default function Home() {
    return (
        <main>
            <div className='flex justify-center flex-col'>
                <h1 className='text-4xl font-bold text-center my-14 leading-tight'>
                    Get your verified <br /> Remotask accounts
                </h1>
            </div>
            <div className='flex justify-center'>
                <Card className='w-[350px]'>
                    <CardContent className='pt-5'>
                        <PurchaseFormCard />
                        {/* <PurchaseDetailsCard /> */}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
