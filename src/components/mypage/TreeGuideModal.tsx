import React from 'react';

import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useModalStore } from '@/store/modal.store';

const TreeGuideModal: React.FC = () => {
  const { mainCloseModal } = useModalStore(state => state);

  return (
    <Modal>
      <div className="w-[29rem] h-[35.4375rem] flex flex-col justify-center">
        <div className="flex justify-between items-baseline">
          <p className="text-xl font-semibold mb-4 py-2">활동하고 나무 충전하기</p>
          <button onClick={mainCloseModal}>
            <AiOutlineClose size={28} />
          </button>
        </div>
        <div className="border-t border-black opacity-25 mb-6"></div>
        <div className="justify-evenly">
          <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <li className="text-lg font-semibold">챌린지 참가 인증</li>
            <li className="text-sub6 text-base">나무 25 그루 지급</li>
          </ul>
          <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <li className="text-lg font-semibold">챌린지 제안하기</li>
            <li className="text-sub6 text-base">나무 5 그루 지급</li>
          </ul>
          <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <li className="text-lg font-semibold">챌린지 응원하기</li>
            <li className="text-sub6 text-base">나무 2 그루 </li>
          </ul>
          <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <li className="text-lg font-semibold">챌린지 투표하기</li>
            <li className="text-sub6 text-base">나무 2 그루 지급</li>
          </ul>
          <ul className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <li className="text-lg font-semibold">등급 UP 혜택</li>
            <li className="text-sub6 text-base">나무 20 그루 지급</li>
          </ul>
        </div>
        <div className="mt-6">
          <Button btnType={'primary'} size={'full'}>
            <Link href={'/challenge'} onClick={mainCloseModal}>
              챌린지 참여하기
            </Link>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TreeGuideModal;