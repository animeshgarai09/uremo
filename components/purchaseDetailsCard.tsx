import React from "react"
import { Button } from "./ui/button"
import { IoIosArrowRoundBack } from "react-icons/io"
import { Separator } from "@/components/ui/separator"

const PurchaseDetailsCard = () => {
    return (
        <div className=' flex flex-col justify-center'>
            <div className='flex items-center gap-3 mb-4'>
                <Button type='button' variant='secondary' size='icon' className='w-6 h-6'>
                    <IoIosArrowRoundBack className='w-4 h-4' />
                </Button>
                <h3 className='text-xl font-bold'>Details</h3>
            </div>
            <div className=' mb-7'>
                <div className='flex justify-between mt-3 '>
                    <span className=' text-muted-foreground text-sm'>Account type</span>
                    <span className=' text-muted-foreground text-sm'>Life science</span>
                </div>
                <div className='flex justify-between mt-3 '>
                    <span className='text-muted-foreground text-sm'>Selected region</span>
                    <span className='text-muted-foreground text-sm'>Kenya</span>
                </div>
                <div className='flex justify-between mt-3 '>
                    <span className='text-muted-foreground text-sm'>Number of Accounts</span>
                    <span className='text-muted-foreground text-sm'>10</span>
                </div>
            </div>

            <Separator />
            <div className='flex justify-between items-center my-4'>
                <span className='text-lg font-bold'>Total price</span>
                <span className='text-3xl font-bold'>30</span>
            </div>
            <Separator />
            <p className=' my-5 text-muted-foreground text-xs text-center'>Prices depends on the availability of requested accounts and the seller prices. We always offer the cheapest prices among all the sellers</p>
            <Button type='button'>Buy Now</Button>
        </div>
    )
}

export default PurchaseDetailsCard
