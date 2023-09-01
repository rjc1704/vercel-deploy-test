import React from 'react';

import { getUsers } from '@/app/api/users';

export default async function Ranking() {
  const topRanker = await getUsers();
  console.log(topRanker);

  const colorMatch = ['text-blue bg-lightblue', 'text-green bg-lightgreen', 'text-orange bg-lightorange', 'text-sub6 bg-lightsub6', 'text-sub6 bg-lightsub6'];

  return (
    <div className="border-b-2 w-full mt-20 pb-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Ranking</p>
      <h2 className="mt-4">베스트 챌린저 랭킹</h2>
      <div className="flex w-[1200px] justify-between mt-10">
        {topRanker?.map((item, i) => (
          <div key={i} className="px-7 py-3 bg-white rounded-lg border-[1px]">
            <p className="text-black opacity-50">{item.nickname}</p>
            <div className="flex items-center gap-3">
              <p className="text-lg ">{item.rank}</p>
              <div className={`rounded-[4px] text-xs py-1 px-3 ${colorMatch[i]}`}>{item.rank}회 성공</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
