"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export function AnimatedCard(
    props:{
        className?: string,
        title: string,
        subtitle?: string,
        img: string,
        imgDescription?: string[],
        url?: string,
        note?: string
    }
) {
  return (
    <CardContainer className="inter-var" containerClassName={props.className} >
      <CardBody className="bg-[#FFABE1] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#395B64] dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >

            {props.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {props.subtitle}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4 gap-y-10 relative">
          <Image
            src={props.img}
            height="1000"
            width="500"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />

            <ul className="list-disc m-4 -mb-12" >
                
                {props.imgDescription?.map((bulletPoint)=>(
                    <li>{bulletPoint}</li>
                ))}
            </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          {/* <CardItem
            translateZ={20}
            as={Link}
            href="/"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem> */}
          <span>
            {props.note}
          </span>
          <Link href={props.url || "/"}>

            <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                Pre-Register
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}
