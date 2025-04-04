import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { ApiResponse } from './HomePage';


const BeginnerReads = (data: ApiResponse) => {
    return (
        <section className="flex flex-col gap-5 mb-10">
            <h1 className='text-4xl font-semibold'>Beginner Reads</h1>
            <div className='flex gap-5 justify-center'>
            {data && data.data?.map((datas,index)=>(
                <Link key={index} href={`/category/${datas.slug}`} className='w-1/2 h-[40rem] hover:opacity-85'>
                <Card className="w-full h-full relative overflow-hidden bg-card/5 text-background">
                    <img src={datas.images} alt="" loading='lazy' className='h-full object-cover absolute -z-20 dark:opacity-75 opacity-95' />
                    <CardHeader className='h-1/3'></CardHeader>
                    <CardContent className='h-1/3'></CardContent>
                    <CardFooter className='h-1/3 pt-5 items-start'>
                    <div className='h-full bg-background/80 dark:bg-black/75 text-foreground backdrop-blur-md flex justify-center flex-col gap-y-1 rounded-lg p-4'>
                        <CardTitle className='text-[30px] leading-[30px]'>{datas.title}</CardTitle>
                        <CardDescription className='font-semibold text-lg'>{datas.description}</CardDescription>
                    </div>
                    </CardFooter>
                </Card>
                </Link>
            ))}
            </div>
        </section>
    )
}

export default BeginnerReads