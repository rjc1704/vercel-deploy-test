'use client';
import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { BrowserView, MobileView } from 'react-device-detect';
import { BarLoader } from 'react-spinners';

import { getNatureStory } from '@/app/api/nature-story';
import { NATURESTORY } from '@/app/shared/queries.keys';
import { Button } from '@/components/common';

import ColumnSlideCard from './ColumnSlideCard';
import Slide from './Slide';
import nextIcon from '../../../../public/rightArrow.svg';

export default function ContentSlide() {
  const { isLoading, isError, data: contentData } = useQuery([NATURESTORY], getNatureStory);

  const [selectedItem, setSelectedItem] = useState(0);

  const onClickItem = (i: number) => {
    if (!contentData) return;
    setSelectedItem(i);
  };

  if (isError) {
    return <h1>불러오지 못했습니다.</h1>;
  }
  if (!isLoading && contentData) {
    return (
      <div className=" border-b-2 mt-20 pb-20 my-20">
        <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Contents</p>
        <h2 className="mt-4 text-[23px] sm:text-[36px]">멸종위기 동물들의 생활</h2>
        <div className="flex flex-col gap-10 mt-16 md:flex-row">
          {contentData[selectedItem]?.category === 'youtube' ? (
            <div className="w-full h-[420px] sm:w-[690px]">
              <iframe
                width={690}
                height={420}
                rel="0"
                allowFullScreen
                src={`https://www.youtube.com/embed/${contentData[selectedItem]?.video_url}?amp;loop=1&modestbranding=1&rel=0&fs=1`}
                className="w-full h-[420px] sm:w-[690px]"
              />
            </div>
          ) : (
            <div className="w-full  overflow-hidden sm:w-[690px]">
              <Image width={690} height={420} src={contentData[selectedItem]?.img_url} alt="natureStroyImg" />
            </div>
          )}
          <div className="my-auto">
            <p className="mb-4">{contentData[selectedItem]?.category}</p>
            <h1 className="text-2xl mb-[14px]">{contentData[selectedItem]?.title}</h1>
            <div className="hidden text-black opacity-50 mb-9 md:flex">
              <p>Updated</p>
              &nbsp;
              <span>|</span>
              &nbsp;
              <p>{contentData[selectedItem]?.created_at.slice(0, 10).replaceAll('-', '.')}</p>
            </div>
            <Link href={`/nature-story/${contentData[selectedItem]?.post_id}`}>
              <Button btnType="borderBlack" size="large" rounded={true}>
                <p>자세히 보기</p>
                <Image className="hover:bg-white" src={nextIcon} alt="Rightarrow" />
              </Button>
            </Link>
          </div>
        </div>
        <BrowserView>
          <div className={'flex justify-center items-center mt-10 gap-x-6 '}>
            <Slide showContentNum={4} type="column" contents={contentData} onClickHandler={onClickItem}></Slide>
          </div>
        </BrowserView>
        <MobileView className="w-full overflow-x-scroll">
          <div className="flex mt-10 gap-x-6 mb-[10px]">
            {contentData.map((data, i) => {
              return (
                <div key={data.post_id} onClick={() => onClickItem(i)}>
                  <ColumnSlideCard data={data} />
                </div>
              );
            })}
          </div>
        </MobileView>
      </div>
    );
  } else {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center ">
        <BarLoader color="#101828" height={5} width={200} />
      </div>
    );
  }
}
