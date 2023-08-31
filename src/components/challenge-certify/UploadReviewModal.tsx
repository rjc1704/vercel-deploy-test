'use client'
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { loadMainChallenge } from '@/app/api/challenge-certify';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Input, useDialog } from '../common';
import Modal from '../common/Modal';


interface UploadReviewProps {
  modalType: string;
}

const UploadReviewModal: React.FC<UploadReviewProps> = () => {
  const session = useSessionStore((state: { session: any }) => state.session);
  const Alert = useDialog();

  const [mainChallenge, setMainChallenge] = useState('');
  const [instaUrl, setInstaUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const { isOpenMainModal, mainCloseModal } = useModalStore();

  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await loadMainChallenge();
      setMainChallenge(challengeData);
    };
    fetchData();
  }, []);
  const isValidateUrl = async (url: string) => {
    if (!url.includes('https://www.instagram.com/p/')) {
      setErrorMsg("유효한 URL을 입력해주세요")
      return false
    }
    axios.get(`http://localhost:3000/api/crawler?url=${instaUrl}`)
      .then(post => {
        const { imageUrl, hashtags } = post.data.res

      })
      .catch(err => {
        console.error('Error:', err);
      });
  }


  const onClickSaveReview = async () => {
    try {
      if (!isValidateUrl(instaUrl)) {
        return false
      }
      // reviews table 추가  
      await supabase.from('reviews').insert({
        user_id: session?.user.id,
        insta_url: instaUrl,
        challenge_id: mainChallenge.challenge_Id,
      });

      // joinChallenge reviews 1 추가(진행중) 이거 수퍼베이스 자체에 기능없나...
      // await supabase
      //   .from('joinChallenge')
      //   .update({ reviews: { _increment: 1 } })
      //   .eq('user_id', session?.user.id);
      //   .eq('challenge_Id', mainChallenge.challenge_Id);

      // joinChallenge reviews 갯수 10개 이상이면 미션완료 true 업데이트 (진행중)
      // await supabase.from('joinChallenge').update({ completedMission: true }).eq('user_id', session?.user.id).gte('reviews', 10).select(`*, mainChallenge(*)`);

      setInstaUrl('');
    } catch (error) {
      console.error('Error adding review', error);
    }
  };

  return (
    <Modal>
      {isOpenMainModal && (
        <>
          <h3>{mainChallenge?.title}</h3>
          <div className="text-center">
            <p>주의사항: 타인 도용 및 해당 챌린지와 연관이 없는 인증시 챌린지 이용이 제한될 수 있습니다.</p>
            <Input
              value={instaUrl}
              _size={''}
              placeholder="인증 게시글 링크 붙여넣기"
              onChange={e => {
                setInstaUrl(e.target.value);
              }}
            />
            <p className='text-red-800'>{errorMsg}</p>
            <div className="flex justify-center">
              <Button onClick={onClickSaveReview} btnType={'primary'} size={'small'}>
                인증하기
              </Button>
              <Button onClick={mainCloseModal} btnType={'borderBlack'} size={'small'}>
                취소
              </Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default UploadReviewModal;
